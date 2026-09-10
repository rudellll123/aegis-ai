                                                         # 🛡️ AegisAI

### Multimodal AI Investigation & Incident Intelligence Platform

<p align="center">

<img src="https://readme-typing-svg.demolab.com/?font=Fira%20Code&size=20&duration=3000&pause=1000&center=true&vCenter=true&width=800&lines=Multimodal+AI+%7C+Agentic+AI+%7C+RAG+%7C+Knowledge+Graph;Agent+%E2%86%92+Tools+%E2%86%92+Evidence+%E2%86%92+Reasoning;Incident+Intelligence+with+AI+Agents;Built+with+Python+%7C+FastAPI+%7C+Neo4j+%7C+Qdrant+%7C+YOLO+%7C+Whisper" alt="Typing SVG" />

</p>

<p align="center">

<img src="https://img.shields.io/badge/Project-AegisAI-0A0A0A?style=for-the-badge&logo=shield&logoColor=white" />
<img src="https://img.shields.io/badge/AI-Agentic_AI-blue?style=for-the-badge" />
<img src="https://img.shields.io/badge/RAG-Implemented-success?style=for-the-badge" />
<img src="https://img.shields.io/badge/Knowledge_Graph-Implemented-purple?style=for-the-badge" />
<img src="https://img.shields.io/badge/Computer_Vision-Implemented-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/Audio_AI-Implemented-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/MCP-Implemented-yellow?style=for-the-badge" />

</p>

<p align="center">

<a href="https://github.com/rudellll123/aegis-ai">
<img src="https://img.shields.io/github/stars/rudellll123/aegis-ai?style=flat-square" />
</a>

<a href="https://github.com/rudellll123/aegis-ai">
<img src="https://img.shields.io/github/forks/rudellll123/aegis-ai?style=flat-square" />
</a>

<a href="https://github.com/rudellll123/aegis-ai">
<img src="https://img.shields.io/github/last-commit/rudellll123/aegis-ai?style=flat-square" />
</a>

<img src="https://img.shields.io/badge/Python-3.x-3776AB?style=flat-square&logo=python&logoColor=white" />
<img src="https://img.shields.io/badge/FastAPI-API-009688?style=flat-square&logo=fastapi&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" />

</p>

---

## 🧠 What is AegisAI?

**AegisAI** is a multimodal AI investigation and incident-intelligence platform designed to combine information from different data sources and transform it into structured, searchable, and explainable intelligence.

Instead of treating every input independently, AegisAI connects:

* 📄 Documents
* 🖼️ Images
* 🎥 Video
* 🎙️ Audio
* 🕸️ Knowledge Graph data
* 📚 Retrieved knowledge
* 🤖 AI agents
* 🔌 External tools

The system uses an **agentic architecture** where AI agents can select and execute specialized tools instead of relying only on a single LLM response.

### Core idea

```text
                 ┌─────────────────────┐
                 │       User          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │   Agent Supervisor  │
                 │    / Orchestrator   │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   📚 RAG Agent       🕸️ Graph Agent      👁️ Vision Agent
        │                   │                   │
        ▼                   ▼                   ▼
     Qdrant              Neo4j             YOLO/VLM
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                    🎙️ Audio Agent
                            │
                            ▼
                   📝 Evidence / Result
```

---

# ⭐ Why AegisAI?

Traditional AI applications often look like:

```text
User → LLM → Answer
```

AegisAI is designed around:

```text
User
  ↓
Agent
  ↓
Reasoning
  ↓
Tool Selection
  ↓
Evidence Retrieval
  ↓
Structured Knowledge
  ↓
Multimodal Analysis
  ↓
Validated Result
```

This makes the system more suitable for applications where **evidence, relationships, retrieval, and tool execution** matter.

---

# 🚀 Key Capabilities

| Capability              | Status                    |
| ----------------------- | ------------------------- |
| 🤖 Agentic AI           | ✅ Implemented             |
| 📚 Advanced RAG         | ✅ Implemented             |
| 🕸️ Knowledge Graph     | ✅ Implemented             |
| 👁️ Computer Vision     | ✅ Implemented             |
| 🎙️ Audio Transcription | ✅ Implemented             |
| 🔌 MCP Tool Integration | ✅ Implemented             |
| 🌐 FastAPI Backend      | 🟡 Integrated / Expanding |
| 🧪 Evaluation Framework | 🟡 Implemented in modules |
| 🐳 Docker               | ✅ Neo4j containerized     |
| 🗄️ PostgreSQL          | 🔜 Planned                |
| ⚡ Redis / Celery        | 🔜 Planned                |
| 📊 Observability        | 🔜 Planned                |
| ☁️ AWS Deployment       | 🔜 Planned                |
| 🖥️ Frontend            | 🔜 Planned                |

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │        USER          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      FastAPI         │
                         │    API Layer         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │       Agent Orchestrator      │
                    │        / LangGraph            │
                    └──────────────┬────────────────┘
                                   │
             ┌─────────────────────┼─────────────────────┐
             │                     │                     │
             ▼                     ▼                     ▼
      ┌─────────────┐      ┌──────────────┐      ┌─────────────┐
      │  RAG Agent  │      │ Graph Agent  │      │Vision Agent │
      └──────┬──────┘      └──────┬───────┘      └──────┬──────┘
             │                    │                     │
             ▼                    ▼                     ▼
       ┌──────────┐          ┌─────────┐         ┌────────────┐
       │  Qdrant  │          │  Neo4j  │         │ YOLO / VLM │
       └──────────┘          └─────────┘         └────────────┘
             │                    │                     │
             └────────────────────┼─────────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   Audio Agent    │
                         │ Whisper / TTS     │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Evidence /       │
                         │ Structured Result│
                         └──────────────────┘
```

---

# 🔄 Agentic AI Flow

```text
             User Query
                  │
                  ▼
          ┌───────────────┐
          │ Agent receives│
          │    request    │
          └───────┬───────┘
                  │
                  ▼
          Understand Intent
                  │
                  ▼
          Select Tool / Agent
                  │
       ┌──────────┼──────────┐
       │          │          │
       ▼          ▼          ▼
      RAG       Graph      Vision
       │          │          │
       └──────────┼──────────┘
                  │
                  ▼
           Retrieve Evidence
                  │
                  ▼
             Reasoning
                  │
                  ▼
          Structured Answer
```

---

# 🧰 Tech Stack

## 🐍 Core Development

<p align="center">

<img src="https://skillicons.dev/icons?i=python,git,github,vscode,linux" />

</p>

**Python · Git · GitHub · VS Code · Linux**

---

## 🤖 AI & Agentic AI

<p align="center">

<img src="https://skillicons.dev/icons?i=python,pytorch,huggingface" />

</p>

**Python · PyTorch · Hugging Face · LangGraph · LangChain · Ollama · MCP**

### Technologies

* 🐍 Python
* 🧠 PyTorch
* 🤗 Hugging Face
* 🦜 LangChain
* 🔀 LangGraph
* 🦙 Ollama
* 🔌 Model Context Protocol (MCP)
* 🛠️ Tool calling
* 🧩 Agent orchestration

---

# 📚 Retrieval-Augmented Generation

AegisAI uses a hybrid retrieval architecture rather than relying exclusively on semantic similarity.

```text
                 User Query
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
   Dense Retrieval         BM25 Retrieval
          │                     │
          └──────────┬──────────┘
                     ▼
              RRF Fusion
                     │
                     ▼
             Candidate Docs
                     │
                     ▼
             Cross Encoder
                Reranker
                     │
                     ▼
              Top Documents
                     │
                     ▼
                   LLM
                     │
                     ▼
                Answer
```

### RAG Stack

* 🗄️ Qdrant
* 🔎 Dense vector retrieval
* 🧠 `all-MiniLM-L6-v2`
* 🔤 BM25
* 🔀 Reciprocal Rank Fusion (RRF)
* 🎯 Cross-Encoder reranking
* 🤗 `cross-encoder/ms-marco-MiniLM-L-6-v2`
* 🦙 Ollama / local LLM support

### RAG Evaluation

Current evaluation set:

```text
Test Queries: 4
Correct source in Top-3: 4

Precision@3 = 100%
```

> Evaluation is based on the current project test set and is not intended to represent a production-scale benchmark.

---

# 🕸️ Knowledge Graph Intelligence

AegisAI represents incidents and their relationships using **Neo4j**.

```text
                ┌───────────────┐
                │    PERSON     │
                └───────┬───────┘
                        │
                     INVOLVED
                        │
                        ▼
                ┌───────────────┐
                │   INCIDENT    │
                └───────┬───────┘
                        │
                     OCCURRED
                        │
                        ▼
                ┌───────────────┐
                │    LOCATION   │
                └───────────────┘
```

### Knowledge Graph Features

* 🧩 Entity extraction
* 🔗 Relationship creation
* 🕸️ Neo4j graph storage
* 🔍 Incident retrieval
* 📍 Location-based investigation
* 🚨 High-severity incident analysis
* 👥 People involved in incidents
* 🧪 Graph validation
* 📊 Automated graph evaluation
* 🌐 FastAPI graph endpoints

### Important Engineering Decision

The graph agent does **not** allow the LLM to freely generate arbitrary Cypher queries.

Instead, the system exposes **safe, allow-listed graph operations**.

```text
LLM
 │
 ▼
Intent
 │
 ▼
Allow-listed Tool
 │
 ▼
Parameterized Graph Operation
 │
 ▼
Neo4j
```

This reduces the risk of uncontrolled database operations and makes agent behavior easier to validate.

---

# 👁️ Computer Vision

AegisAI includes a computer-vision pipeline for image and video analysis.

### Vision Pipeline

```text
Image / Video
      │
      ▼
   OpenCV
      │
      ▼
YOLO Detection
      │
      ▼
Object Filtering
      │
      ▼
Tracking
      │
      ▼
Scene Reasoning
      │
      ▼
Structured Observation
```

### Vision Stack

<p align="center">

<img src="https://skillicons.dev/icons?i=opencv,pytorch" />

</p>

* 👁️ YOLO
* 🔥 PyTorch
* 📷 OpenCV
* 🎯 Object detection
* 🧭 Object tracking
* 🧠 Vision-Language Model
* 🦙 Moondream through Ollama
* 🎥 Video processing
* 🕒 Frame timestamps
* 📦 Bounding boxes
* 🎯 Confidence filtering

### Detection Output

The vision pipeline can represent detections using information such as:

```json
{
  "label": "person",
  "confidence": 0.91,
  "bbox": [120, 80, 300, 420],
  "frame_timestamp": 12.4
}
```

---

# 🎙️ Audio Intelligence

AegisAI includes audio processing capabilities for converting speech into structured text.

### Audio Pipeline

```text
Audio
  │
  ▼
Whisper
  │
  ▼
Speech-to-Text
  │
  ├── Language
  │
  ├── Text
  │
  └── Timestamped Segments
```

### Audio Stack

* 🎙️ OpenAI Whisper
* 🔊 Speech-to-text
* 🌍 Language detection
* ⏱️ Timestamped segments
* 🔧 FFmpeg

---

# 🔌 MCP — Model Context Protocol

One of the major architectural improvements in AegisAI is the MCP integration.

The agent has been rewired as an **MCP client**.

Instead of importing tools directly:

```text
Agent
  │
  └── hardcoded imports
```

the architecture becomes:

```text
Agent
  │
  ▼
MCP Client
  │
  ▼
MCP Tool Server
  │
  ▼
Available Tools
```

### MCP Workflow

```text
1. Agent starts
       ↓
2. MCP server spawned as subprocess
       ↓
3. MCP handshake
       ↓
4. list_tools()
       ↓
5. Discover available tools
       ↓
6. Model selects tool
       ↓
7. MCP executes tool
       ↓
8. Result returned to agent
```

### Current MCP Validation

The MCP implementation has been tested with:

* `llama3.1`
* `llama3.2:1b`

The larger model correctly supports native tool calls but can be slower on CPU.

The smaller model can produce tool-call information as plain-text JSON instead of native `tool_calls`, which is a model behavior limitation rather than an MCP protocol failure.

### Production Direction

For production-grade native tool calling, the architecture can be switched to a model/provider with reliable structured tool-call support, such as Anthropic's tool-calling models.

---

# 🌐 Backend

AegisAI is designed around a REST API architecture.

<p align="center">

<img src="https://skillicons.dev/icons?i=python,fastapi" />

</p>

### Backend Technologies

* 🐍 Python
* ⚡ FastAPI
* 📦 Pydantic
* 🌐 REST APIs
* 📖 Swagger / OpenAPI
* 🔌 Tool-based service architecture

---

# 🗄️ Data Layer

### Implemented

* 🕸️ Neo4j
* 🔎 Qdrant

### Planned

* 🐘 PostgreSQL
* ⚡ Redis
* 🔄 Celery

The project intentionally separates **graph data**, **vector retrieval**, and future transactional application data.

---

# 🐳 Infrastructure

<p align="center">

<img src="https://skillicons.dev/icons?i=docker,git,github,linux" />

</p>

### Current

* 🐳 Docker
* 🐙 GitHub
* 🌿 Git
* 🐧 Linux-compatible development
* 🗄️ Neo4j Docker container

### Planned

* ☁️ AWS
* 🔄 GitHub Actions
* 📊 Prometheus
* 📈 Grafana
* 🔭 OpenTelemetry
* ⚡ Redis
* 🔄 Celery

---

# 🖥️ Frontend

The frontend is part of the planned final integration.

### Planned Stack

<p align="center">

<img src="https://skillicons.dev/icons?i=react,nextjs,typescript,tailwind" />

</p>

* ⚛️ React
* ▲ Next.js
* 📘 TypeScript
* 🎨 Tailwind CSS
* 📊 Investigation dashboard
* 🕸️ Knowledge Graph visualization
* 📚 RAG interface
* 👁️ Vision results
* 🎙️ Audio results

---

# 📂 Project Structure

```text
aegis-ai/
│
├── agents/
│   └── graph/
│       └── graph_agent.py
│
├── audio/
│   ├── speaker.py
│   └── transcriber.py
│
├── knowledge_graph/
│   ├── detector.py
│   ├── evaluate_graph.py
│   ├── extractor.py
│   ├── ingestion.py
│   ├── knowledge_graph_api.py
│   ├── schema.py
│   ├── service.py
│   └── validation.py
│
├── rag/
│   └── ...
│
├── vision/
│   ├── detector.py
│   ├── detect_image.py
│   ├── detect_video.py
│   ├── scene_reasoner.py
│   ├── schema.py
│   ├── service.py
│   └── tracker.py
│
├── agent.py
├── setup_agent.py
├── setup_kg.py
├── tools.py
├── docker-compose.yml
├── requirements.txt
├── README.md
└── .gitignore
```

---

# 🧪 Evaluation

AegisAI includes evaluation logic instead of relying only on subjective manual testing.

### RAG

```text
Metric:
Precision@3

Current test set:
4 queries

Correct:
4 / 4

Result:
100%
```

### Knowledge Graph

Graph evaluation includes queries such as:

```text
✓ Incidents at a specific location
✓ High-severity people at a location
✓ Expected entities
✓ Pass / fail evaluation
✓ Accuracy calculation
```

This provides a foundation for expanding toward more systematic evaluation.

---

# 🔐 Engineering & Safety Principles

AegisAI is designed around several engineering principles.

### 1. Structured Tool Access

Agents interact with capabilities through defined tools rather than unrestricted system access.

### 2. Allow-listed Graph Operations

The graph agent exposes specific operations instead of allowing unrestricted LLM-generated database queries.

### 3. Evidence-Based Retrieval

RAG retrieves supporting documents before generating an answer.

### 4. Confidence Filtering

Vision detections can be filtered using confidence thresholds.

### 5. Separation of Responsibilities

Different components have different responsibilities:

```text
RAG       → Documents / Knowledge
Graph     → Relationships
Vision    → Visual Evidence
Audio     → Speech Evidence
Agent     → Reasoning / Orchestration
MCP       → Tool Connectivity
API       → External Interface
```

---

# ⚡ Quick Start

## 1️⃣ Clone the repository

```bash
git clone https://github.com/rudellll123/aegis-ai.git

cd aegis-ai
```

---

## 2️⃣ Create a virtual environment

### Windows

```powershell
python -m venv venv

.\venv\Scripts\Activate.ps1
```

### Linux / macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

## 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

---

# 🕸️ Start Neo4j

AegisAI includes a Docker Compose configuration for Neo4j.

```bash
docker compose up -d
```

Neo4j services:

```text
Browser:
http://localhost:7474

Bolt:
bolt://localhost:7687
```

> For production, move database credentials into environment variables rather than keeping credentials directly in `docker-compose.yml`.

---

# 🦙 Ollama

Install Ollama separately and pull the model required by your local configuration.

Example:

```bash
ollama pull llama3.1
```

For vision reasoning:

```bash
ollama pull moondream
```

---

# ▶️ Run AegisAI

The main agent entry point is:

```bash
python agent.py
```

Additional setup scripts are available in the repository:

```text
setup_agent.py
setup_kg.py
```

Use the relevant setup script according to the component you want to initialize.

---

# 🧪 Run Knowledge Graph Evaluation

```bash
python knowledge_graph/evaluate_graph.py
```

---

# 📚 RAG Evaluation

The RAG module contains its evaluation workflow.

From the repository root:

```bash
cd rag
python evaluate.py
```

---

# 🗺️ Development Roadmap

## ✅ Completed

### Phase 0 — Foundation

* Python environment
* Project structure
* Git/GitHub
* Basic configuration

### Phase 1 — Agentic AI

* Agent architecture
* Tool execution
* Agent reasoning
* Tool routing

### Phase 2 — Advanced RAG

* Qdrant
* Dense retrieval
* BM25
* RRF
* Cross-encoder reranking
* RAG evaluation

### Phase 3 — Knowledge Graph

* Neo4j
* Entity extraction
* Relationship creation
* Graph validation
* Graph retrieval
* Graph evaluation
* Graph agent

### Phase 4 — Computer Vision

* YOLO
* Object detection
* Confidence filtering
* Bounding boxes
* Video processing
* Tracking
* Vision-language reasoning

### Phase 5 — Audio

* Whisper
* Speech-to-text
* Language detection
* Timestamped transcription
* Speaker-related processing

### Phase 6 — MCP

* MCP client
* MCP subprocess server
* MCP handshake
* Dynamic `list_tools()`
* Tool discovery
* Model tool calling
* MCP validation with local LLMs

---

# 🔜 Upcoming Phases

### Phase 7 — Production Backend

* Complete FastAPI API layer
* Authentication
* User management
* Database integration
* Job management
* Async processing

### Phase 8 — Evaluation

* Larger evaluation datasets
* RAG metrics
* Agent evaluation
* Graph evaluation
* Vision evaluation
* Regression tests

### Phase 9 — Observability

* OpenTelemetry
* Prometheus
* Grafana
* Logging
* Tracing
* Latency monitoring

### Phase 10 — Cloud & CI/CD

* AWS
* Docker production deployment
* GitHub Actions
* Automated testing
* Automated deployment

### Phase 11 — Frontend

* React / Next.js
* TypeScript
* Tailwind
* Investigation dashboard
* Graph visualization
* Multimodal result viewer

### Phase 12 — Final Integration

```text
                ┌───────────────┐
                │   Frontend    │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │    FastAPI    │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │ Agent System  │
                └───────┬───────┘
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
      RAG             Graph            Vision
        │               │                │
        ▼               ▼                ▼
     Qdrant           Neo4j          YOLO/VLM
        │               │                │
        └───────────────┼────────────────┘
                        │
                        ▼
                      Audio
                        │
                        ▼
                Final Intelligence
```

---

# 📊 Phase Progress

```text
Phase 0  ████████████████████  100%
Phase 1  ████████████████████  100%
Phase 2  ████████████████████  100%
Phase 3  ████████████████████  100%
Phase 4  ████████████████████  100%
Phase 5  ████████████████████  100%
Phase 6  ████████████████████  100%

Phase 7  ░░░░░░░░░░░░░░░░░░░░    Planned
Phase 8  ░░░░░░░░░░░░░░░░░░░░    Partial
Phase 9  ░░░░░░░░░░░░░░░░░░░░    Planned
Phase 10 ░░░░░░░░░░░░░░░░░░░░    Planned
Phase 11 ░░░░░░░░░░░░░░░░░░░░    Planned
Phase 12 ░░░░░░░░░░░░░░░░░░░░    Planned
```

---

# 🧠 What Makes This Project Resume-Worthy?

AegisAI demonstrates experience across several areas rather than being only an LLM wrapper.

### AI Engineering

* Agentic AI
* Tool calling
* RAG
* LLM integration
* Multimodal AI

### Backend Engineering

* FastAPI
* REST APIs
* Modular services
* Data validation
* API architecture

### Data Engineering

* Vector databases
* Knowledge graphs
* Hybrid retrieval
* Entity extraction
* Relationship modeling

### Computer Vision

* YOLO
* Object detection
* Tracking
* Video analysis
* VLM reasoning

### Audio AI

* Whisper
* Speech recognition
* Timestamped transcription

### AI Infrastructure

* Docker
* MCP
* Local LLM deployment
* Evaluation pipelines

---


# 🔍 RAG vs Knowledge Graph

AegisAI intentionally uses both.

| Feature                    | RAG     | Knowledge Graph |
| -------------------------- | ------- | --------------- |
| Documents                  | ✅       | 🟡              |
| Semantic search            | ✅       | ❌               |
| Relationships              | 🟡      | ✅               |
| Entity connections         | 🟡      | ✅               |
| Structured facts           | 🟡      | ✅               |
| Natural-language retrieval | ✅       | ✅               |
| Multi-hop relationships    | Limited | ✅               |
| Vector similarity          | ✅       | ❌               |

### Combined architecture

```text
             User Question
                   │
          ┌────────┴────────┐
          ▼                 ▼
        RAG               Graph
          │                 │
      Documents         Relationships
          │                 │
          └────────┬────────┘
                   ▼
               AI Agent
                   │
                   ▼
          Evidence + Context
                   │
                   ▼
              Final Answer
```

---

# 🧩 Design Philosophy

AegisAI follows:

```text
Modular
   +
Tool-driven
   +
Evidence-based
   +
Multimodal
   +
Evaluated
   +
Production-oriented
```

The goal is not simply:

> "Build a chatbot."

The goal is:

> **Build an AI system that can reason over multiple forms of evidence, access specialized tools, maintain structured relationships, and produce useful investigation intelligence.**

---

# 🔮 Future Vision

The long-term architecture aims to evolve AegisAI into a complete AI investigation platform:

```text
Documents ───────┐
Images ──────────┤
Video ───────────┤
Audio ───────────┤
Databases ───────┤
External APIs ───┤
                  ▼
           ┌──────────────┐
           │ AegisAI      │
           │ Agent System │
           └──────┬───────┘
                  │
       ┌──────────┼──────────┐
       ▼          ▼          ▼
      RAG       Graph      Vision
       │          │          │
       └──────────┼──────────┘
                  │
                  ▼
            Reasoning Layer
                  │
                  ▼
          Investigation Report
                  │
                  ▼
        Human Review / Action
```

---

# 🛠️ Production Hardening Checklist

Before calling the platform production-ready, the following improvements should be completed:

* [ ] Move secrets to `.env`
* [ ] Remove hardcoded Neo4j credentials
* [ ] Remove machine-specific FFmpeg paths
* [ ] Add authentication
* [ ] Add authorization
* [ ] Add structured logging
* [ ] Add automated tests
* [ ] Add CI/CD
* [ ] Add observability
* [ ] Add rate limiting
* [ ] Add background jobs
* [ ] Add PostgreSQL
* [ ] Add Redis
* [ ] Add cloud deployment
* [ ] Add frontend
* [ ] Add larger evaluation datasets

---

# 📈 Future Scalability

AegisAI can evolve toward:

```text
                    Load Balancer
                          │
                          ▼
                    FastAPI API
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
         Agent Workers           Job Workers
              │                       │
      ┌───────┼───────┐              │
      ▼       ▼       ▼              ▼
     RAG    Graph   Vision         Celery
      │       │       │              │
      ▼       ▼       ▼              ▼
   Qdrant   Neo4j   Object Store   Redis
              │
              ▼
          PostgreSQL
```

---

# 📚 Technologies at a Glance

<p align="center">

<img src="https://skillicons.dev/icons?i=python,pytorch,fastapi,opencv,docker,git,github,neo4j,qdrant,postgres,redis,aws,react,nextjs,typescript,tailwind,linux,vscode" />

</p>

### AI

`Python` · `PyTorch` · `Hugging Face` · `Ollama` · `LangChain` · `LangGraph`

### Retrieval

`Qdrant` · `Sentence Transformers` · `BM25` · `RRF` · `Cross Encoder`

### Graph

`Neo4j` · `Cypher` · `Knowledge Graph`

### Vision

`YOLO` · `OpenCV` · `ByteTrack` · `VLM` · `Moondream`

### Audio

`Whisper` · `FFmpeg` · `Speech-to-Text`

### Backend

`FastAPI` · `Pydantic` · `REST` · `OpenAPI` · `Swagger`

### Agent Infrastructure

`MCP` · `Tool Calling` · `Subprocess Tool Servers`

### Infrastructure

`Docker` · `Git` · `GitHub`

### Planned

`PostgreSQL` · `Redis` · `Celery` · `AWS` · `GitHub Actions` · `OpenTelemetry` · `Prometheus` · `Grafana` · `React` · `Next.js` · `TypeScript` · `Tailwind`

---

# 🌟 Project Status

### Current milestone

```text
AegisAI
│
├── 🤖 Agentic AI          ✅
├── 📚 Advanced RAG        ✅
├── 🕸️ Knowledge Graph     ✅
├── 👁️ Computer Vision     ✅
├── 🎙️ Audio Intelligence  ✅
├── 🔌 MCP                 ✅
│
├── 🌐 Production Backend  🔜
├── 🧪 Advanced Evaluation 🔜
├── 📊 Observability       🔜
├── ☁️ AWS + CI/CD         🔜
├── 🖥️ Frontend            🔜
└── 🚀 Final Integration   🔜
```

---

# 👨‍💻 Author

## Rahul Jha

B.Tech Student | AI Engineering | Backend Development | Agentic AI

<p align="center">

<a href="https://github.com/rudellll123">
<img src="https://img.shields.io/badge/GitHub-rudellll123-181717?style=for-the-badge&logo=github" />
</a>

<a href="https://www.linkedin.com/in/rahuljha174/">
<img src="https://img.shields.io/badge/LinkedIn-Rahul%20Jha-0A66C2?style=for-the-badge&logo=linkedin" />
</a>

</p>

---

# ⭐ Support

If you find AegisAI interesting, consider giving the repository a ⭐.

<p align="center">

### 🛡️ AegisAI

**From raw evidence → structured knowledge → intelligent investigation**

</p>

---

<p align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" />

</p>

