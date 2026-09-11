"""
Phase 7 - Celery app definition.

Uses the aegis-redis Docker container as both the message broker and the
result backend. include=["tasks"] tells Celery to import tasks.py so its
@celery_app.task-decorated functions get registered.
"""

from celery import Celery

celery_app = Celery(
    "aegisai",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0",
    include=["tasks"],
)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    result_expires=3600,
)
