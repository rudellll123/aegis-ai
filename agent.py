"""
Phase 6 - agent as an MCP client.

Instead of importing tools.py directly, the agent now spawns
mcp_server/incident_server.py as a subprocess and talks to it over the
MCP protocol (stdio transport). It asks the server what tools exist
(list_tools) instead of hardcoding ALL_TOOLS, then calls tools through
that live connection. Same six tools as before - the difference is HOW
they are discovered and invoked.

Phase 9: the agent's own reasoning step (call_agent) is wrapped in an
OpenTelemetry span, separate from the tool-execution spans traced
inside mcp_server/incident_server.py. These are NOT yet linked into a
single end-to-end trace, since trace context isn't propagated across
the MCP process boundary - a known, documented limitation.

Run:
    python agent.py
"""

import asyncio
from typing import Annotated, TypedDict

from langchain_ollama import ChatOllama
from langchain_core.messages import AnyMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from langchain_mcp_adapters.tools import load_mcp_tools
from tracing import tracer


class AgentState(TypedDict):
    messages: Annotated[list[AnyMessage], add_messages]


def build_graph(tools):
    llm = ChatOllama(model="llama3.1", temperature=0)
    llm_with_tools = llm.bind_tools(tools)

    async def call_agent(state: AgentState) -> AgentState:
        with tracer.start_as_current_span("agent.reasoning_step") as span:
            span.set_attribute("agent.message_count", len(state["messages"]))
            response = await llm_with_tools.ainvoke(state["messages"])
            tool_calls = getattr(response, "tool_calls", None)
            span.set_attribute("agent.called_tool", bool(tool_calls))
            if tool_calls:
                span.set_attribute("agent.tool_names", ",".join(tc["name"] for tc in tool_calls))
            return {"messages": [response]}

    tool_node = ToolNode(tools)

    def route(state: AgentState) -> str:
        last_message = state["messages"][-1]
        if getattr(last_message, "tool_calls", None):
            return "tools"
        return END

    graph = StateGraph(AgentState)
    graph.add_node("agent", call_agent)
    graph.add_node("tools", tool_node)
    graph.set_entry_point("agent")
    graph.add_conditional_edges("agent", route, {"tools": "tools", END: END})
    graph.add_edge("tools", "agent")

    return graph.compile()


async def main():
    print("AegisAI agent (tools loaded live via MCP).")

    server_params = StdioServerParameters(
        command="python",
        args=["mcp_server/incident_server.py"],
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            tools = await load_mcp_tools(session)
            print(f"Loaded {len(tools)} tools from MCP server:")
            for t in tools:
                print(f"  - {t.name}")
            print()

            app = build_graph(tools)

            print("Try: 'Any incidents involving a forklift?'")
            print("Type 'quit' to exit.\n")

            while True:
                user_input = input("You: ")
                if user_input.strip().lower() in {"quit", "exit"}:
                    break

                result = await app.ainvoke({"messages": [HumanMessage(content=user_input)]})

                for msg in result["messages"]:
                    role = msg.__class__.__name__
                    if role == "AIMessage" and getattr(msg, "tool_calls", None):
                        for tc in msg.tool_calls:
                            print(f"  [agent decided to call tool] {tc['name']}({tc['args']})")
                    elif role == "ToolMessage":
                        print(f"  [tool result] {msg.content}")
                    elif role == "AIMessage":
                        print(f"Agent: {msg.content}\n")


if __name__ == "__main__":
    asyncio.run(main())
