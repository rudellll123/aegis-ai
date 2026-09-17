<h1 align="center">🛡️ AegisAI</h1>
<h3 align="center">✨ Multimodal AI Investigation & Incident Response Platform ✨</h3>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=18&duration=2800&pause=1000&color=39FF14&width=650&lines=Agent+%E2%86%92+Tool+%E2%86%92+Result+%E2%86%92+Agent;Hybrid+RAG+%2B+Knowledge+Graph+%2B+Vision+%2B+Audio;12+Phases.+Built+one+at+a+time.+Fully+shipped." alt="typing" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-✅%20All%2012%20Phases%20Complete-39FF14?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Core%20Agent-100%25%20Local%20(Ollama)-8957e5?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-🟢%20Live%20on%20Render-46E3B7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Dashboard-🟢%20Live-f97316?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://github.com/rudellll123"><img src="https://img.shields.io/badge/Author-Rahul%20Jha-181717?style=flat-square&logo=github&logoColor=white" /></a>
  <a href="https://www.linkedin.com/in/rahuljha174/"><img src="https://img.shields.io/badge/LinkedIn-rahuljha174-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a>
  <a href="mailto:rahuljha1807@gmail.com"><img src="https://img.shields.io/badge/Email-rahuljha1807-D14836?style=flat-square&logo=gmail&logoColor=white" /></a>
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🧭 What is AegisAI?

AegisAI is a production-style multimodal AI platform that analyzes documents, images, video, audio, and structured data to **investigate incidents, connect evidence, and generate actionable reports for human review**.

It folds computer vision, retrieval-augmented generation, a knowledge graph, and speech AI into **one agentic system** — where every capability is a tool the supervisor agent can pick up, use, and reason over, orchestrated through a standard MCP tool layer.

> 🏗️ **The real-world problem:** organizations have critical information scattered across CCTV footage, images, PDFs, databases, and human reports. Investigating an incident today means manually finding it, inspecting evidence, reading policy, searching history, connecting relationships, and writing it all up by hand. AegisAI turns that into one AI-assisted workflow that understands every format and connects the evidence itself — before a human signs off.

> 🎯 **Worked example:** a construction-site incident occurs at 2:35 PM. AegisAI processes the video, identifies evidence frames, retrieves the applicable safety policy, queries historical incidents, connects entities in a knowledge graph, assesses severity, and drafts a report — for a human to approve.

> ⚠️ **Positioning matters:** AegisAI is AI-*assisted*, not autonomous. Human approval stays in the loop at every single stage — see the "Human Review Enabled" badge live on the dashboard below.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🖥️ Live Product Tour

**Command Center** — real-time system status pulled live from the deployed backend, incident stats, and evidence-source health:

> 🟢 Render API · 🟢 Vision Engine · 🟢 RAG Engine · 🟢 Audio Engine — all online, polled live via "Refresh Data"

**Recent Incidents** — real investigations, stored in and served from PostgreSQL, with severity badges and drill-down:

> `#INC-1001` Forklift near-miss in Loading Dock B — 🟢 LOW
> `#INC-1002` Minor chemical spill in Mixing Lab — 🟠 MEDIUM

**Multimodal Analysis Pipeline** — the actual 4-stage flow evidence moves through: **Retrieve → See → Listen → Investigate**, backed by RAG/Qdrant, YOLOv8/ByteTrack, Whisper, and agent reasoning — with live upload widgets for video and audio evidence.

**Video Intelligence in action** — a real uploaded clip processed end-to-end: **150 frames analyzed, 2 objects tracked**, each with a live confidence score (`person — 0.8724`, `person — 0.9132`), feeding straight into severity distribution and classification charts on the same dashboard.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🚀 What Makes It Different

<div align="center">

| 🔹 Traditional Project | 🔸 AegisAI |
|---|---|
| Detects an object | Detects **+ investigates** an incident |
| Basic vector RAG | Hybrid retrieval + reranking |
| Single database | PostgreSQL + vector DB + knowledge graph |
| One LLM call | Stateful multi-step agent workflow |
| Manual processing | Background jobs and queues (Celery + Redis) |
| Demo-only deployment | Dockerized services + CI/CD + a live deployed API and dashboard |
| No quality measurement | Real, scripted AI / RAG / vision / agent evaluation |
| Limited visibility | Prometheus + Grafana + OpenTelemetry tracing |
| Backend-only | Full-stack: live Command Center dashboard on top of every engine |

</div>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🏛️ System Architecture

A straight-line view of how one piece of evidence flows through the system, start to finish:

```
👤 User
   │
   ▼
🖥️  Command Center Dashboard   (Next.js · React · TypeScript · Tailwind)
   │
   ▼
🌐  FastAPI Gateway              (deployed live on Render)
   │
   ▼
🧠  LangGraph Supervisor Agent   (routes each request to the right tool)
   │
   ▼
🔌  MCP Client                   (async, spawns tool server over stdio)
   │
   ▼
🧰  MCP Tool Server               (FastMCP · list_tools() discovery)
   │
   ├──▶ 📚  RAG Agent         →  Qdrant + BM25 + Cross-Encoder Reranker
   ├──▶ 👁️  Vision Agent      →  YOLOv8 + ByteTrack + VLM (moondream)
   ├──▶ 🗄️  Data Agent        →  PostgreSQL + Celery (async video jobs)
   ├──▶ 🕸️  Knowledge Agent   →  Neo4j (parameterized Cypher only)
   └──▶ 🎙️  Audio Agent       →  Whisper (STT) + pyttsx3 (TTS)
   │
   ▼
📝  Report Synthesis            (agent composes findings into one report)
   │
   ▼
📊  Observability Layer          Prometheus · Grafana · OpenTelemetry
   │
   ▼
✅  Human Review → Action
```

**Infrastructure running today:** 🐳 Docker containers for PostgreSQL, Redis, Neo4j, Prometheus, and Grafana · ⚙️ Celery workers for non-blocking vision jobs · 🔁 GitHub Actions CI running real evaluation scripts and an API smoke test against a live Postgres service container on every push · ☁️ a FastAPI service deployed live on Render, backed by a managed Postgres database · 🖥️ a live Next.js dashboard consuming that API in real time.

**📄 Design deliverable — full production AWS blueprint:** [`AWS_ARCHITECTURE.md`](./AWS_ARCHITECTURE.md) documents the complete scaled-up deployment (ECS Fargate, RDS Multi-AZ, ElastiCache, S3, ECR, IAM least-privilege, VPC public/private split) with a full cost estimate (~$160–260/month), evaluated against Oracle Cloud. It's included as an architecture artifact in the repo alongside the live Render deployment that actually serves traffic today.

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🧰 Full Tech Stack

<div align="center">

| | | | | | |
|:---:|:---:|:---:|:---:|:---:|:---:|
| <img src="https://skillicons.dev/icons?i=python" width="45"><br><sub><b>Python</b></sub> | <img src="https://skillicons.dev/icons?i=react" width="45"><br><sub><b>React</b></sub> | <img src="https://skillicons.dev/icons?i=nextjs" width="45"><br><sub><b>Next.js</b></sub> | <img src="https://skillicons.dev/icons?i=typescript" width="45"><br><sub><b>TypeScript</b></sub> | <img src="https://skillicons.dev/icons?i=tailwind" width="45"><br><sub><b>Tailwind</b></sub> | <img src="https://skillicons.dev/icons?i=fastapi" width="45"><br><sub><b>FastAPI</b></sub> |
| <img src="https://skillicons.dev/icons?i=postgres" width="45"><br><sub><b>PostgreSQL</b></sub> | <img src="https://skillicons.dev/icons?i=redis" width="45"><br><sub><b>Redis</b></sub> | <img src="https://skillicons.dev/icons?i=neo4j" width="45"><br><sub><b>Neo4j</b></sub> | <img src="https://skillicons.dev/icons?i=pytorch" width="45"><br><sub><b>PyTorch</b></sub> | <img src="https://skillicons.dev/icons?i=opencv" width="45"><br><sub><b>OpenCV</b></sub> | <img src="https://skillicons.dev/icons?i=huggingface" width="45"><br><sub><b>HF</b></sub> |
| <img src="https://skillicons.dev/icons?i=docker" width="45"><br><sub><b>Docker</b></sub> | <img src="https://skillicons.dev/icons?i=aws" width="45"><br><sub><b>AWS (design)</b></sub> | <img src="https://skillicons.dev/icons?i=githubactions" width="45"><br><sub><b>GH Actions</b></sub> | <img src="https://skillicons.dev/icons?i=grafana" width="45"><br><sub><b>Grafana</b></sub> | <img src="https://skillicons.dev/icons?i=prometheus" width="45"><br><sub><b>Prometheus</b></sub> | <img src="https://skillicons.dev/icons?i=git" width="45"><br><sub><b>Git</b></sub> |
| <img src="https://skillicons.dev/icons?i=vscode" width="45"><br><sub><b>VS Code</b></sub> | <img src="https://skillicons.dev/icons?i=pytest" width="45"><br><sub><b>Pytest</b></sub> | <img src="https://skillicons.dev/icons?i=vercel" width="45"><br><sub><b>Render</b></sub> | <img src="https://skillicons.dev/icons?i=linux" width="45"><br><sub><b>Linux</b></sub> | <img src="https://skillicons.dev/icons?i=graphql" width="45"><br><sub><b>SQLAlchemy</b></sub> | <img src="https://skillicons.dev/icons?i=cpp" width="45"><br><sub><b>C++</b></sub> |

</div>

<p align="center">
  <img src="https://img.shields.io/badge/LangGraph-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Qdrant-DC244C?style=for-the-badge" />
  <img src="https://img.shields.io/badge/BM25-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cross--Encoder%20Reranking-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/YOLOv8%20%2B%20ByteTrack-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Whisper-412991?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/MCP%20(FastMCP)-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenTelemetry-425CC7?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Cypher%20(parameterized)-4581C3?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🗺️ Development Phases — All 12 Shipped

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%200-🏗️%20ARCHITECTURE%20%26%20SETUP-1f6feb?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

VS Code workspace, Git, Python virtual environment, and initial project structure.

`Python` `Git` `VS Code`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%201-🤖%20AGENTIC%20AI%20FOUNDATION-8957e5?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

LLM tool calling, LangGraph agent state/nodes/edges, routing, and human-in-the-loop basics. Built a working agent with two tools (`search_incidents`, `get_incident_details`) over a mock incident database, running 100% locally via Ollama.

`LangGraph` `LangChain` `Ollama` `Python`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%202-📚%20ADVANCED%20RAG-e8590c?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Qdrant vector store, dense retrieval, BM25 sparse retrieval, hybrid search via Reciprocal Rank Fusion, metadata filtering, cross-encoder reranking, and a measured retrieval evaluation. Wired into the agent as `search_evidence`.

**📈 Outcome:** 4/4 test queries retrieved their correct document in the top 3 — **100% precision@3**, confirmed live with the agent correctly routing real questions to this tool.

`Qdrant` `sentence-transformers` `rank-bm25` `Cross-Encoder`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%203-🕸️%20KNOWLEDGE%20GRAPH-1a7f37?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Neo4j graph storing People, Incidents, and Locations as connected entities, for multi-hop relationship queries a vector search can't answer.

**🔒 Security-first design:** the agent is deliberately **not** allowed to generate raw Cypher. `KnowledgeAgent` exposes only a fixed, parameterized set of safe methods — same principle as parameterized SQL over string-concatenated queries.

`Neo4j` `Cypher`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%204-👁️%20COMPUTER%20VISION-6f42c1?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

YOLOv8n object detection filtered through an allow-list + confidence threshold, ByteTrack multi-object tracking for persistent identity across frames, and a local VLM (moondream) for narrative scene description. Wired in as `analyze_incident_video`.

**🔍 Real finding:** the VLM hallucinated objects (2 buses + potted plants) that weren't in a test image, while YOLO correctly counted 1 bus + 3 people. Design rule adopted: YOLO's structured output is the source of truth for counts; the VLM is supplementary narrative only.

`YOLOv8` `ByteTrack` `OpenCV` `VLM (moondream)`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%205-🎙️%20VOICE%20%2F%20AUDIO-c9184a?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Whisper ("base") for speech-to-text with per-segment timestamps, and `pyttsx3` for offline text-to-speech. Wired in as `transcribe_incident_report` and `speak_response`. Verified against a known smoke-test clip — exact, word-for-word correct transcript.

`Whisper` `pyttsx3`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%206-🔌%20MCP%20%2B%20TOOL%20ECOSYSTEM-0d6efd?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

All tools exposed behind a standard MCP server (`FastMCP`), verified live via MCP Inspector. `agent.py` rewired as an async MCP client — spawns the tool server as a subprocess over stdio, discovers tools dynamically via `list_tools()`, and converts them into LangGraph-compatible tools via `langchain_mcp_adapters`.

**🔍 Real finding:** verified with `llama3.1` (correct native `tool_calls`, but slow on CPU) and `llama3.2:1b` (fast, but emits tool calls as plain-text JSON — a known small-model limitation). Documented `ChatAnthropic` as the production fix.

`MCP` `FastMCP` `langchain-mcp-adapters`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%207-🗄️%20PRODUCTION%20BACKEND-fd7e14?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Migrated incidents from an in-memory dict to real PostgreSQL via SQLAlchemy, running in Docker alongside Redis. Added Celery for background processing: `start_video_analysis` submits a job and returns instantly with an ID, while `check_video_analysis` polls once the worker finishes — so the agent never blocks on heavy vision jobs. Kept the original synchronous tool alongside for quick clips.

**✅ Verified:** all 8 tools (2 Postgres-backed, 2 async, 4 unchanged) discoverable through the same MCP layer from Phase 6.

`Redis` `Celery` `PostgreSQL` `SQLAlchemy` `Docker`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%208-📊%20EVALUATION-198754?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Built `eval/agent_eval.py` (tool-selection accuracy), `eval/vision_eval.py` (detection/tracking vs ground truth), `eval/latency_eval.py` (per-tool timing), alongside `rag/evaluate.py` from Phase 2.

**📈 Results:** RAG precision@3 = 4/4 (100%) · vision checks = 4/4 pass/correctly documented · agent tool-selection = 4/4 (100%) · latency benchmark independently confirmed the Phase 7 async design was the right call.

**🔍 Real finding:** caught and fixed a genuine Qdrant data-corruption bug — `meta.json` lost its collection reference after an earlier interrupted process. Fixed by re-running `rag/ingest.py`.

`Pytest` `Custom eval scripts`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%209-📡%20OBSERVABILITY-6610f2?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Prometheus (`metrics.py`, `@track_metrics` on all 8 tools) exposing `/metrics`, scraped in Docker, visualized in a 3-panel Grafana dashboard — confirmed working end-to-end with real traffic. OpenTelemetry tracing (`@trace_tool`) on every tool plus the agent's own reasoning step.

**🔍 Real finds:** (1) a stdout-contamination bug corrupting the MCP JSON-RPC stream, fixed by redirecting logs to stderr; (2) severe RAM exhaustion (down to ~250MB free) that killed Postgres/Redis uncleanly — diagnosed with real memory/process inspection and fixed by restarting the affected containers.

`Prometheus` `Grafana` `OpenTelemetry`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2010-☁️%20DEPLOYMENT%20%2B%20CI%2FCD-0dcaf0?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Deployed a scoped FastAPI service (`api.py`) live on **Render**, backed by a managed Postgres database, self-seeding on startup. Built a GitHub Actions CI pipeline (`.github/workflows/ci.yml`) running RAG/vision evaluations plus an API smoke test against a live Postgres service container on every push.

**📄 Also shipped:** [`AWS_ARCHITECTURE.md`](./AWS_ARCHITECTURE.md) — a full production AWS blueprint (ECS Fargate, RDS Multi-AZ, ElastiCache, S3, ECR, IAM least-privilege), evaluated against Oracle Cloud, cost-estimated at ~$160–260/month.

**🔍 Real finds:** a stale Dockerfile broke the first deploy; `DATABASE_URL` malformation from manual editing, fixed by auto-normalizing the URL in `db.py`; local Postgres port 5432 unreachable (ISP-blocked), solved by self-seeding on boot instead; a Windows-only `pywin32` dependency broke Linux CI until a platform marker was added.

`Render` `GitHub Actions` `Docker` `AWS (architecture)`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2011-🖥️%20FRONTEND%20%2F%20UX-d63384?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Built the **Command Center** — a live Next.js + TypeScript + Tailwind dashboard sitting directly on top of the deployed backend. Ships with real-time system status tiles (Render API, Vision, RAG, Audio engines), a Recent Incidents feed pulled live from PostgreSQL with severity badges, a 4-stage Multimodal Analysis Pipeline view (Retrieve → See → Listen → Investigate), and working upload widgets for video and audio evidence.

**✅ Verified live:** uploaded video evidence processed end-to-end through the dashboard — 150 frames analyzed, 2 tracked objects returned with real confidence scores — flowing straight into live Severity Distribution and Classification charts on the same screen.

`Next.js` `React` `TypeScript` `Tailwind CSS`

</td></tr>
</table>

<table>
<tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2012-🎬%20FINAL%20INTEGRATION-212529?style=for-the-badge" /> &nbsp; <img src="https://img.shields.io/badge/✅%20DONE-39FF14?style=flat-square" />

Full stack wired together and running: dashboard → FastAPI → agent/MCP tool layer → Postgres / Qdrant / Neo4j / Redis, with live status monitoring visible directly in the UI. Documentation consolidated into this README as the single source of truth for the system's architecture, phase history, and setup instructions.

`Full-stack integration` `Docs`

</td></tr>
</table>

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 💬 What's Working Right Now

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
| 🔵 Dense retrieval | `all-MiniLM-L6-v2` + Qdrant | Understands meaning ("machinery" ≈ "forklift") |
| 🟢 Sparse retrieval | BM25 | Catches exact terms, IDs, and codes |
| 🟣 Fusion | Reciprocal Rank Fusion | Combines both rankings |
| 🟠 Reranking | `cross-encoder/ms-marco-MiniLM-L-6-v2` | Final, confident scoring |

**📈 Measured outcome:** 100% precision@3 on a 4-query evaluation set — every test query retrieved its correct source document in the top 3 results.

**🖥️ Live dashboard, live backend:**

```bash
curl https://YOUR-RENDER-SERVICE-URL.onrender.com/incidents
```

*(Swap in your actual Render service URL and dashboard domain here once published.)*

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## ⚡ Setup & Run

### 🧠 Full local agent (all 8 tools, 100% free via Ollama)

```bash
# 0. Install Ollama (one-time), then pull a model that supports tool calling
ollama pull llama3.1

# 1. Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate        # Windows PowerShell: venv\Scripts\Activate.ps1

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start infrastructure (Postgres, Redis, Neo4j, Prometheus, Grafana)
docker compose up -d

# 4. Ingest the evidence corpus into the local vector store (one-time)
cd rag && python ingest.py && cd ..

# 5. Start the Celery worker (separate terminal)
celery -A celery_app worker --loglevel=info --pool=solo

# 6. Run the agent (make sure Ollama is running in the background)
python agent.py
```

Try asking it:
- 💬 `Any incidents involving a forklift?`
- 💬 `What's the policy on forklifts near walkways?`
- 💬 `Tell me more about INC-1002`
- 💬 `Analyze this incident video for me`

Run the evaluation suite:
```bash
python rag/evaluate.py
python eval/vision_eval.py
python eval/agent_eval.py
python eval/latency_eval.py
```

📊 Prometheus → `http://localhost:9090` · 📈 Grafana → `http://localhost:3000` · 🔭 OpenTelemetry spans → console (`ConsoleSpanExporter`)

> 💡 **Note:** local models are smaller than hosted models, so tool-calling accuracy is rougher on tiny models — expected, and still teaches the same agent loop. For more reliable behavior, add API credit and switch `ChatOllama(...)` to `ChatAnthropic(...)` in `agent.py`.

### ☁️ Deployed API (lightweight, incident endpoints only)

The live Render deployment exposes the Postgres-backed incident endpoints only (heavy ML tools need more RAM than a free tier provides). It self-seeds its own database on startup:

```bash
uvicorn api:app --reload          # locally
curl https://YOUR-RENDER-SERVICE-URL.onrender.com/incidents   # deployed
```

### 🖥️ Dashboard

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000/dashboard` 🎉

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 📁 Project Structure

```
aegis-ai/
├── agent.py                      # LangGraph agent + async MCP client
├── api.py                        # Scoped FastAPI service (deployed on Render)
├── db.py                         # SQLAlchemy models, DATABASE_URL normalization
├── celery_app.py                 # Celery app config (Redis broker/backend)
├── metrics.py                    # Prometheus @track_metrics decorator
├── tracing.py                    # OpenTelemetry @trace_tool decorator
├── requirements.txt
├── docker-compose.yml            # Postgres, Redis, Neo4j, Prometheus, Grafana
├── Dockerfile
├── AWS_ARCHITECTURE.md           # Full production AWS design
├── .github/workflows/ci.yml      # Eval + API smoke test on every push
├── mcp_server/
│   └── incident_server.py        # FastMCP server exposing all 8 tools
├── rag/
│   ├── documents.py               # Evidence corpus
│   ├── ingest.py                   # Chunk → embed → upsert into Qdrant
│   ├── retrieve.py                  # Dense, BM25, hybrid, reranked search
│   └── evaluate.py                   # Precision@k retrieval evaluation
├── knowledge_graph/
│   └── graph_agent.py             # Neo4j-backed KnowledgeAgent
├── vision/
│   ├── detector.py                 # YOLOv8 detection + filtering
│   ├── tracker.py                   # ByteTrack multi-object tracking
│   └── scene_reasoner.py             # VLM (moondream) scene description
├── audio/
│   ├── transcriber.py               # Whisper speech-to-text
│   └── speaker.py                     # pyttsx3 text-to-speech
├── eval/
│   ├── agent_eval.py                # Tool-selection accuracy
│   ├── vision_eval.py                # Detection/tracking accuracy
│   └── latency_eval.py                # Per-tool timing benchmark
├── monitoring/
│   ├── prometheus.yml                # Scrape config
│   └── grafana/                       # Dashboard provisioning
├── frontend/                     # 🖥️ Command Center dashboard (Next.js)
│   └── src/
│       ├── app/dashboard/         # Live status, incidents, pipeline views
│       └── components/             # Upload widgets, charts, nav
└── README.md
```

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450">
</p>

---

## 🌱 Learning Principle

Built one phase at a time. Every phase left two things behind: a working component in the repository, and the ability to explain the technology and design decisions — including the bugs hit and how they were diagnosed — in an interview. 🚀

---

<p align="center">
  Built with 🛡️ by <a href="https://github.com/rudellll123">Rahul Jha</a> · <a href="https://www.linkedin.com/in/rahuljha174/">LinkedIn</a> · <a href="mailto:rahuljha1807@gmail.com">Email</a>
</p>
