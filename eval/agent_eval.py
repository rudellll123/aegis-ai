"""
Phase 8 - Agent tool-selection accuracy eval.

Binds ALL_TOOLS to the same ChatOllama model agent.py uses, sends a
small set of test questions each with one clearly correct tool, and
checks whether the model's first tool_call matches. This directly
measures the tool-routing reliability that earlier phases only
described anecdotally.
"""

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from langchain_ollama import ChatOllama
from tools import ALL_TOOLS

TEST_CASES = [
    ("Any incidents involving a forklift?", "search_incidents"),
    ("Tell me the full details of INC-1002", "get_incident_details"),
    ("What's the policy on PPE requirements?", "search_evidence"),
    ("Transcribe this voice note: audio/test_audio/sample1.wav", "transcribe_incident_report"),
]

llm = ChatOllama(model="llama3.1", temperature=0)
llm_with_tools = llm.bind_tools(ALL_TOOLS)

hits = 0
for query, expected_tool in TEST_CASES:
    response = llm_with_tools.invoke(query)
    called = [tc["name"] for tc in getattr(response, "tool_calls", [])]
    correct = expected_tool in called
    status = "PASS" if correct else "FAIL"
    print(f"[{status}] '{query}' -> expected {expected_tool}, got {called or 'no tool call'}")
    hits += correct

print(f"\nTool-selection accuracy: {hits}/{len(TEST_CASES)} = {hits/len(TEST_CASES)*100:.0f}%")

