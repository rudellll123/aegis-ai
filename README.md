<h1 align="center">🛡️ AegisAI</h1> <h3 align="center">Multimodal AI Investigation & Incident Response Platform</h3> <p align="center"> <img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=18&duration=2800&pause=1000&color=39FF14&width=600&lines=Agent+%E2%86%92+Tool+%E2%86%92+Result+%E2%86%92+Agent;Hybrid+RAG+%2B+Knowledge+Graph+%2B+Vision;Built+one+phase+at+a+time%2C+measured+every+step" alt="typing" /> </p> <p align="center"> <img src="https://img.shields.io/badge/Status-Active%20Development-39FF14?style=for-the-badge" /> <img src="https://img.shields.io/badge/Phase-10%20of%2012%20Complete-1f6feb?style=for-the-badge" /> <img src="https://img.shields.io/badge/Core%20Stack-100%25%20Local%20(Ollama)-8957e5?style=for-the-badge" /> <img src="https://img.shields.io/badge/API-Live%20on%20Render-46E3B7?style=for-the-badge" /> </p> <p align="center"> <a href="https://github.com/rudellll123"><img src="https://img.shields.io/badge/Author-Rahul%20Jha-181717?style=flat-square&logo=github&logoColor=white" /></a> <a href="https://www.linkedin.com/in/rahuljha174/"><img src="https://img.shields.io/badge/LinkedIn-rahuljha174-0A66C2?style=flat-square&logo=linkedin&logoColor=white" /></a> <a href="mailto:rahuljha1807@gmail.com"><img src="https://img.shields.io/badge/Email-rahuljha1807-D14836?style=flat-square&logo=gmail&logoColor=white" /></a> </p> <p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> What is AegisAI?

AegisAI is a production-style multimodal AI platform that analyzes documents, images, video, audio, and structured data to investigate incidents, connect evidence, and generate actionable reports for human review.

It's built as the deliberate next step after simpler computer-vision, RAG, and backend projects — folding all of them into one agentic system where retrieval, vision, and reasoning work together as tools inside a single supervisor agent loop.

The real-world problem: organizations often have critical information scattered across CCTV footage, images, PDFs, databases, and human reports. Investigating an incident today means manually finding it, inspecting evidence, reading policies, searching historical records, connecting relationships, and writing a report — all by hand. AegisAI's goal is to turn that into one AI-assisted workflow that understands every format and connects the evidence itself, before a human signs off.

A worked example: a construction-site incident occurs at 2:35 PM. AegisAI processes the relevant video, identifies the incident and evidence frames, retrieves the applicable safety policy, queries historical incidents, connects the entities in a knowledge graph, assesses severity, and drafts a report — for a human to approve.

⚠️ Positioning matters here: AegisAI is an AI-assisted investigation system, not one that independently makes high-stakes decisions. Human approval stays in the loop at every stage.

<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> What Makes It Different
<div align="center">
Traditional Project	AegisAI
Detects an object	Detects + investigates an incident
Basic vector RAG	Hybrid retrieval + reranking
Single database	PostgreSQL + vector DB + knowledge graph
One LLM call	Stateful multi-step agent workflow
Manual processing	Background jobs and queues (Celery + Redis)
Demo-only deployment	Dockerized services + CI/CD + a live deployed API
No quality measurement	Real, scripted AI/RAG/vision/agent evaluation
Limited visibility	Prometheus + Grafana + OpenTelemetry tracing
</div> <p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> System Architecture
                 User / Dashboard
                        │
                        ▼
                    FastAPI
                        │
                        ▼
              LangGraph Supervisor Agent
                        │
                        ▼
                   MCP Client Layer
              (stdio subprocess, list_tools())
                        │
                        ▼
                MCP Tool Server (FastMCP)
                        │
 ┌──────────┬───────────┼───────────┬───────────┐
 ▼          ▼           ▼           ▼           ▼
RAG Agent  Vision Agent  Data Agent  Knowledge   Audio Agent
Qdrant +   YOLOv8 +      PostgreSQL  Agent       Whisper +
BM25 +     ByteTrack +   + Celery    Neo4j +     pyttsx3
Reranker   VLM (moondream) (async)   Cypher (parameterized)
 │          │           │           │           │
 └──────────┴───────────┼───────────┴───────────┘
                        ▼
              Observability Layer
        Prometheus + Grafana + OpenTelemetry
                        │
                        ▼
                 Human Review → Action

Infrastructure running today: Docker containers for PostgreSQL, Redis, Neo4j, Prometheus, and Grafana · Celery workers for non-blocking vision jobs · GitHub Actions CI running real evaluation scripts and an API smoke test against a live Postgres service container on every push · a scoped-down FastAPI service deployed live on Render, backed by a managed Postgres database.

Note on AWS: a complete production AWS architecture (ECS Fargate, RDS Multi-AZ, ElastiCache, S3, ECR, IAM least-privilege roles, VPC public/private split) is fully designed and documented in AWS_ARCHITECTURE.md, including an estimated monthly cost (~$160–260). It is a design deliverable, not a live deployment — provisioning it requires a payment method not available during this build. The live, deployed API today runs on Render's free tier instead. This distinction is deliberate and stated plainly rather than implied otherwise.

<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> Full Tech Stack
<div align="center">
					
<img src="https://skillicons.dev/icons?i=python" width="45">
<sub><b>Python</b></sub>	<img src="https://skillicons.dev/icons?i=react" width="45">
<sub><b>React</b></sub>	<img src="https://skillicons.dev/icons?i=nextjs" width="45">
<sub><b>Next.js</b></sub>	<img src="https://skillicons.dev/icons?i=typescript" width="45">
<sub><b>TypeScript</b></sub>	<img src="https://skillicons.dev/icons?i=tailwind" width="45">
<sub><b>Tailwind</b></sub>	<img src="https://skillicons.dev/icons?i=fastapi" width="45">
<sub><b>FastAPI</b></sub>
<img src="https://skillicons.dev/icons?i=postgres" width="45">
<sub><b>PostgreSQL</b></sub>	<img src="https://skillicons.dev/icons?i=redis" width="45">
<sub><b>Redis</b></sub>	<img src="https://skillicons.dev/icons?i=neo4j" width="45">
<sub><b>Neo4j</b></sub>	<img src="https://skillicons.dev/icons?i=pytorch" width="45">
<sub><b>PyTorch</b></sub>	<img src="https://skillicons.dev/icons?i=opencv" width="45">
<sub><b>OpenCV</b></sub>	<img src="https://skillicons.dev/icons?i=huggingface" width="45">
<sub><b>HF</b></sub>
<img src="https://skillicons.dev/icons?i=docker" width="45">
<sub><b>Docker</b></sub>	<img src="https://skillicons.dev/icons?i=aws" width="45">
<sub><b>AWS (designed)</b></sub>	<img src="https://skillicons.dev/icons?i=githubactions" width="45">
<sub><b>GH Actions</b></sub>	<img src="https://skillicons.dev/icons?i=grafana" width="45">
<sub><b>Grafana</b></sub>	<img src="https://skillicons.dev/icons?i=prometheus" width="45">
<sub><b>Prometheus</b></sub>	<img src="https://skillicons.dev/icons?i=git" width="45">
<sub><b>Git</b></sub>
<img src="https://skillicons.dev/icons?i=vscode" width="45">
<sub><b>VS Code</b></sub>	<img src="https://skillicons.dev/icons?i=pytest" width="45">
<sub><b>Pytest</b></sub>	<img src="https://skillicons.dev/icons?i=vercel" width="45">
<sub><b>Render</b></sub>	<img src="https://skillicons.dev/icons?i=linux" width="45">
<sub><b>Linux</b></sub>	<img src="https://skillicons.dev/icons?i=graphql" width="45">
<sub><b>SQLAlchemy</b></sub>	<img src="https://skillicons.dev/icons?i=cpp" width="45">
<sub><b>C++</b></sub>
</div> <p align="center"> <img src="https://img.shields.io/badge/LangGraph-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge" /> <img src="https://img.shields.io/badge/Qdrant-DC244C?style=for-the-badge" /> <img src="https://img.shields.io/badge/BM25-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/Cross--Encoder%20Reranking-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/YOLOv8%20%2B%20ByteTrack-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/Whisper-412991?style=for-the-badge&logo=openai&logoColor=white" /> <img src="https://img.shields.io/badge/MCP%20(FastMCP)-black?style=for-the-badge" /> <img src="https://img.shields.io/badge/Ollama-000000?style=for-the-badge" /> <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white" /> <img src="https://img.shields.io/badge/OpenTelemetry-425CC7?style=for-the-badge" /> <img src="https://img.shields.io/badge/Cypher%20(parameterized)-4581C3?style=for-the-badge" /> </p> <p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Development Phases
<table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%200-ARCHITECTURE%20%26%20SETUP-1f6feb?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

VS Code workspace, Git, Python virtual environment, and initial project structure.

Python Git VS Code

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%201-AGENTIC%20AI%20FOUNDATION-8957e5?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

LLM tool calling, LangGraph agent state/nodes/edges, routing, and human-in-the-loop basics. Built a working agent with two tools (search_incidents, get_incident_details) over a mock incident database, running 100% locally via Ollama.

LangGraph LangChain Ollama Python

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%202-ADVANCED%20RAG-e8590c?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Qdrant vector store, dense retrieval, BM25 sparse retrieval, hybrid search via Reciprocal Rank Fusion, metadata filtering, cross-encoder reranking, and a measured retrieval evaluation. Wired into the Phase 1 agent as the search_evidence tool.

Outcome: 4/4 test queries retrieved their correct document in the top 3 — 100% precision@3, confirmed end-to-end with the live agent correctly routing real questions to this tool.

Qdrant sentence-transformers rank-bm25 Cross-Encoder

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%203-KNOWLEDGE%20GRAPH-1a7f37?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Neo4j graph storing People, Incidents, and Locations as connected entities, for multi-hop relationship queries a vector search can't answer (e.g. "who was at high-severity incidents at this location").

Security-first design: the agent is deliberately not allowed to generate raw Cypher. KnowledgeAgent exposes only a fixed, parameterized set of safe methods — the LLM picks which operation to run and what parameter to pass, but can never construct the query itself. Same principle as parameterized SQL over string-concatenated queries.

Neo4j Cypher

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%204-COMPUTER%20VISION-6f42c1?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

YOLOv8n object detection filtered through an allow-list + confidence threshold, ByteTrack multi-object tracking for persistent identity across frames, and a local VLM (moondream) for narrative scene description. Wired into the agent as analyze_incident_video.

Real finding worth knowing: the VLM hallucinated objects (2 buses + potted plants) that weren't in a test image, while YOLO correctly counted 1 bus + 3 people. Design rule adopted going forward: YOLO's structured output is the source of truth for counts; the VLM is supplementary narrative only, never a factual claim.

YOLOv8 ByteTrack OpenCV VLM (moondream)

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%205-VOICE%20%2F%20AUDIO-c9184a?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Whisper (local, "base" size) for speech-to-text with per-segment timestamps, and pyttsx3 for offline text-to-speech. Wired into the agent as transcribe_incident_report and speak_response. Verified against a known smoke-test clip — exact, word-for-word correct transcript.

Whisper pyttsx3

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%206-MCP%20%2B%20TOOL%20ECOSYSTEM-0d6efd?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

All 6 tools (incident search, RAG, vision, audio) exposed behind a standard MCP server (FastMCP), verified live via MCP Inspector. agent.py rewired as an async MCP client — spawns the tool server as a subprocess over stdio, discovers tools dynamically via list_tools() instead of a hardcoded Python import, and converts them into LangGraph-compatible tools via langchain_mcp_adapters.

Real finding worth knowing: verified with llama3.1 (correct native tool_calls format, but slow on CPU) and llama3.2:1b (fast, but emits tool calls as plain-text JSON instead of using native tool_calls — a known small-model limitation, not an MCP defect). Documented ChatAnthropic as the production fix for reliable native tool-calling at usable speed.

MCP FastMCP langchain-mcp-adapters

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%207-PRODUCTION%20BACKEND-fd7e14?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Migrated incidents from an in-memory Python dict to real PostgreSQL via SQLAlchemy, running in Docker alongside Redis. Added Celery for background job processing: start_video_analysis submits a video-analysis job and returns immediately with a job ID, while check_video_analysis polls for the result once the Celery worker finishes — so the agent no longer blocks on long-running vision jobs. Kept the original synchronous analyze_incident_video tool alongside the async pair, so the agent can choose blocking (quick clips) vs non-blocking (heavy clips) based on the situation.

Verified: all 8 tools (2 Postgres-backed, 2 new async, 4 unchanged) discoverable through the same MCP layer built in Phase 6.

Redis Celery PostgreSQL SQLAlchemy Docker

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%208-EVALUATION-198754?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Built eval/agent_eval.py (tool-selection accuracy), eval/vision_eval.py (detection/tracking accuracy against known ground truth), and eval/latency_eval.py (per-tool timing), alongside the existing rag/evaluate.py from Phase 2.

Results: RAG precision@3 = 4/4 (100%) · vision detection/tracking = 4/4 checks pass or correctly documented (including a known truck/car false positive) · agent tool-selection accuracy = 4/4 (100%, llama3.1 correctly calling the right tool every time despite being slow on CPU) · a latency benchmark that automatically flagged analyze_incident_video as a candidate for the async pattern already built in Phase 7 — independently validating that architecture decision.

Real finding worth knowing: found and fixed a genuine Qdrant data-corruption bug during this phase — meta.json had lost its reference to the aegis_evidence collection (likely fallout from an earlier interrupted process), even though the underlying vector data folder was intact. Fixed by re-running rag/ingest.py.

Pytest Custom eval scripts

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%209-OBSERVABILITY-6610f2?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Full observability stack: Prometheus (metrics.py, @track_metrics on all 8 tools) exposing /metrics on port 8001, scraped by Prometheus in Docker, visualized in a 3-panel Grafana dashboard (Tool Calls by Type, Tool Latency p95, Success vs Error Rate) — confirmed working end-to-end with real data (12 calls each across 3 tools). Added OpenTelemetry tracing (tracing.py, ConsoleSpanExporter) via @trace_tool on all 8 MCP server tools, plus a span around the agent's own reasoning step in agent.py.

Known, documented limitation: trace context is not propagated across the MCP process boundary between agent.py and the MCP server, so tool-side and agent-side spans are both real but not yet linked into one unified end-to-end trace — a genuine architectural gap, not a bug, and a clear candidate for future work.

Real findings worth knowing: hit and diagnosed two real infrastructure issues — (1) a stdout-contamination bug where metrics.py's startup print corrupted the MCP JSON-RPC protocol stream, fixed by redirecting to stderr; (2) severe RAM exhaustion (down to ~250MB free on a 7.8GB machine) from accumulated Docker containers plus WSL2 overhead, which also caused Postgres/Redis to get killed uncleanly by a wsl --shutdown — fixed by restarting the affected containers and diagnosing with real memory/process inspection rather than guessing.

Prometheus Grafana OpenTelemetry

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2010-DEPLOYMENT%20%2B%20CI%2FCD-0dcaf0?style=for-the-badge" />   <img src="https://img.shields.io/badge/✔%20DONE-39FF14?style=flat-square" />

Deployed a deliberately scoped-down FastAPI service (api.py) live on Render — exposes only the Postgres-backed incident endpoints, excluding the heavy ML tools (vision, audio, RAG reranking), since those need several GB of RAM to even load their models and would crash on a free hosting tier (Render free: 512MB RAM). The full multimodal agent still runs locally, where it has the RAM and GPU headroom it needs. The deployed service is backed by a real, managed Render Postgres database.

Built a GitHub Actions CI pipeline (.github/workflows/ci.yml) that runs the Phase 8 RAG and vision evaluations plus an API smoke test against a live Postgres service container, on every push.

AWS_ARCHITECTURE.md documents the complete production deployment design for the full multimodal system (ECS Fargate, RDS Multi-AZ, ElastiCache, S3, ECR, IAM least-privilege roles, VPC public/private split, estimated cost ~$160–260/month) — explicitly labeled as designed, not deployed, since provisioning it requires a payment method not available during this project's build. AWS and Oracle Cloud were both evaluated first and ruled out for the same reason (Oracle also carries real risk of unpredictable free-tier instance suspension, per community reports).

Real findings worth knowing: (1) a stale, never-committed Dockerfile caused the first deploy attempt to fail entirely; (2) repeated DATABASE_URL malformation from manual copy-paste editing in Render's UI, fixed properly by having db.py auto-normalize a plain postgresql:// URL into postgresql+psycopg2://, removing the need for any manual string editing; (3) the local machine could not reach Render's Postgres on port 5432 (likely ISP-blocked), so rather than fight that, api.py was changed to create and seed its own table on startup, removing the dependency on external reachability entirely; (4) requirements.txt included a Windows-only pywin32 dependency with no platform marker, which broke GitHub Actions' Linux CI runners until a sys_platform == 'win32' marker was added.

Render GitHub Actions Docker AWS (design doc)

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2011-FRONTEND%20%2F%20UX-d63384?style=for-the-badge" />   <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

Polished dashboard, incident review flow, evidence viewer, knowledge-graph view, and an AI investigation interface.

React Next.js TypeScript Tailwind

</td></tr> </table> <table> <tr><td width="100%">

<img src="https://img.shields.io/badge/PHASE%2012-FINAL%20INTEGRATION-212529?style=for-the-badge" />   <img src="https://img.shields.io/badge/○%20PLANNED-8b949e?style=flat-square" />

End-to-end testing, full documentation polish, architecture diagram, live demo, and resume/LinkedIn presentation of the finished system.

Docs Demo

</td></tr> </table> <p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> What's Working Right Now

A real conversation with the live agent, unedited:

You: What's the policy on forklifts near walkways?
[agent decided to call tool] search_evidence({'query': 'forklifts near walkways'})
[tool result] [policy-002] Forklifts and heavy vehicles must maintain a
minimum 3-meter clearance from pedestrian walkways. Spotters are required
when reversing near occupied zones.
Agent: Based on the search results, forklifts must maintain a minimum
3-meter clearance from pedestrian walkways, with spotters required when
reversing near occupied zones...

The search_evidence tool runs a full hybrid RAG pipeline underneath:

Stage	Technique	Role
Dense retrieval	all-MiniLM-L6-v2 embeddings + Qdrant	Understands meaning ("machinery" ≈ "forklift")
Sparse retrieval	BM25	Catches exact terms, IDs, and codes
Fusion	Reciprocal Rank Fusion	Combines both rankings
Reranking	cross-encoder/ms-marco-MiniLM-L-6-v2	Final, confident scoring

Measured outcome: 100% precision@3 on a 4-query evaluation set — every test query retrieved its correct source document in the top 3 results.

Live and deployed: the Postgres-backed incident API is running on Render. Try it:

bash
curl https://YOUR-RENDER-SERVICE-URL.onrender.com/incidents

(Replace with your actual Render service URL once deployed — see Setup below.)

<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Setup & Run
Full local agent (all 8 tools, 100% free via Ollama — no API key, no billing)
bash
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
cd rag
python ingest.py
cd ..

# 5. Start the Celery worker (separate terminal)
celery -A celery_app worker --loglevel=info --pool=solo

# 6. Run the agent (make sure Ollama is running in the background)
python agent.py

Try asking it:

Any incidents involving a forklift?
What's the policy on forklifts near walkways?
Tell me more about INC-1002
Analyze this incident video for me

Check retrieval quality, vision accuracy, tool-selection accuracy, and latency directly:

bash
python rag/evaluate.py
python eval/vision_eval.py
python eval/agent_eval.py
python eval/latency_eval.py

View metrics and traces:

Prometheus: http://localhost:9090
Grafana dashboard: http://localhost:3000
OpenTelemetry spans: printed to console (ConsoleSpanExporter)

Note: local models are smaller than hosted models, so tool-calling accuracy is noticeably rougher on tiny models — expected, and it still teaches the same agent loop. For more reliable behavior, add API credit and switch ChatOllama(...) to ChatAnthropic(...) in agent.py.

Deployed API (lightweight, incident endpoints only)

The live Render deployment only exposes the Postgres-backed incident endpoints (no vision/audio/RAG — those need more RAM than a free tier provides). It seeds and manages its own database on startup, so no external Postgres reachability is required to deploy it yourself:

bash
# Locally
uvicorn api:app --reload

# Deployed
curl https://YOUR-RENDER-SERVICE-URL.onrender.com/incidents
<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/iY8CRBdQXODJSCERIr/giphy.gif" width="28"> Project Structure
aegis-ai/
├── agent.py                    # LangGraph agent + async MCP client: state, nodes, routing
├── api.py                      # Scoped-down FastAPI service (deployed on Render)
├── db.py                       # SQLAlchemy models, DATABASE_URL normalization
├── celery_app.py                # Celery app config (Redis broker/backend)
├── metrics.py                   # Prometheus @track_metrics decorator
├── tracing.py                   # OpenTelemetry @trace_tool decorator
├── requirements.txt
├── docker-compose.yml            # Postgres, Redis, Neo4j, Prometheus, Grafana
├── Dockerfile
├── AWS_ARCHITECTURE.md           # Full production AWS design (documented, not deployed)
├── .github/
│   └── workflows/
│       └── ci.yml                # RAG/vision eval + API smoke test on every push
├── mcp_server/
│   └── incident_server.py        # FastMCP server exposing all 8 tools over MCP
├── rag/
│   ├── documents.py               # Evidence corpus (policies + incident reports)
│   ├── ingest.py                   # Chunk → embed → upsert into Qdrant
│   ├── retrieve.py                  # Dense, BM25, hybrid, and reranked search
│   └── evaluate.py                  # Precision@k retrieval evaluation
├── knowledge_graph/
│   └── graph_agent.py             # Neo4j-backed KnowledgeAgent, safe parameterized queries
├── vision/
│   ├── detector.py                 # YOLOv8 object detection + allow-list/confidence filter
│   ├── tracker.py                   # ByteTrack multi-object tracking
│   └── scene_reasoner.py             # VLM (moondream) scene description
├── audio/
│   ├── transcriber.py               # Whisper speech-to-text
│   └── speaker.py                     # pyttsx3 text-to-speech
├── eval/
│   ├── agent_eval.py                # Tool-selection accuracy
│   ├── vision_eval.py                # Detection/tracking accuracy vs ground truth
│   └── latency_eval.py                # Per-tool timing benchmark
├── monitoring/
│   ├── prometheus.yml                # Scrape config
│   └── grafana/                       # Dashboard provisioning
└── README.md

(frontend/ gets fully built out in Phase 11 — see the Phase table above.)

<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/LnQjpWaON8nhr21vNW/giphy.gif" width="28"> Resume Positioning

Target project description for the finished system:

Built a multimodal AI investigation platform that analyzes video, documents, images, audio, and structured data; uses agentic orchestration, hybrid RAG, and knowledge-graph retrieval to connect evidence; and generates actionable investigation reports with evaluation, observability, and cloud deployment.

What's provable today (safe to claim now, with evidence — 10 of 12 phases complete):

Designed and implemented a hybrid RAG pipeline (dense + BM25 + Reciprocal Rank Fusion + cross-encoder reranking) achieving 100% precision@3 on a retrieval evaluation set
Built a LangGraph-based agentic system with dynamic tool routing across 8 specialized tools, measured at 100% tool-selection accuracy in a scripted evaluation
Designed a knowledge graph agent that deliberately restricts the LLM to safe, parameterized queries instead of free-form Cypher generation — an injection-safety design decision
Built a computer vision pipeline (YOLOv8 + ByteTrack + VLM) and found/documented a real VLM hallucination case that shaped the system's trust model
Built a voice pipeline (Whisper + TTS) for spoken incident reports
Exposed the full tool ecosystem behind a standard MCP server and rewired the agent as an MCP client, decoupling tool access from direct Python imports
Migrated from an in-memory mock database to PostgreSQL and added Celery/Redis background job processing for non-blocking heavy vision workloads
Built and shipped a real evaluation suite covering retrieval, vision, agent tool-selection, and latency — and used the latency results to independently validate an async architecture decision
Instrumented the full tool layer with Prometheus metrics and a 3-panel Grafana dashboard, plus OpenTelemetry tracing, and correctly diagnosed real production-style incidents along the way (stdout/protocol contamination, RAM exhaustion, data-store corruption)
Deployed a live FastAPI service to Render with a managed Postgres database, and built a GitHub Actions CI pipeline that runs real evaluations and a smoke test against a live database service container on every push
Designed a complete production AWS architecture (ECS Fargate, RDS Multi-AZ, ElastiCache, S3, IAM least-privilege) with cost estimates, evaluated against Oracle Cloud, and documented the tradeoffs — clearly labeled as a design artifact rather than a live deployment
Ran the full stack locally via Ollama with zero cloud dependency, then designed for a hosted-LLM upgrade path

Discipline maintained throughout: every "done" claim above corresponds to a component that actually runs and a metric that was actually measured. The Phase Dashboard is the single source of truth for what's real versus what's planned — the AWS design doc is explicitly not counted as a deployment, and the Render deployment is explicitly scoped to what it actually runs.

<p align="center"> <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="450"> </p>
<img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width="28"> Learning Principle

Built one phase at a time. Every phase leaves two things behind: a working component in the repository, and the ability to explain the technology and design decisions — including the bugs hit and how they were diagnosed — in an interview.

<p align="center"> Built by <a href="https://github.com/rudellll123">Rahul Jha</a> · <a href="https://www.linkedin.com/in/rahuljha174/">LinkedIn</a> · <a href="mailto:rahuljha1807@gmail.com">Email</a> </p>
