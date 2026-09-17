"""
Phase 10 - Lightweight FastAPI service for deployment.

Exposes only the Postgres-backed incident endpoints (search, get by ID)
from the full agent - NOT the heavy ML tools (vision, audio, RAG
reranking), since those need several GB of RAM to even load their
models and would not fit a free-tier deployment's memory limits.

On startup, creates the incidents table if missing and seeds it with
the same two records used throughout development - avoids depending on
being able to reach the database from outside Render's network, which
proved unreliable from a local machine during testing.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import SessionLocal, Incident, Base, engine

app = FastAPI(
    title="AegisAI Incident API",
    description="Lightweight deployed subset of AegisAI - incident search and lookup, backed by PostgreSQL.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

SEED_DATA = [
    Incident(
        id="INC-1001",
        title="Forklift near-miss in Loading Dock B",
        severity="Low",
        description="A forklift reversed unexpectedly without its backup alarm sounding. Nearby pedestrian stepped back safely.",
        date="2026-08-30",
    ),
    Incident(
        id="INC-1002",
        title="Minor chemical spill in Mixing Lab",
        severity="Medium",
        description="Approximately 500ml of cleaning solvent leaked from an unsecured container. Cleaned using standard spill kit.",
        date="2026-08-31",
    ),
    Incident(
        id="INC-1003",
        title="Unlabeled chemical drum found in Storage Bay 2",
        severity="High",
        description="A 55-gallon drum with no hazard labeling was discovered during a routine audit. Contents unknown pending lab analysis.",
        date="2026-09-02",
    ),
    Incident(
        id="INC-1004",
        title="Slip hazard from coolant leak near Machine 4",
        severity="Low",
        description="Minor coolant drip created a small slip hazard on the shop floor. Area cordoned off and cleaned within 15 minutes.",
        date="2026-09-05",
    ),
    Incident(
        id="INC-1005",
        title="Fire alarm triggered by welding smoke in Bay 7",
        severity="Medium",
        description="Welding operations set off the smoke detector. No fire present; alarm reset after ventilation.",
        date="2026-09-08",
    ),
]


@app.on_event("startup")
def init_db():
    Base.metadata.create_all(engine)
    session = SessionLocal()
    try:
        for inc in SEED_DATA:
            if session.get(Incident, inc.id) is None:
                session.add(inc)
        session.commit()
    finally:
        session.close()


@app.get("/")
def root():
    return {
        "service": "AegisAI Incident API",
        "status": "ok",
        "docs": "/docs",
    }


@app.get("/health")
def health():
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
    session = SessionLocal()
    try:
        all_incidents = session.query(Incident).all()
        query_lower = query.lower()
        matches = [
            {"id": inc.id, "title": inc.title, "severity": inc.severity, "date": inc.date}
            for inc in all_incidents
            if not query or query_lower in inc.title.lower() or query_lower in inc.description.lower()
        ]
        return {"query": query, "count": len(matches), "results": matches}
    finally:
        session.close()


@app.get("/incidents/{incident_id}")
def get_incident_details(incident_id: str):
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