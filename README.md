<h1 align="center">

🛡️ AegisAI

</h1>

<h3 align="center">

Multimodal AI Investigation & Incident Response Platform

</h3>

<p align="center">

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&size=18&duration=2800&pause=1000&color=39FF14&width=650&lines=Agent+%E2%86%92+Tool+%E2%86%92+Result+%E2%86%92+Agent;Hybrid+RAG+%2B+Knowledge+Graph+%2B+Vision;MCP+Tool+Ecosystem+%2B+Async+Processing;Built%2C+measured%2C+and+deployed+one+phase+at+a+time" alt="typing" />{=html}

</p>

<p align="center">

<img src="https://img.shields.io/badge/Status-Active%20Development-39FF14?style=for-the-badge" />{=html}
<img src="https://img.shields.io/badge/Phases-0--12%20Completed-1f6feb?style=for-the-badge" />{=html}
<img src="https://img.shields.io/badge/Deployment-Render-8957e5?style=for-the-badge" />{=html}
<img src="https://img.shields.io/badge/Runtime-Local%20AI%20%2B%20Cloud%20API-212529?style=for-the-badge" />{=html}

</p>

<p align="center">

<a href="https://github.com/rudellll123/aegis-ai">{=html}
<img src="https://img.shields.io/badge/GitHub-AegisAI-181717?style=flat-square&logo=github&logoColor=white" />{=html}
</a>{=html}
<a href="https://www.linkedin.com/in/rahuljha174/">{=html}
<img src="https://img.shields.io/badge/LinkedIn-Rahul%20Jha-0A66C2?style=flat-square&logo=linkedin&logoColor=white" />{=html}
</a>{=html} <a href="mailto:rahuljha1807@gmail.com">{=html}
<img src="https://img.shields.io/badge/Email-Contact-D14836?style=flat-square&logo=gmail&logoColor=white" />{=html}
</a>{=html}

</p>

<p align="center">

<a href="https://aegis-ai-b3k8.onrender.com">{=html}
<img src="https://img.shields.io/badge/Live%20API-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />{=html}
</a>{=html}

</p>

What is AegisAI?

AegisAI is a multimodal AI investigation and incident-response platform
designed to bring together evidence from documents, images, video,
audio, structured databases, and knowledge graphs.

The platform combines agentic orchestration, hybrid RAG, computer
vision, speech processing, knowledge-graph retrieval, asynchronous jobs,
MCP-based tool discovery, evaluation, observability, and a production
API into one investigation workflow.

The core idea is:

Don't just detect an event --- investigate it by connecting evidence
from multiple sources.

A typical investigation can involve:

Incident
   │
   ▼
Supervisor Agent
   │
   ├── Search evidence
   ├── Analyze video
   ├── Query incident database
   ├── Traverse knowledge graph
   ├── Transcribe audio
   └── Generate investigation context
             │
             ▼
        Investigation Report
             │
             ▼
       Human Review / Approval

AegisAI is an AI-assisted system. High-impact decisions remain
subject to human review rather than being delegated completely to an
autonomous model.

Why AegisAI?

Capability              Traditional Workflow    AegisAI

Documents               Manual search           Hybrid RAG

Video                   Manual inspection       YOLO + ByteTrack

Audio                   Manual listening        Whisper

Relationships           Manual lookup           Neo4j knowledge graph

Database records        Separate queries        Agent tools

AI reasoning            Individual prompts      LangGraph agent

Tool integration        Python imports          MCP

Long-running tasks      Blocking execution      Celery background jobs

Quality measurement     Manual testing          Evaluation suites

System Architecture

┌──────────────────────────────────────────────────────────────────────────────┐
│                         🖥️ PRESENTATION LAYER                               │
│                    Next.js + React + TypeScript + Tailwind                  │
│          Dashboard • Incidents • Evidence • Uploads • Investigation UI      │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │ REST / HTTP
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                            ⚡ API LAYER                                      │
│                         FastAPI + Pydantic                                  │
│          Health • Incidents • Video Jobs • Audio • Investigation APIs       │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                       🧠 AGENT ORCHESTRATION LAYER                          │
│                         LangGraph Supervisor                                │
│              State • Routing • Tool Calling • Human-in-the-Loop             │
└───────────────┬──────────────────┬──────────────────┬────────────────────────┘
                │                  │                  │
                ▼                  ▼                  ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────────┐
│ 🔎 RAG / Evidence    │ │ 👁️ Vision Agent      │ │ 🗄️ Data Agent            │
│ Qdrant               │ │ YOLOv8               │ │ PostgreSQL               │
│ BM25                 │ │ ByteTrack            │ │ SQLAlchemy               │
│ RRF                  │ │ OpenCV               │ │ Incident Data            │
│ Cross-Encoder        │ │ VLM                  │ │ Job / Result State       │
└──────────┬───────────┘ └──────────┬───────────┘ └────────────┬─────────────┘
           │                        │                           │
           └────────────────────────┼───────────────────────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    ▼                                ▼
┌──────────────────────────────────┐   ┌─────────────────────────────────────┐
│ 🕸️ KNOWLEDGE + AUDIO LAYER       │   │ 🔌 MCP TOOL ECOSYSTEM              │
│ Neo4j + Cypher                   │   │ FastMCP Server                      │
│ Whisper STT                      │   │ MCP Client                          │
│ pyttsx3 TTS                      │   │ Dynamic list_tools()                │
└────────────────┬─────────────────┘   └──────────────────┬──────────────────┘
                 │                                        │
                 └────────────────────┬───────────────────┘
                                      ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         ⚙️ ASYNC PROCESSING LAYER                            │
│                         Redis + Celery                                      │
│                Queue • Worker • Job ID • Status • Result                    │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                    📊 EVALUATION + OBSERVABILITY LAYER                      │
│       Pytest • RAG Evaluation • Agent Evaluation • Vision • Latency         │
│       Prometheus Metrics • Grafana Dashboards • OpenTelemetry Traces        │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                         🚀 DEPLOYMENT LAYER                                  │
│     Docker • GitHub Actions CI/CD • Production Health Verification          │
│                         Render + PostgreSQL                                  │
│                    🌐 Live API: aegis-ai-b3k8.onrender.com                  │
└──────────────────────────────────────────────────────────────────────────────┘


### Infrastructure Layer

``` text
Docker
  │
  ├── PostgreSQL
  ├── Redis
  ├── Celery Worker
  ├── Prometheus
  └── Grafana

GitHub
  │
  └── GitHub Actions
          │
          ├── RAG Evaluation
          ├── Vision Evaluation
          ├── API Smoke Tests
          └── Production Health Verification
                    │
                    ▼
                  Render
                    │
                    └── FastAPI + PostgreSQL

Technology Stack

Backend

Python

FastAPI

Pydantic

SQLAlchemy

PostgreSQL

Redis

Celery

Agentic AI

LangGraph

LangChain

Ollama

MCP

FastMCP

langchain-mcp-adapters

Retrieval

Qdrant

Sentence Transformers

BM25

Reciprocal Rank Fusion

Cross-Encoder Reranking

Computer Vision

YOLOv8

ByteTrack

OpenCV

Local VLM

Audio

Whisper

pyttsx3

Knowledge Graph

Neo4j

Cypher

Parameterized graph operations

Frontend

React

Next.js

TypeScript

Tailwind CSS

Infrastructure

Docker

GitHub Actions

Render

PostgreSQL

Redis

Observability

Prometheus

Grafana

OpenTelemetry

Testing / Evaluation

Pytest

Custom evaluation scripts

RAG precision@k

Agent tool-selection evaluation

Vision evaluation

Latency evaluation

API smoke tests

Development Phases

Phase 0 --- Architecture & Setup

Status: ✅ COMPLETED

Established the development environment and project structure.

Implemented:

Python environment

Git repository

VS Code workspace

Dependency management

Initial project architecture

Phase 1 --- Agentic AI Foundation

Status: ✅ COMPLETED

Built the initial LangGraph-based agent.

Implemented:

Agent state

Nodes

Edges

Routing

Tool calling

Human-in-the-loop foundation

Ollama local inference

Incident search tool

Incident detail tool

The initial agent was deliberately kept small so the complete agent loop
could be verified before adding more tools.

Phase 2 --- Hybrid RAG

Status: ✅ COMPLETED

Implemented a hybrid retrieval pipeline combining semantic and lexical
search.

Query
 │
 ├── Dense Retrieval → Qdrant
 │
 ├── Sparse Retrieval → BM25
 │
 ▼
Reciprocal Rank Fusion
 │
 ▼
Metadata Filtering
 │
 ▼
Cross-Encoder Reranking
 │
 ▼
Final Evidence

Implemented:

Qdrant vector storage

Sentence Transformer embeddings

BM25 retrieval

Reciprocal Rank Fusion

Metadata filtering

Cross-encoder reranking

search_evidence agent tool

Retrieval evaluation

Measured Result

Current evaluation dataset:

Correct top-3 retrievals: 4 / 4
Precision@3:              100%

This result applies to the current evaluation dataset and is not
presented as a general benchmark.

Phase 3 --- Knowledge Graph

Status: ✅ COMPLETED

Implemented a Neo4j-backed knowledge graph for relationship-oriented
queries.

Entities include:

People

Incidents

Locations

The graph supports queries requiring relationships and multi-hop
traversal.

Example:

Which people were associated
with high-severity incidents
at a particular location?

Security Design

The LLM does not generate arbitrary Cypher.

LLM
 │
 ▼
Allowed Operation
 │
 ▼
Validated Parameters
 │
 ▼
Parameterized Query
 │
 ▼
Neo4j

This keeps graph operations inside a controlled interface.

Phase 4 --- Computer Vision

Status: ✅ COMPLETED

Implemented:

YOLOv8 object detection

Confidence filtering

Allow-list filtering

ByteTrack tracking

Frame processing

Object counting

Persistent track IDs

Local VLM scene reasoning

Agent integration

Pipeline:

Video
 │
 ▼
OpenCV
 │
 ▼
YOLOv8 Detection
 │
 ▼
Confidence / Allow-list Filtering
 │
 ▼
ByteTrack
 │
 ▼
Persistent Object Tracking
 │
 ▼
Structured Detection Results
 │
 └──► Local VLM → Narrative Description

Reliability Finding

Testing exposed a VLM hallucination case where the VLM described objects
that were not actually present.

The resulting design treats:

YOLO structured detections as the source of truth for object counts.

The VLM is supplementary narrative reasoning rather than the
authoritative source for numerical object counts.

Phase 5 --- Voice / Audio

Status: ✅ COMPLETED

Implemented local speech processing.

Speech-to-Text

Audio
 │
 ▼
Whisper
 │
 ▼
Transcript
 │
 ▼
Agent

Text-to-Speech

Agent Response
 │
 ▼
pyttsx3
 │
 ▼
Spoken Output

Implemented:

Local Whisper transcription

Segment timestamps

Text-to-speech

Audio tools

Agent integration

Smoke-test verification

Phase 6 --- MCP Tool Ecosystem

Status: ✅ COMPLETED

Moved tool access behind a standard MCP interface.

LangGraph Agent
      │
      ▼
MCP Client
      │
      │ stdio
      ▼
FastMCP Server
      │
      ├── Incident Tools
      ├── RAG Tools
      ├── Vision Tools
      └── Audio Tools

Implemented:

FastMCP server

MCP client

Dynamic tool discovery

langchain-mcp-adapters

MCP Inspector verification

Async MCP communication

The agent discovers tools dynamically through:

list_tools()

instead of relying on hardcoded Python imports.

Phase 7 --- Production Backend

Status: ✅ COMPLETED

Migrated the backend from mock in-memory data to real infrastructure.

Implemented:

PostgreSQL

SQLAlchemy

Redis

Celery

Background processing

Job IDs

Job status polling

PostgreSQL-backed incident endpoints

Long-running video processing follows:

API Request
    │
    ▼
Create Job
    │
    ▼
Return Job ID
    │
    ▼
Celery Queue
    │
    ▼
Worker
    │
    ▼
Video Processing
    │
    ▼
Store Result
    │
    ▼
Client Polls Job Status

This prevents long-running processing from unnecessarily blocking API
requests.

Phase 8 --- Evaluation

Status: ✅ COMPLETED

Implemented evaluation suites covering multiple parts of the system.

RAG

Precision@3 = 4 / 4

Agent

Correct tool selection = 4 / 4

Vision

Implemented detection/tracking evaluation against known test cases.

Latency

Implemented per-tool timing measurements.

The latency evaluation identified video analysis as a suitable candidate
for asynchronous execution, supporting the architecture introduced in
Phase 7.

Phase 9 --- Observability

Status: ✅ COMPLETED

Implemented application observability.

Prometheus

Metrics cover:

Tool calls

Latency

Success rate

Error rate

Grafana

Created dashboards for:

Tool Calls by Type
Tool Latency p95
Success vs Error Rate

OpenTelemetry

Added tracing around:

Agent reasoning

MCP tools

Known Architecture Limitation

The current MCP process boundary does not propagate trace context from
the agent process into the MCP server process.

Therefore, agent-side and tool-side spans are real but are not currently
represented as one unified distributed trace.

Phase 10 --- Deployment & CI/CD

Status: ✅ COMPLETED

The production strategy is intentionally split into two scopes.

Hosted Service

The lightweight FastAPI incident service is deployed on Render.

It exposes PostgreSQL-backed incident functionality.

Local AI System

The resource-intensive multimodal components remain locally runnable
because the complete stack requires significantly more memory than a
small free hosting instance provides.

These include:

YOLO

ByteTrack

VLM

Whisper

RAG reranking

Ollama

MCP tool ecosystem

Live API

https://aegis-ai-b3k8.onrender.com

CI/CD

GitHub Actions runs:

Push / Pull Request
        │
        ▼
RAG Evaluation
        │
        ▼
Vision Evaluation
        │
        ▼
API Smoke Tests
        │
        ▼
Production Health Verification
        │
        ▼
Render

The production workflow verifies the deployed /health endpoint and
associates the deployment with the GitHub production environment.

Deployment Issues Resolved

Fixed stale Docker configuration that caused an initial deployment
failure.

Fixed malformed DATABASE_URL configuration.

Added database URL normalization in application code.

Handled unreliable external PostgreSQL reachability from local
development.

Ensured the hosted API can initialize its required database state.

Added a Linux platform marker for the Windows-only pywin32
dependency so CI runners work correctly.

Phase 11 --- Frontend / UX

Status: ✅ COMPLETED

Implemented a Next.js frontend for interacting with the system.

Current capabilities include:

Dashboard

Incident listing

Incident details

Real API data

Deployment health information

Video upload interface

Video-analysis status

Object tracking results

Audio upload

Whisper transcription results

Severity breakdown

Recent incident navigation

Frontend stack:

Next.js
React
TypeScript
Tailwind CSS
Lucide

Phase 12 --- Final Integration & Documentation

Status: ✅ COMPLETED

Completed the primary integration and documentation work.

Implemented and documented:

System architecture

Agent workflow

RAG pipeline

Knowledge graph

Computer vision

Audio

MCP

PostgreSQL

Redis

Celery

Evaluation

Observability

Docker

GitHub Actions

Render deployment

Frontend

Known limitations

Cloud architecture

Current System Status

Component                          Status

LangGraph Agent                    ✅ Implemented
Hybrid RAG                         ✅ Implemented
Qdrant                             ✅ Implemented
BM25                               ✅ Implemented
Cross-Encoder Reranking            ✅ Implemented
Neo4j Knowledge Graph              ✅ Implemented
YOLOv8                             ✅ Implemented
ByteTrack                          ✅ Implemented
VLM                                ✅ Implemented
Whisper                            ✅ Implemented
TTS                                ✅ Implemented
MCP Server                         ✅ Implemented
MCP Client                         ✅ Implemented
PostgreSQL                         ✅ Implemented
Redis                              ✅ Implemented
Celery                             ✅ Implemented
Evaluation Suite                   ✅ Implemented
Prometheus                         ✅ Implemented
Grafana                            ✅ Implemented
OpenTelemetry                      ✅ Implemented
Docker                             ✅ Implemented
GitHub Actions                     ✅ Implemented
Next.js Frontend                   ✅ Implemented
Render API Deployment              🚀 Deployed
AWS Architecture                   🧩 Designed
Full Multimodal Cloud Deployment   🧩 Future Scope

Evaluation Summary

System                              Current Result

RAG Precision@3                                4/4
Agent Tool Selection                           4/4
Vision Evaluation           Test suite implemented
Latency Evaluation                     Implemented
API Smoke Tests                        Implemented
Production Health Check                Implemented

The reported 100% results are based on the project's current small
evaluation datasets and should not be interpreted as general
model-performance benchmarks.

Example Investigation Flow

                    Incident
                       │
                       ▼
                Supervisor Agent
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
     Video          Documents       Database
       │               │                │
       ▼               ▼                ▼
    YOLO/           Hybrid RAG       PostgreSQL
   ByteTrack            │
       │                │
       └───────┬────────┘
               ▼
        Knowledge Graph
               │
               ▼
             Neo4j
               │
               ▼
        Investigation Context
               │
               ▼
        Report Generation
               │
               ▼
         Human Review

Hybrid RAG Pipeline

Stage                   Technology              Purpose

Dense Retrieval         Sentence Transformers + Semantic similarity
Qdrant

Sparse Retrieval        BM25                    Exact terms and
identifiers

Fusion                  Reciprocal Rank Fusion  Combine rankings

Filtering               Metadata filters        Restrict candidate
documents

Reranking               Cross-Encoder           Improve final ordering

Agent Integration       LangGraph + MCP         Use retrieval as a tool

Security Design

AegisAI intentionally avoids giving the LLM unrestricted access to
sensitive operations.

For the knowledge graph:

LLM
 │
 ▼
Allowed Operation
 │
 ▼
Validated Parameters
 │
 ▼
Parameterized Query
 │
 ▼
Neo4j

The general principle is:

The model decides which capability to use; application code controls
how that capability executes.

Project Structure

aegis-ai/
│
├── agent.py
├── tools.py
├── api.py
├── requirements.txt
├── requirements-api.txt
│
├── mcp_server/
│   └── incident_server.py
│
├── rag/
│   ├── documents.py
│   ├── ingest.py
│   ├── retrieve.py
│   └── evaluate.py
│
├── knowledge_graph/
│   └── graph_agent.py
│
├── vision/
│   ├── detector.py
│   ├── tracker.py
│   └── scene_reasoner.py
│
├── audio/
│   ├── transcriber.py
│   └── speaker.py
│
├── eval/
│   ├── agent_eval.py
│   ├── vision_eval.py
│   └── latency_eval.py
│
├── frontend/
│   └── ...
│
├── infrastructure/
│   └── ...
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
└── AWS_ARCHITECTURE.md

Local Setup

AegisAI's complete AI stack can run locally.

1. Install Ollama

Install Ollama and pull a tool-capable model:

ollama pull llama3.1

2. Create virtual environment

python -m venv venv

Windows PowerShell:

venv\Scripts\Activate.ps1

Linux/macOS:

source venv/bin/activate

3. Install dependencies

pip install -r requirements.txt

4. Build the RAG index

cd rag
python ingest.py
cd ..

5. Run the agent

python agent.py

Evaluation

Run the RAG evaluation:

cd rag
python evaluate.py

Run the evaluation suites:

python eval/agent_eval.py
python eval/vision_eval.py
python eval/latency_eval.py

Production Deployment

The lightweight API is deployed on Render.

Production API:

https://aegis-ai-b3k8.onrender.com

The hosted API exposes the PostgreSQL-backed incident functionality.

The heavy local AI pipeline remains available for local execution
because the multimodal models require considerably more memory than the
lightweight hosted API.

CI/CD

GitHub Actions performs automated validation on pushes and pull
requests.

Current CI stages:

Checkout
   ↓
Python Setup
   ↓
Dependency Installation
   ↓
RAG Evaluation
   ↓
Vision Evaluation
   ↓
PostgreSQL Service
   ↓
API Smoke Tests
   ↓
Production Health Verification

Production health verification checks:

https://aegis-ai-b3k8.onrender.com/health

The GitHub production environment points to the live Render
deployment.

AWS Architecture

Status: 🧩 DESIGNED --- NOT DEPLOYED

The complete multimodal production architecture is also documented for
AWS.

Proposed services:

AWS
│
├── ECS / Fargate
├── ECR
├── RDS PostgreSQL
├── ElastiCache Redis
├── S3
├── IAM
└── VPC

The architecture is documented in:

AWS_ARCHITECTURE.md

AWS provisioning is intentionally not represented as deployed
infrastructure.

The currently deployed hosted environment is Render.

Engineering Lessons

1. Retrieval should be evaluated

The RAG system includes an explicit evaluation script rather than
relying only on qualitative examples.

2. LLM output should not automatically be treated as ground truth

The VLM hallucination experiment led to a concrete architecture
decision:

Structured detector output
        ↓
Source of truth

VLM output
        ↓
Supplementary narrative

3. Long-running work should be asynchronous

Request
  ↓
Job ID
  ↓
Queue
  ↓
Worker
  ↓
Result

4. Tools should be controlled

The agent chooses capabilities through tools while application code
controls execution.

5. Observability exposes architectural problems

The OpenTelemetry implementation exposed the MCP process-boundary trace
propagation limitation rather than hiding it.

Known Limitations

Hosted AI inference

The public Render service intentionally exposes a lightweight API rather
than the complete multimodal AI stack.

Local model performance

Local Ollama models can be slower and less reliable for tool calling
than larger hosted models.

Evaluation dataset size

The current evaluation sets are intentionally small and are useful for
regression testing rather than broad model benchmarking.

Distributed tracing

Trace context is not yet propagated across the MCP process boundary.

Cloud architecture

The AWS production architecture is designed but has not been
provisioned.

Future Improvements

Larger evaluation datasets

Improved multimodal grounding

Distributed trace propagation across MCP

Authentication and authorization

Scalable model serving

Object-storage integration

Expanded incident analytics

Richer evidence visualization

More comprehensive investigation workflows

Larger automated regression suites

Full multimodal cloud deployment

Resume Positioning

Short Version

AegisAI --- Multimodal AI Investigation & Incident Response
Platform: Built an agentic investigation platform combining
LangGraph, hybrid RAG, Neo4j knowledge graphs, YOLO/ByteTrack computer
vision, Whisper, MCP, PostgreSQL, Redis/Celery, and observability;
implemented automated evaluation and deployed a production FastAPI
service with GitHub Actions CI/CD on Render.

Core Technical Achievements

Built hybrid dense + sparse RAG with Qdrant, BM25, Reciprocal Rank
Fusion, and cross-encoder reranking.

Implemented LangGraph agentic orchestration with dynamic MCP tool
discovery.

Built YOLOv8 + ByteTrack video analysis with structured detection
outputs.

Implemented Whisper speech-to-text and offline TTS.

Built Neo4j knowledge-graph retrieval with parameterized graph
operations.

Migrated backend state from in-memory storage to PostgreSQL.

Added Redis + Celery asynchronous processing for long-running video
jobs.

Built RAG, agent, vision, and latency evaluation suites.

Implemented Prometheus, Grafana, and OpenTelemetry observability.

Built a Next.js/TypeScript frontend.

Deployed the lightweight production API to Render.

Added GitHub Actions CI and production health verification.

Engineering Philosophy

AegisAI was built one phase at a time.

Each phase was intended to leave behind:

A working component
        +
A measurable result
        +
An architectural reason
        +
An interview-explainable implementation

The goal is not simply to combine as many technologies as possible.

The goal is to understand why each component exists, how the
components interact, how the system fails, and how those failures
influence the architecture.

<p align="center">

<b>{=html}Built with Python · FastAPI · LangGraph · MCP · Qdrant ·
Neo4j · PostgreSQL · Redis · Celery · YOLO · Whisper · Next.js · Docker
· GitHub Actions</b>{=html}

</p>

<p align="center">

Built by <a href="https://github.com/rudellll123">{=html}Rahul
Jha</a>{=html} ·
<a href="https://www.linkedin.com/in/rahuljha174/">{=html}LinkedIn</a>{=html}

</p>
