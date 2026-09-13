# Phase 10 - Lightweight Dockerfile for the deployed FastAPI service (api.py).
# Deliberately excludes torch/whisper/ultralytics/sentence-transformers -
# those are used by the full local agent (agent.py) but would need
# several GB of RAM to load, far beyond a free-tier deployment's limits.
# This image only needs FastAPI + SQLAlchemy + psycopg2.

FROM python:3.11-slim

WORKDIR /app

COPY requirements-api.txt .
RUN pip install --no-cache-dir --break-system-packages -r requirements-api.txt

COPY api.py db.py ./

EXPOSE 8000

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
