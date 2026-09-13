"""
Phase 10 - Lightweight FastAPI service for deployment.

Exposes only the Postgres-backed incident endpoints (search, get by ID)
from the full agent - NOT the heavy ML tools (vision, audio, RAG
reranking), since those need several GB of RAM to even load their
models and would not fit a free-tier deployment's memory limits.

The full multimodal agent (agent.py) still runs locally / via MCP for
development and demos; this is the deliberately scoped-down piece
that's actually deployed.

Run locally:
    uvicorn api:app --reload

Run in Docker:
    see Dockerfile
"""

from fastapi import FastAPI, HTTPException
from db import SessionLocal, Incident

app = FastAPI(
    title="AegisAI Incident API",
    description="Lightweight deployed subset of AegisAI - incident search and lookup, backed by PostgreSQL.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "service": "AegisAI Incident API",
        "status": "ok",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    """Basic health check - also verifies the database connection works."""
    session = SessionLocal()
    try:
        session.query(Incident).first()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database unavailable: {e}")
    finally:
        session.close()


@app.get("/incidents")
def search_incidents(query: str = ""):
    """Search incidents by keyword in title or description."""
    session = SessionLocal()
    try:
        all_incidents = session.query(Incident).all()
        query_lower = query.lower()
        matches = [
            {"id": inc.id, "title": inc.title, "severity": inc.severity}
            for inc in all_incidents
            if not query or query_lower in inc.title.lower() or query_lower in inc.description.lower()
        ]
        return {"query": query, "count": len(matches), "results": matches}
    finally:
        session.close()


@app.get("/incidents/{incident_id}")
def get_incident_details(incident_id: str):
    """Get full details for a specific incident ID."""
    session = SessionLocal()
    try:
        inc = session.get(Incident, incident_id.upper())
        if inc is None:
            raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found")
        return {
            "id": inc.id,
            "title": inc.title,
            "severity": inc.severity,
            "date": inc.date,
            "description": inc.description,
        }
    finally:
        session.close()
