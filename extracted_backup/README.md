# AegisAI — Day 1: Tiny Agent

This is the smallest possible working slice of AegisAI: one LLM, two fake
tools, and a visible agent → tool → result → agent loop. Everything else
in the roadmap (RAG, vision, knowledge graph, etc.) is just "more tools"
plugged into this same loop pattern.

## Setup — this version runs 100% free and local via Ollama

No API key, no billing. The model runs on your own machine.

```bash
# 0. Install Ollama (one-time): https://ollama.com/download
#    Then pull a model that supports tool calling:
ollama pull llama3.1

# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # Windows PowerShell: venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run it (make sure Ollama is running in the background first —
#    it usually starts automatically after install)
python agent.py
```

**Note:** local models are much smaller than Claude, so tool-calling
accuracy will be noticeably rougher — it may occasionally answer directly
when it should search, or vice versa. That's expected and still teaches
the same agent loop. If you later want more reliable behavior, add a few
dollars of credit at console.anthropic.com and switch `ChatOllama(...)`
back to `ChatAnthropic(...)` in `agent.py`.

## Try asking it

- `Any incidents involving a forklift?`
- `Tell me more about INC-1002`
- `What happened in Building B and how severe was it?` (this should trigger
  a search first, then a details lookup — watch the printed steps)
- `What's the weather today?` (it has no tool for this — watch it just
  answer directly, or say it can't help, with no tool call)

## What to watch for

Each turn prints every step the agent takes:
- `[agent decided to call tool] search_incidents(...)` — the LLM chose a tool
- `[tool result] ...` — the real Python function ran and returned data
- `Agent: ...` — the final natural-language answer

That three-line pattern **is** the entire agent loop. Everything you add in
later phases (Qdrant retrieval, Neo4j graph queries, YOLO detections) will
show up exactly the same way — as another tool the agent decides to call.

## Files

- `tools.py` — the two tools (`search_incidents`, `get_incident_details`),
  backed by a fake in-memory list. Phase 7 swaps this for real PostgreSQL.
- `agent.py` — the LangGraph graph: state, nodes, routing, and the run loop.

## Next step

Once you can explain, in your own words, what happens between typing a
question and seeing "Agent: ..." print out — you're done with Day 1.
Move this folder's contents into `aegis-ai/agents/supervisor/` in the full
project structure and we'll start Phase 1 properly (multi-tool routing,
agent state design, human-in-the-loop basics).
