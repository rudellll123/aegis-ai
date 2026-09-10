<h1 align="center">🛡️ AegisAI</h1>

<h3 align="center">
Multimodal AI Investigation & Incident Intelligence Platform
</h3>

<p align="center">
  <strong>Agentic AI • Hybrid RAG • Knowledge Graph • Computer Vision • Audio Intelligence • MCP</strong>
</p>

<p align="center">
  <a href="https://github.com/rudellll123/aegis-ai">
    <img src="https://img.shields.io/badge/GitHub-AegisAI-181717?style=for-the-badge&logo=github&logoColor=white">
  </a>
  <img src="https://img.shields.io/badge/Python-3.x-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/LangGraph-Agentic_AI-8957E5?style=for-the-badge">
  <img src="https://img.shields.io/badge/RAG-Hybrid-FF6F00?style=for-the-badge">
  <img src="https://img.shields.io/badge/Neo4j-Knowledge_Graph-4581C3?style=for-the-badge&logo=neo4j&logoColor=white">
  <img src="https://img.shields.io/badge/MCP-Tool_Protocol-black?style=for-the-badge">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active_Development-39FF14?style=for-the-badge">
  <img src="https://img.shields.io/badge/Phases-0--6_Complete-238636?style=for-the-badge">
  <img src="https://img.shields.io/badge/LLM-Local_First-8957E5?style=for-the-badge">
  <img src="https://img.shields.io/badge/Human_In_The_Loop-Yes-1f6feb?style=for-the-badge">
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/rahuljha174/">LinkedIn</a>
  •
  <a href="mailto:rahuljha1807@gmail.com">Email</a>
  •
  <a href="https://github.com/rudellll123">GitHub</a>
</p>

---

## 🧠 What is AegisAI?

**AegisAI** is a multimodal, agentic AI platform designed to assist with incident investigation by combining:

* 🤖 Agentic AI orchestration
* 📚 Hybrid Retrieval-Augmented Generation
* 🕸️ Knowledge graphs
* 👁️ Computer vision
* 🎙️ Speech-to-text and text-to-speech
* 🔌 Model Context Protocol (MCP)
* 🧪 AI evaluation
* 🔐 Human-in-the-loop decision making

Instead of treating an incident as a single text document, AegisAI treats an investigation as a **connected evidence problem**.

Evidence can come from:

```text
PDF / Documents
      │
      ├──► Hybrid RAG
      │
Images / Video
      │
      ├──► Computer Vision
      │
Audio
      │
      ├──► Speech Intelligence
      │
Structured Incident Data
      │
      ├──► Knowledge Graph
      │
      ▼
┌─────────────────────────────┐
│      Supervisor Agent       │
│       LangGraph + LLM       │
└──────────────┬──────────────┘
               │
               ▼
        Investigation
               │
               ▼
        Evidence-backed
        response / report
               │
               ▼
       👤 Human Approval
```

> **Important:** AegisAI is designed as an **AI-assisted investigation system**. It does not replace human judgment for high-impact decisions.

---

# 🚀 Why AegisAI?

Traditional incident-analysis systems often solve only one part of the problem.

| Traditional Approach       | AegisAI                            |
| -------------------------- | ---------------------------------- |
| Keyword search             | Semantic + lexical retrieval       |
| Vector-only RAG            | Hybrid RAG + reranking             |
| Object detection           | Object detection + scene reasoning |
| Text-only investigation    | Multimodal investigation           |
| Flat records               | Connected knowledge graph          |
| Single LLM call            | Stateful agent workflow            |
| Hardcoded tools            | MCP-based tool ecosystem           |
| Manual evidence discovery  | Agent-driven retrieval             |
| No retrieval measurement   | Evaluation framework               |
| Black-box answers          | Evidence-oriented responses        |
| Single modality            | Text + image + video + audio       |
| Demo-oriented architecture | Designed for production evolution  |

---

# 🏗️ System Architecture

```text
                              ┌─────────────────────┐
                              │       User          │
                              │ Dashboard / API     │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │       FastAPI       │
                              │   API / Services    │
                              └──────────┬──────────┘
                                         │
                                         ▼
                         ┌─────────────────────────────┐
                         │     Supervisor Agent        │
                         │       LangGraph + LLM       │
                         └──────────────┬──────────────┘
                                        │
              ┌─────────────────────────┼─────────────────────────┐
              │                         │                         │
              ▼                         ▼                         ▼
      ┌───────────────┐        ┌────────────────┐       ┌─────────────────┐
      │   RAG Agent   │        │  Vision Agent  │       │ Knowledge Agent │
      │               │        │                │       │                 │
      │ Qdrant        │        │ YOLO            │       │ Neo4j           │
      │ BM25          │        │ ByteTrack       │       │ Cypher          │
      │ RRF           │        │ OpenCV          │       │ Entity Graph    │
      │ Reranker      │        │ VLM             │       │ Validation      │
      └───────┬───────┘        └────────┬───────┘       └────────┬────────┘
              │                         │                        │
              └─────────────────────────┼────────────────────────┘
                                        │
                         ┌──────────────▼──────────────┐
                         │       Audio Intelligence    │
                         │                              │
                         │ Whisper STT + TTS            │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
                              ┌─────────────────────┐
                              │    MCP Tool Layer   │
                              │                     │
                              │ Tool discovery      │
                              │ Tool execution      │
                              │ Standardized tools  │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │ Evidence Synthesis  │
                              │ & Investigation     │
                              └──────────┬──────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │   Human Review      │
                              │     & Approval      │
                              └─────────────────────┘
```

---

# 🧩 Core Intelligence Pipeline

```text
User Question
     │
     ▼
Intent / Agent Routing
     │
     ├──────────────► RAG
     │                 │
     │                 ├─ Dense Retrieval
     │                 ├─ BM25
     │                 ├─ RRF
     │                 └─ Cross Encoder
     │
     ├──────────────► Knowledge Graph
     │                 │
     │                 ├─ Entity Extraction
     │                 ├─ Relationship Traversal
     │                 └─ Safe Graph Queries
     │
     ├──────────────► Vision
     │                 │
     │                 ├─ YOLO
     │                 ├─ Tracking
     │                 └─ VLM Scene Reasoning
     │
     ├──────────────► Audio
     │                 │
     │                 ├─ Whisper
     │                 └─ TTS
     │
     └──────────────► MCP
                       │
                       └─ Dynamic Tool Discovery

                         │
                         ▼

                 Evidence-backed Answer
```

---

# ⭐ Key Features

## 🤖 1. Agentic AI

AegisAI uses an agentic workflow rather than a single prompt → response pipeline.

The agent can:

* Understand a user request
* Decide which capability is required
* Call a specialized tool
* Receive structured results
* Continue reasoning
* Produce a final response

Conceptually:

```text
Agent
  ↓
Choose Tool
  ↓
Execute Tool
  ↓
Observe Result
  ↓
Reason
  ↓
Choose Next Tool
  ↓
Final Response
```

---

# 📚 2. Hybrid RAG

AegisAI combines multiple retrieval strategies instead of relying on vector similarity alone.

### Dense Retrieval

Uses semantic embeddings to understand meaning.

```text
"machinery near pedestrians"
          ↓
Semantic similarity
          ↓
"forklift near walkway"
```

### Sparse Retrieval

BM25 provides strong lexical matching for:

* IDs
* codes
* names
* exact terminology
* policy references

### Reciprocal Rank Fusion

Dense and sparse rankings are combined.

```text
Dense Results
     +
BM25 Results
     ↓
Reciprocal Rank Fusion
     ↓
Candidate Documents
     ↓
Cross Encoder Reranking
     ↓
Final Evidence
```

### Current Evaluation

The Phase 2 retrieval evaluation achieved:

**4 / 4 queries with the correct source document in the top 3**

→ **100% Precision@3 on the current evaluation set**

This is explicitly a project evaluation result, not a claim of general RAG accuracy.

---

# 🕸️ 3. Knowledge Graph Intelligence

AegisAI uses Neo4j to represent relationships between:

```text
Person
   │
   ├── involved in ──► Incident
   │                       │
   │                       ├── occurred at ──► Location
   │                       │
   │                       ├── involves ──► Equipment
   │                       │
   │                       └── has ──► Severity
   │
   └── associated with ──► Organization
```

The graph layer includes:

* Entity extraction
* Graph ingestion
* Schema definitions
* Relationship creation
* Safe graph services
* Graph validation
* Graph evaluation
* Knowledge-agent tooling
* Relationship-aware retrieval

The knowledge agent deliberately exposes **allow-listed operations** rather than allowing an LLM to freely generate arbitrary Cypher.

Example:

```text
Question:
"Who was involved in high-severity incidents at Construction Site A?"

        ↓

Knowledge Agent

        ↓

Person → Incident → Location

        ↓

Filtered Graph Result

        ↓

Evidence-backed Answer
```

---

# 👁️ 4. Computer Vision

AegisAI extends investigation beyond text.

### Object Detection

YOLO-based detection provides:

* Object labels
* Confidence scores
* Bounding boxes
* Frame timestamps
* Configurable filtering

### Video Processing

The vision pipeline supports processing video frames and extracting detections.

### Tracking

ByteTrack-based tracking is integrated into the vision architecture for maintaining object identity across frames.

### Scene Reasoning

A local vision-language model can complement object detection with contextual scene descriptions.

Instead of:

```text
Person
Forklift
Helmet
```

the system can reason about the overall scene:

```text
What is happening?
Which objects are present?
What may be safety-relevant?
What contextual information should an investigator review?
```

The system is explicitly designed to avoid speculative scene descriptions.

---

# 🎙️ 5. Audio Intelligence

AegisAI includes an audio layer using Whisper-based transcription.

The transcription pipeline can return:

```json
{
  "text": "...",
  "language": "...",
  "segments": [
    {
      "start": 0.0,
      "end": 2.4,
      "text": "..."
    }
  ]
}
```

This provides:

* Speech-to-text
* Language detection
* Timestamped segments
* Transcript generation
* TTS / speech output capability

Audio can eventually become another evidence source inside the investigation graph.

---

# 🔌 6. MCP Tool Ecosystem

AegisAI has progressed from direct Python tool integration toward an MCP-based architecture.

The agent can operate as an MCP client and dynamically discover available tools rather than depending entirely on hardcoded imports.

Conceptually:

```text
Supervisor Agent
       │
       ▼
   MCP Client
       │
       ├── MCP Handshake
       │
       ├── list_tools()
       │
       ▼
┌─────────────────────────────┐
│       Tool Server           │
├─────────────────────────────┤
│ RAG tools                   │
│ Knowledge Graph tools       │
│ Investigation tools        │
│ Vision tools                │
│ Evidence tools              │
│ Report tools                │
└─────────────────────────────┘
```

This gives AegisAI a cleaner path toward a modular tool ecosystem.

---

# 🧪 7. Evaluation

AegisAI treats evaluation as part of the engineering process.

Current evaluation areas include:

### Retrieval Evaluation

```text
Precision@K
```

### Knowledge Graph Evaluation

The repository includes graph evaluation cases covering:

* Location-based incident retrieval
* High-severity people retrieval
* Expected entity sets
* Pass/fail accuracy reporting

### Planned Evaluation Expansion

```text
RAG
 ├── Precision@K
 ├── Recall@K
 ├── MRR
 └── Groundedness

Agent
 ├── Tool-selection accuracy
 ├── Task success rate
 ├── Failure rate
 └── Number of unnecessary tool calls

Vision
 ├── Detection precision
 ├── Detection recall
 ├── Tracking metrics
 └── Scene reasoning evaluation

System
 ├── Latency
 ├── Throughput
 └── Reliability
```

---

# 🛡️ Human-in-the-Loop Design

AegisAI is designed around an important principle:

> **AI assists the investigation; humans remain responsible for consequential decisions.**

Future investigation flow:

```text
Evidence
   ↓
AI Analysis
   ↓
Agent Reasoning
   ↓
Evidence-backed Report
   ↓
Human Review
   ↓
Approve / Reject / Modify
   ↓
Action
```

This makes the architecture more appropriate for real-world investigation workflows than a fully autonomous decision-making system.

---

# 📊 Development Progress

## Legend

* ✅ Complete
* 🟡 Partial
* 🔵 In Progress
* ⬜ Planned

| Phase | Component                  | Status |
| ----: | -------------------------- | :----: |
|     0 | Architecture & Setup       |    ✅   |
|     1 | Agentic AI Foundation      |    ✅   |
|     2 | Advanced Hybrid RAG        |    ✅   |
|     3 | Knowledge Graph            |    ✅   |
|     4 | Computer Vision            |    ✅   |
|     5 | Voice / Audio Intelligence |    ✅   |
|     6 | MCP Tool Ecosystem         |    ✅   |
|     7 | Production Backend         |    ⬜   |
|     8 | Full Evaluation Framework  |   🟡   |
|     9 | Observability              |    ⬜   |
|    10 | AWS + CI/CD                |    ⬜   |
|    11 | Frontend / UX              |    ⬜   |
|    12 | Final Integration          |    ⬜   |

---

# 🗺️ Roadmap

## Phase 7 — Production Backend

### Goal

Move from local research architecture to a production-style backend.

### Planned

* FastAPI service layer
* PostgreSQL
* SQLAlchemy
* Alembic migrations
* Redis
* Celery workers
* Background jobs
* Job status tracking
* Authentication
* Authorization
* Persistent investigation history
* Evidence metadata
* Object storage abstraction
* API versioning
* Rate limiting

---

## Phase 8 — Evaluation Platform

Build a reusable AI evaluation framework.

```text
Golden Dataset
      ↓
Evaluation Runner
      ↓
Agent Execution
      ↓
Metrics
      ↓
Regression Report
```

Planned metrics:

* Retrieval Precision@K
* Recall@K
* MRR
* Faithfulness
* Groundedness
* Tool selection accuracy
* Agent success rate
* Hallucination rate
* Latency
* Cost per investigation

---

## Phase 9 — Observability

Add complete system visibility.

### OpenTelemetry

Distributed traces across:

```text
API
 ↓
Agent
 ↓
Tool
 ↓
Database
 ↓
LLM
```

### Prometheus

Track:

* Request latency
* Tool latency
* Agent execution time
* Retrieval latency
* Error rates
* Queue depth
* Throughput

### Grafana

Build dashboards for:

```text
System Health
AI Performance
RAG Performance
Agent Performance
Infrastructure
```

---

# ☁️ Phase 10 — Cloud & CI/CD

Production deployment target:

```text
GitHub
   ↓
GitHub Actions
   ↓
Docker Build
   ↓
Container Registry
   ↓
AWS
 ┌─────────────────────┐
 │ ECS / Compute       │
 │ RDS / PostgreSQL    │
 │ S3 / Evidence       │
 │ IAM / Security      │
 └─────────────────────┘
```

Planned:

* Docker production images
* GitHub Actions
* AWS ECR
* AWS ECS
* AWS S3
* AWS RDS
* IAM
* Secrets management
* Health checks
* Deployment rollback

---

# 🖥️ Phase 11 — Investigation Dashboard

Planned frontend:

```text
React
Next.js
TypeScript
Tailwind CSS
```

Dashboard components:

### Investigation Workspace

```text
┌──────────────────────────────────────────┐
│ Investigation #INC-1024                  │
├───────────────────┬──────────────────────┤
│ Evidence          │ AI Investigation     │
│                   │                      │
│ 📄 Documents      │ Agent reasoning      │
│ 🖼 Images          │ Evidence references │
│ 🎥 Video           │ Findings             │
│ 🎙 Audio           │ Recommendations      │
└───────────────────┴──────────────────────┘
```

### Knowledge Graph Viewer

Interactive:

```text
Person
  │
  ▼
Incident
  │
  ├── Location
  ├── Equipment
  ├── Evidence
  └── Policy
```

### Evidence Viewer

Support:

* Images
* Video frames
* Audio transcripts
* Documents
* Retrieved passages
* Graph relationships

---

# 🧬 Phase 12 — Final Integration

Final system target:

```text
                 ┌───────────────┐
                 │    User       │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │   FastAPI     │
                 └───────┬───────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Supervisor AI │
                 └───────┬───────┘
                         │
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
     RAG              Vision             Graph
       │                 │                 │
       └─────────────────┼─────────────────┘
                         │
                         ▼
                       Audio
                         │
                         ▼
                       MCP
                         │
                         ▼
                 Evidence Synthesis
                         │
                         ▼
                  Investigation Report
                         │
                         ▼
                   Human Approval
```

---

# 🧰 Technology Stack

## AI / Agentic Systems

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| Python       | Core development                |
| LangGraph    | Stateful agent orchestration    |
| LangChain    | LLM/tool integration            |
| Ollama       | Local LLM execution             |
| MCP          | Standardized tool communication |
| Hugging Face | Embeddings / ML models          |

## Retrieval

| Technology             | Purpose          |
| ---------------------- | ---------------- |
| Qdrant                 | Vector retrieval |
| Sentence Transformers  | Embeddings       |
| BM25                   | Sparse retrieval |
| Reciprocal Rank Fusion | Hybrid ranking   |
| Cross Encoder          | Reranking        |

## Knowledge Graph

| Technology        | Purpose            |
| ----------------- | ------------------ |
| Neo4j             | Graph database     |
| Cypher            | Graph queries      |
| Custom validation | Graph quality      |
| Entity extraction | Graph construction |

## Computer Vision

| Technology | Purpose                |
| ---------- | ---------------------- |
| YOLO       | Object detection       |
| ByteTrack  | Object tracking        |
| OpenCV     | Image/video processing |
| VLM        | Scene understanding    |

## Audio

| Technology | Purpose            |
| ---------- | ------------------ |
| Whisper    | Speech recognition |
| TTS        | Speech synthesis   |
| FFmpeg     | Audio processing   |

## Backend / Infrastructure

| Technology     | Current / Planned            |
| -------------- | ---------------------------- |
| FastAPI        | API layer                    |
| Docker         | Containerization             |
| Neo4j Docker   | Current graph infrastructure |
| PostgreSQL     | Planned                      |
| Redis          | Planned                      |
| Celery         | Planned                      |
| AWS            | Planned                      |
| GitHub Actions | Planned                      |

## Observability

| Technology                | Status                 |
| ------------------------- | ---------------------- |
| Custom evaluation scripts | 🟢 Current             |
| Pytest                    | 🟢 Current / expanding |
| OpenTelemetry             | Planned                |
| Prometheus                | Planned                |
| Grafana                   | Planned                |

---

# 📁 Repository Structure

```text
aegis-ai/
│
├── agents/
│   └── graph/
│       └── graph_agent.py
│
├── audio/
│   ├── transcriber.py
│   └── speaker.py
│
├── knowledge_graph/
│   ├── detector.py
│   ├── extractor.py
│   ├── ingestion.py
│   ├── knowledge_graph_api.py
│   ├── schema.py
│   ├── service.py
│   ├── validation.py
│   └── evaluate_graph.py
│
├── rag/
│   ├── documents.py
│   ├── ingest.py
│   ├── retrieve.py
│   └── evaluate.py
│
├── vision/
│   ├── detector.py
│   ├── detect_image.py
│   ├── detect_video.py
│   ├── tracker.py
│   ├── scene_reasoner.py
│   ├── schema.py
│   └── service.py
│
├── agent.py
├── tools.py
├── setup_agent.py
├── setup_kg.py
├── requirements.txt
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

# 🔬 Example Investigation

### User

```text
What incidents occurred at Construction Site A,
and who was involved in the high-severity incidents?
```

### AegisAI

```text
1. Understand the request
          ↓
2. Identify location
          ↓
3. Select knowledge-graph capability
          ↓
4. Query incident relationships
          ↓
5. Identify high-severity incidents
          ↓
6. Traverse Person → Incident → Location
          ↓
7. Return structured evidence
          ↓
8. Generate human-readable response
```

The graph evaluation suite includes location-based incident and high-severity-person test cases.

---

# 🔎 Example RAG Investigation

### Question

```text
What is the policy regarding forklifts near pedestrian walkways?
```

### Pipeline

```text
Question
   ↓
Dense Retrieval
   +
BM25
   ↓
Reciprocal Rank Fusion
   ↓
Cross Encoder
   ↓
Relevant Policy
   ↓
Agent Tool Result
   ↓
Grounded Response
```

Example:

```text
Agent
  ↓
search_evidence(...)
  ↓
policy document
  ↓
LLM synthesis
  ↓
Evidence-backed response
```

---

# 👁️ Example Vision Investigation

```text
Video / Image
      ↓
Frame Extraction
      ↓
YOLO Detection
      ↓
Object Filtering
      ↓
Tracking
      ↓
Scene Reasoning
      ↓
Investigation Evidence
```

Potential evidence:

```text
Person detected
Vehicle detected
Equipment detected
Timestamp recorded
Bounding box recorded
Scene context generated
```

---

# 🎙️ Example Audio Investigation

```text
Audio
  ↓
Whisper
  ↓
Language Detection
  ↓
Timestamped Segments
  ↓
Transcript
  ↓
Evidence Store
  ↓
Agent Retrieval
```

This allows spoken incident reports to become searchable investigation evidence.

---

# 🧪 Engineering Principles

AegisAI follows several design principles.

### 1. Evidence before generation

The system should retrieve evidence before making claims whenever the task requires external knowledge.

### 2. Tools before hallucination

If the agent has a tool capable of answering the question, the architecture should prefer the tool over unsupported generation.

### 3. Structured interfaces

Agents communicate with tools through defined interfaces rather than uncontrolled database access.

### 4. Evaluation is part of development

A component is not considered mature simply because it works once.

### 5. Human approval for consequential actions

AI output should support human decision-making rather than silently replacing it.

### 6. Local-first development

Where practical, components are designed to run locally before introducing cloud dependencies.

---

# 🔐 Security Considerations

Planned production hardening includes:

* Environment-based secrets
* No credentials committed to Git
* Input validation
* Parameterized database queries
* Allow-listed graph operations
* Authentication
* Authorization
* Rate limiting
* Audit logging
* Secure file handling
* Prompt-injection defenses
* Evidence provenance
* Model/provider isolation
* Container security
* Dependency scanning

> **Security note:** development credentials should never be reused in production.

---

# ⚡ Quick Start

## 1. Clone

```bash
git clone https://github.com/rudellll123/aegis-ai.git
cd aegis-ai
```

## 2. Create virtual environment

### Windows PowerShell

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

## 3. Install dependencies

```bash
pip install -r requirements.txt
```

## 4. Start Neo4j

```bash
docker compose up -d
```

Then open:

```text
http://localhost:7474
```

## 5. Configure environment

Create a `.env` file:

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your_secure_password
```

Additional model configuration should also be supplied through environment variables rather than hardcoded paths or credentials.

---

# 🤖 Local LLM

AegisAI is designed around local-first experimentation.

Example:

```bash
ollama pull llama3.1
```

Vision reasoning can use a local vision-language model such as:

```bash
ollama pull moondream
```

The architecture can later support hosted providers through a provider abstraction.

---

# 📈 Current Project Status

```text
AegisAI
│
├── Agentic AI             ████████████████████ 100%
├── Hybrid RAG             ████████████████████ 100%
├── Knowledge Graph        ████████████████████ 100%
├── Computer Vision        ████████████████████ 100%
├── Audio                  ████████████████████ 100%
├── MCP                    ████████████████████ 100%
│
├── Evaluation             ██████████░░░░░░░░░░ ~50%
├── Production Backend     ░░░░░░░░░░░░░░░░░░░░ Planned
├── Observability          ░░░░░░░░░░░░░░░░░░░░ Planned
├── Cloud / CI/CD          ░░░░░░░░░░░░░░░░░░░░ Planned
├── Frontend               ░░░░░░░░░░░░░░░░░░░░ Planned
└── Final Integration      ░░░░░░░░░░░░░░░░░░░░ Planned
```

---

# 🎯 What Makes This Project Interview-Worthy?

AegisAI is intentionally designed to demonstrate more than model API usage.

It demonstrates understanding of:

```text
LLMs
 ↓
Tool Calling
 ↓
Agent State
 ↓
Agent Routing
 ↓
RAG
 ↓
Hybrid Retrieval
 ↓
Reranking
 ↓
Knowledge Graphs
 ↓
Computer Vision
 ↓
Audio AI
 ↓
MCP
 ↓
Evaluation
 ↓
Backend Engineering
 ↓
Distributed Systems
 ↓
Observability
 ↓
Cloud Deployment
```

The objective is not simply to say:

> "I built an AI chatbot."

The objective is to demonstrate:

> **"I designed a multimodal AI investigation architecture where an agent can select specialized tools, retrieve evidence from multiple data systems, reason over relationships, and produce evidence-backed outputs."**

---

# 📚 Learning-by-Building Philosophy

Every phase is intended to leave behind two things:

```text
1. A working engineering component
2. The ability to explain why it exists
```

For every major component, AegisAI focuses on:

```text
What problem does it solve?
        ↓
Why this technology?
        ↓
What alternatives exist?
        ↓
How does it work internally?
        ↓
How do we evaluate it?
        ↓
What happens when it fails?
        ↓
How would we scale it?
```

---

# 🏆 Project Highlights

### Agentic Architecture

LangGraph-based stateful agent workflows with specialized tool execution.

### Hybrid RAG

Dense + BM25 + Reciprocal Rank Fusion + cross-encoder reranking.

### Knowledge Graph

Neo4j-powered relationship-aware incident investigation.

### Multimodal Intelligence

Text + documents + images + video + audio.

### Computer Vision

YOLO-based detection, tracking and VLM-based scene reasoning.

### Audio Intelligence

Whisper-based speech transcription with timestamped segments.

### MCP

Standardized tool discovery and execution architecture.

### Evaluation

Measured retrieval and graph evaluation rather than relying solely on qualitative demos.

### Local-First AI

Designed to run locally using Ollama and local models during development.

---

# 🧭 Future Vision

The long-term goal is to evolve AegisAI into a complete investigation intelligence platform:

```text
                 ┌────────────────────────┐
                 │      AegisAI Core      │
                 └───────────┬────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   Evidence Layer       Intelligence Layer   Agent Layer
        │                    │                    │
 Documents              RAG                  LangGraph
 Images                 Knowledge Graph      MCP
 Video                  Vision               Tool Router
 Audio                  Audio                Planning
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                             ▼
                     Investigation
                             │
                             ▼
                    Evidence Synthesis
                             │
                             ▼
                       Human Review
```

---

# 👨‍💻 Author

<h3 align="center">Rahul Jha</h3>

<p align="center">
  AI / Backend / Agentic Systems Developer
</p>

<p align="center">
  <a href="https://github.com/rudellll123">GitHub</a>
  •
  <a href="https://www.linkedin.com/in/rahuljha174/">LinkedIn</a>
  •
  <a href="mailto:rahuljha1807@gmail.com">Email</a>
</p>

---

<p align="center">
  <strong>🛡️ AegisAI — Investigate. Connect. Understand.</strong>
</p>

<p align="center">
  Built one phase at a time. Measured every step.
</p>

