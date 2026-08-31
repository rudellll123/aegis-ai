"""
Day 1 — the smallest possible LangGraph agent.

This builds the agent -> tool -> result -> agent loop BY HAND (instead of
using a one-line prebuilt helper) so the mechanics are visible. Once you've
run this and understand it, later phases can switch to prebuilt helpers
for speed.

Run:
    export ANTHROPIC_API_KEY=sk-...
    python agent.py
"""

from typing import Annotated, TypedDict

from langchain_ollama import ChatOllama
from langchain_core.messages import AnyMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

from tools import ALL_TOOLS


# ---------------------------------------------------------------------------
# 1. State: what flows through the graph between nodes.
#    `add_messages` means new messages get APPENDED, not overwritten —
#    this is what gives the agent memory of the conversation so far.
# ---------------------------------------------------------------------------
class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]


# ---------------------------------------------------------------------------
# 2. The model, with tools "bound" to it so it knows what it can call.
#    This runs FREE and LOCAL via Ollama — no API key, no billing.
#    Requires Ollama installed and `ollama pull llama3.1` run first.
# ---------------------------------------------------------------------------
llm = ChatOllama(model="llama3.1", temperature=0)
llm_with_tools = llm.bind_tools(ALL_TOOLS)


# ---------------------------------------------------------------------------
# 3. Nodes: the two things that can happen at each step.
# ---------------------------------------------------------------------------
def call_agent(state: AgentState) -> AgentState:
    """Ask the LLM: given the conversation so far, what's next?
    It either replies with a final answer, or with a tool_call."""
    response = llm_with_tools.invoke(state["messages"])
    return {"messages": [response]}


tool_node = ToolNode(ALL_TOOLS)  # runs whichever tool the LLM asked for


# ---------------------------------------------------------------------------
# 4. Routing: after the agent speaks, did it ask for a tool, or is it done?
# ---------------------------------------------------------------------------
def route(state: AgentState) -> str:
    last_message = state["messages"][-1]
    if getattr(last_message, "tool_calls", None):
        return "tools"
    return END


# ---------------------------------------------------------------------------
# 5. Wire the graph together.
# ---------------------------------------------------------------------------
graph = StateGraph(AgentState)
graph.add_node("agent", call_agent)
graph.add_node("tools", tool_node)

graph.set_entry_point("agent")
graph.add_conditional_edges("agent", route, {"tools": "tools", END: END})
graph.add_edge("tools", "agent")  # after running a tool, go back to the agent

app = graph.compile()


# ---------------------------------------------------------------------------
# 6. Try it.
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    print("AegisAI Day 1 agent (running locally via Ollama).")
    print("Try: 'Any incidents involving a forklift?'")
    print("Type 'quit' to exit.\n")

    while True:
        user_input = input("You: ")
        if user_input.strip().lower() in {"quit", "exit"}:
            break

        result = app.invoke({"messages": [HumanMessage(content=user_input)]})

        # Print every step the agent took, so the loop is visible.
        for msg in result["messages"]:
            role = msg.__class__.__name__
            if role == "AIMessage" and getattr(msg, "tool_calls", None):
                for tc in msg.tool_calls:
                    print(f"  [agent decided to call tool] {tc['name']}({tc['args']})")
            elif role == "ToolMessage":
                print(f"  [tool result] {msg.content}")
            elif role == "AIMessage":
                print(f"Agent: {msg.content}\n")
