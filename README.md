<h1 align="center">🛡️ AegisAI</h1>
<h3 align="center">Multimodal AI Investigation & Incident Response Platform</h3>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=18&duration=2800&pause=1000&color=39FF14&width=600&lines=Agent+%E2%86%92+Tool+%E2%86%92+Result+%E2%86%92+Agent;Hybrid+RAG+%2B+Knowledge+Graph+%2B+Vision;Built+one+phase+at+a+time%2C+measured+every+step" alt="typing" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active%20Development-39FF14?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Phase-2%20of%2012%20Complete-1f6feb?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Runs-100%25%20Local%20(Ollama)-8957e5?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://github.com/rudellll123"><img src="https://img.shields.io/badge/Author-Rahul%20Jha-181717?style=flat-square&logo=github&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/rahuljha174/"><img src="https://img.shields.io/badge/LinkedIn-rahuljha174-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:rahuljha1807@gmail.com"><img src="https://img.shields.io/badge/Email-rahuljha1807-D14836?style=flat-square&logo=gmail&logoColor=white" /></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> What is AegisAI?

AegisAI is a production-style multimodal AI platform that analyzes documents, images, video, audio, and structured data to **investigate incidents, connect evidence, and generate actionable reports for human review**.

It's built as the deliberate next step after simpler computer-vision, RAG, and backend projects — folding all of them into one agentic system where retrieval, vision, and reasoning work together as tools inside a single supervisor agent loop.

**The real-world problem:** organizations often have critical information scattered across CCTV footage, images, PDFs, databases, and human reports. Investigating an incident today means manually finding it, inspecting evidence, reading policies, searching historical records, connecting relationships, and writing a report — all by hand. AegisAI's goal is to turn that into one AI-assisted workflow that understands every format and connects the evidence itself, before a human signs off.

> **A worked example:** a construction-site incident occurs at 2:35 PM. AegisAI processes the relevant video, identifies the incident and evidence frames, retrieves the applicable safety policy, queries historical incidents, connects the entities in a knowledge graph, assesses severity, and drafts a report — for a human to approve.

> ⚠️ **Positioning matters here:** AegisAI is an AI-*assisted* investigation system, not one that independently makes high-stakes decisions. Human approval stays in the loop at every stage.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> What Makes It Different

<div align="center">

| Traditional Project | AegisAI |
|---|---|
| Detects an object | Detects **+ investigates** an incident |
| Basic vector RAG | Hybrid retrieval + reranking |
| Single database | PostgreSQL + vector DB + knowledge graph |
| One LLM call | Stateful multi-step agent workflow |
| Manual processing | Background jobs and queues |
| Demo-only deployment | Docker + CI/CD + AWS |
| No quality measurement | Real AI/RAG evaluation |
| Limited visibility | Full observability and metrics |

</div>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> System Architecture

```
                     User / Dashboard
                            │
                            ▼
                        FastAPI
                            │
                            ▼
                  LangGraph Supervisor Agent
                            │
     ┌──────────┬───────────┼───────────┬───────────┐
     ▼          ▼           ▼           ▼           ▼
 RAG Agent  Vision Agent  Data Agent  Knowledge  Audio Agent
 Qdrant +   YOLO +        PostgreSQL   Agent     Whisper +
 BM25 +     ByteTrack +               Neo4j +     TTS
 Reranker   VLM + OpenCV               Cypher
     │          │           │           │           │
     └──────────┴───────────┼───────────┴───────────┘
                            ▼
                       Report Agent
                            │
                            ▼
                 Notification / Action Tools
                            │
                            ▼
                  Human Approval → Action
```

**Runs on:** Redis + Celery background workers · OpenTelemetry + Prometheus + Grafana observability · Docker + GitHub Actions CI/CD · AWS (S3 / ECR / ECS / RDS) for production deployment.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> Full Tech Stack

<div align="center">

| | | | | | |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://skillicons.dev/icons?i=python" width="45"><br><sub><b>Python</b></sub> | <img src="https://skillicons.dev/icons?i=react" width="45"><br><sub><b>React</b></sub> | <img src="https://skillicons.dev/icons?i=nextjs" width="45"><br><sub><b>Next.js</b></sub> | <img src="https://skillicons.dev/icons?i=typescript" width="45"><br><sub><b>TypeScript</b></sub> | <img src="https://skillicons.dev/icons?i=tailwind" width="45"><br><sub><b>Tailwind</b></sub> | <img src="https://skillicons.dev/icons?i=fastapi" width="45"><br><sub><b>FastAPI</b></sub> |
| <img src="https://skillicons.dev/icons?i=postgres" width="45"><br><sub><b>PostgreSQL</b></sub> | <img src="https://skillicons.dev/icons?i=redis" width="45"><br><sub><b>Redis</b></sub> | <img src="https://skillicons.dev/icons?i=neo4j" width="45"><br><sub><b>Neo4j</b></sub> | <img src="https://skillicons.dev/icons?i=pytorch" width="45"><br><sub><b>PyTorch</b></sub> | <img src="https://skillicons.dev/icons?i=opencv" width="45"><br><sub><b>OpenCV</b></sub> | <img src="https://skillicons.dev/icons?i=huggingface" width="45"><br><sub><b>HF</b></sub> |
| <img src="https://skillicons.dev/icons?i=docker" width="45"><br><sub><b>Docker</b></sub> | <img src="https://skillicons.dev/icons?i=aws" width="45"><br><sub><b>AWS</b></sub> | <img src="https://skillicons.dev/icons?i=githubactions" width="45"><br><sub><b>GH Actions</b></sub> | <img src="https://skillicons.dev/icons?i=grafana" width="45"><br><sub><b>Grafana</b></sub> | <img src="https://skillicons.dev/icons?i=prometheus" width="45"><br><sub><b>Prometheus</b></sub> | <img src="https://skillicons.dev/icons?i=git" width="45"><br><sub><b>Git</b></sub> |
| <img src="https://skillicons.dev/icons?i=vscode" width="45"><br><sub><b>VS Code</b></sub> | <img src="https://skillicons.dev/icons?i=pytest" width="45"><br><sub><b>Pytest</b></sub> | <img src="https://skillicons.dev/icons?i=vercel" width="45"><br><sub><b>Vercel</b></sub> | <img src="https://skillicons.dev/icons?i=linux" width="45"><br><sub><b>Linux</b></sub> | <img src="https://skillicons.dev/icons?i=graphql" width="45"><br><sub><b>Pydantic-ish</b></sub> | <img src="https://skillicons.dev/icons?i=cpp" width="45"><br><sub><b>C++</b></sub> |

</div>

<p align="center">
  <img src="https://img.shields.io/badge/LangGraph-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Qdrant-DC244C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/BM25-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cross--Encoder%20Reranking-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/YOLO%20%2B%20ByteTrack-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Whisper-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Claude%20API-D97757?style=for-the-badge" />
  <img src="https://img.shields.io/badge/MCP-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/vLLM-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white" />
  <img src="https://img.shields.io/badge/Cypher-4581C3?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Development Phases

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%200-ARCHITECTURE%20%26%20SETUP-1f6feb?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

VS Code workspace, Git, Python virtual environment, and initial project structure.

`Python` `Git` `VS Code`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%201-AGENTIC%20AI%20FOUNDATION-8957e5?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

LLM tool calling, LangGraph agent state/nodes/edges, routing, and human-in-the-loop basics. Built a tiny working agent with two tools (`search_incidents`, `get_incident_details`) over a mock incident database, running 100% locally via Ollama.

`LangGraph` `LangChain` `Ollama` `Python`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%202-ADVANCED%20RAG-e8590c?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Qdrant vector store, dense retrieval, BM25 sparse retrieval, hybrid search via Reciprocal Rank Fusion, metadata filtering, cross-encoder reranking, and a measured retrieval evaluation. Wired into the Phase 1 agent as the `search_evidence` tool.

**Outcome:** 4/4 test queries retrieved their correct document in the top 3 — **100% precision@3**, confirmed end-to-end with the live agent correctly routing real questions to this tool.

`Qdrant` `sentence-transformers` `rank-bm25` `Cross-Encoder`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%203-KNOWLEDGE%20GRAPH-1a7f37?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Neo4j, Cypher, entity extraction, and relationship-aware retrieval to connect people, equipment, and incidents.

`Neo4j` `Cypher`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%204-COMPUTER%20VISION-6f42c1?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Integrate the existing YOLO/ByteTrack pipeline (from the Construction Safety project) and add VLM-based scene reasoning.

`YOLO` `ByteTrack` `OpenCV` `VLM`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%205-VOICE%20%2F%20AUDIO-c9184a?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Whisper speech-to-text, agent-driven voice interaction, and text-to-speech responses.

`Whisper` `TTS`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%206-MCP%20%2B%20TOOL%20ECOSYSTEM-0d6efd?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Expose database, RAG, graph, vision, and report capabilities as standardized agent tools via MCP.

`MCP`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%207-PRODUCTION%20BACKEND-fd7e14?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Redis + Celery for background processing, caching, job status, and scalable workloads. Swaps the mock incident list for real PostgreSQL.

`Redis` `Celery` `PostgreSQL`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%208-EVALUATION-198754?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/◐%20PARTIAL-FFCC00?style=flat-square" />

RAG accuracy and groundedness, agent success rate, tool-selection accuracy, vision metrics, and latency. Retrieval evaluation already shipped in Phase 2 — the rest is pending.

`Pytest` `Custom eval scripts`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%209-OBSERVABILITY-6610f2?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

OpenTelemetry traces, Prometheus metrics, and Grafana dashboards for full pipeline visibility.

`OpenTelemetry` `Prometheus` `Grafana`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2010-AWS%20%2B%20CI%2FCD-0dcaf0?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

S3, ECR, ECS, RDS, IAM basics, and a GitHub Actions deployment pipeline.

`AWS` `GitHub Actions` `Docker`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2011-FRONTEND%20%2F%20UX-d63384?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Polished dashboard, incident review flow, evidence viewer, knowledge-graph view, and an AI investigation interface.

`React` `Next.js` `TypeScript` `Tailwind`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2012-FINAL%20INTEGRATION-212529?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

End-to-end testing, full documentation, architecture diagram, live demo, and resume/LinkedIn presentation of the finished system.

`Docs` `Demo`

</td></tr>
</table>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> What's Working Right Now

A real conversation with the live agent, unedited:

```
You: What's the policy on forklifts near walkways?
  [agent decided to call tool] search_evidence({'query': 'forklifts near walkways'})
  [tool result] [policy-002] Forklifts and heavy vehicles must maintain a
  minimum 3-meter clearance from pedestrian walkways. Spotters are required
  when reversing near occupied zones.
Agent: Based on the search results, forklifts must maintain a minimum
3-meter clearance from pedestrian walkways, with spotters required when
reversing near occupied zones...
```

The `search_evidence` tool runs a full hybrid RAG pipeline underneath:

| Stage | Technique | Role |
|---|---|---|
| Dense retrieval | `all-MiniLM-L6-v2` embeddings + Qdrant | Understands meaning ("machinery" ≈ "forklift") |
| Sparse retrieval | BM25 | Catches exact terms, IDs, and codes |
| Fusion | Reciprocal Rank Fusion | Combines both rankings |
| Reranking | `cross-encoder/ms-marco-MiniLM-L-6-v2` | Final, confident scoring |

**Measured outcome:** 100% precision@3 on a 4-query evaluation set — every test query retrieved its correct source document in the top 3 results.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Setup & Run

Runs 100% free and local via [Ollama](https://ollama.com) — no API key, no billing.

```bash
# 0. Install Ollama (one-time), then pull a model that supports tool calling
ollama pull llama3.1

# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # Windows PowerShell: venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Ingest the evidence corpus into the local vector store (one-time)
cd rag
python ingest.py
cd ..

# 4. Run the agent (make sure Ollama is running in the background)
python agent.py
```

Try asking it:
- `Any incidents involving a forklift?`
- `What's the policy on forklifts near walkways?`
- `Tell me more about INC-1002`

Check retrieval quality directly:
```bash
cd rag
python evaluate.py
```

> **Note:** local models are smaller than hosted models, so tool-calling accuracy is noticeably rougher — expected, and it still teaches the same agent loop. For more reliable behavior, add API credit and switch `ChatOllama(...)` to `ChatAnthropic(...)` in `agent.py`.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> Project Structure

```
aegis-ai/
├── agent.py              # LangGraph agent: state, nodes, routing, run loop
├── tools.py              # search_incidents, get_incident_details, search_evidence
├── requirements.txt
├── rag/
│   ├── documents.py       # Evidence corpus (policies + incident reports)
│   ├── ingest.py           # Chunk → embed → upsert into Qdrant
│   ├── retrieve.py         # Dense, BM25, hybrid, and reranked search
│   └── evaluate.py         # Precision@k retrieval evaluation
└── README.md
```

*(`agents/`, `frontend/`, `knowledge_graph/`, `infrastructure/`, and more get added as later phases ship — see the Phase table above.)*

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="28"> Resume Positioning

**Target project description** for the finished system:

> *Built a multimodal AI investigation platform that analyzes video, documents, images, audio, and structured data; uses agentic orchestration, hybrid RAG, and knowledge-graph retrieval to connect evidence; and generates actionable investigation reports with evaluation, observability, and cloud deployment.*

**What's already provable today** (safe to claim now, with evidence):
- Designed and implemented a hybrid RAG pipeline (dense + BM25 + Reciprocal Rank Fusion + cross-encoder reranking) achieving 100% precision@3 on a retrieval evaluation set
- Built a LangGraph-based agentic system with dynamic tool routing across multiple specialized tools
- Ran the full stack locally via Ollama with zero cloud dependency, then designed for a hosted-LLM upgrade path

**Discipline going forward:** only claim a technology or metric on the final resume *after* it's actually implemented and measured — this README's Phase Dashboard above is the single source of truth for what's real versus what's planned.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

## <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Learning Principle

Built one phase at a time. Every phase leaves two things behind: a working component in the repository, and the ability to explain the technology and design decisions in an interview.

---

<p align="center">
  Built by <a href="https://github.com/rudellll123">Rahul Jha</a> · <a href="https://www.linkedin.com/in/rahuljha174/">LinkedIn</a> · <a href="mailto:rahuljha1807@gmail.com">Email</a>
</p>
