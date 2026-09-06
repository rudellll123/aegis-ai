from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from knowledge_graph.service import Neo4jService


# Load environment variables from .env
load_dotenv()


# ---------------------------------------------------------
# Neo4j service
# ---------------------------------------------------------

neo4j_service = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global neo4j_service

    try:
        neo4j_service = Neo4jService()
        print("Neo4j service connected successfully.")
    except Exception as e:
        print(f"Neo4j connection failed: {e}")
        neo4j_service = None

    yield

    if neo4j_service is not None:
        neo4j_service.close()
        print("Neo4j service closed.")


# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------

app = FastAPI(
    title="Aegis AI Knowledge Graph API",
    description="FastAPI interface for the Aegis AI Neo4j Knowledge Graph",
    version="1.0.0",
    lifespan=lifespan,
)


# ---------------------------------------------------------
# Request models
# ---------------------------------------------------------

class LocationRequest(BaseModel):
    location: str


class QueryRequest(BaseModel):
    question: str
    location: str


# ---------------------------------------------------------
# Root endpoint
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "project": "Aegis AI",
        "component": "Knowledge Graph",
        "status": "running",
        "version": "1.0.0",
    }


# ---------------------------------------------------------
# Health check
# ---------------------------------------------------------

@app.get("/health")
def health():
    if neo4j_service is None:
        return {
            "status": "unhealthy",
            "neo4j": "disconnected",
        }

    return {
        "status": "healthy",
        "neo4j": "connected",
    }


# ---------------------------------------------------------
# Find incidents at a location
# ---------------------------------------------------------

@app.post("/incidents")
def find_incidents(request: LocationRequest):

    if neo4j_service is None:
        raise HTTPException(
            status_code=503,
            detail="Neo4j service is not available.",
        )

    location = request.location.strip()

    if not location:
        raise HTTPException(
            status_code=400,
            detail="Location cannot be empty.",
        )

    try:
        incidents = neo4j_service.find_incidents_at_location(location)

        return {
            "location": location,
            "count": len(incidents),
            "incidents": incidents,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve incidents: {str(e)}",
        )


# ---------------------------------------------------------
# Find people involved in high-severity incidents
# ---------------------------------------------------------

@app.post("/high-severity-people")
def find_high_severity_people(request: LocationRequest):

    if neo4j_service is None:
        raise HTTPException(
            status_code=503,
            detail="Neo4j service is not available.",
        )

    location = request.location.strip()

    if not location:
        raise HTTPException(
            status_code=400,
            detail="Location cannot be empty.",
        )

    try:
        people = neo4j_service.find_people_in_high_severity_incidents_at(
            location
        )

        return {
            "location": location,
            "count": len(people),
            "people": people,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve high-severity people: {str(e)}",
        )


# ---------------------------------------------------------
# Generic query endpoint
# ---------------------------------------------------------

@app.post("/query")
def query(request: QueryRequest):

    if neo4j_service is None:
        raise HTTPException(
            status_code=503,
            detail="Neo4j service is not available.",
        )

    question = request.question.strip()
    location = request.location.strip()

    if not question:
        raise HTTPException(
            status_code=400,
            detail="Question cannot be empty.",
        )

    if not location:
        raise HTTPException(
            status_code=400,
            detail="Location cannot be empty.",
        )

    question_lower = question.lower()

    try:

        # Incident query
        if "incident" in question_lower:
            result = neo4j_service.find_incidents_at_location(location)

            return {
                "question": question,
                "location": location,
                "tool": "find_incidents_at_location",
                "count": len(result),
                "results": result,
            }

        # High-severity people query
        if (
            "high severity" in question_lower
            or "high-severity" in question_lower
        ):
            result = (
                neo4j_service
                .find_people_in_high_severity_incidents_at(location)
            )

            return {
                "question": question,
                "location": location,
                "tool": "find_people_in_high_severity_incidents_at",
                "count": len(result),
                "results": result,
            }

        raise HTTPException(
            status_code=400,
            detail=(
                "Unsupported query. Currently supported queries are "
                "incidents and high-severity people."
            ),
        )

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Query failed: {str(e)}",
        )


# ---------------------------------------------------------
# API information
# ---------------------------------------------------------

@app.get("/api/info")
def api_info():
    return {
        "project": "Aegis AI",
        "component": "Knowledge Graph",
        "technology": "FastAPI + Neo4j",
        "endpoints": {
            "root": "GET /",
            "health": "GET /health",
            "incidents": "POST /incidents",
            "high_severity_people": "POST /high-severity-people",
            "query": "POST /query",
            "swagger": "GET /docs",
        },
    }