"""
Phase 7 - Celery tasks.

analyze_video_task wraps the same vision pipeline used by the
synchronous analyze_incident_video tool (vision/tracker.py), but runs
it as a background job instead of blocking the agent.
"""

import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "vision"))

from celery_app import celery_app
from tracker import summarize_tracked_objects


@celery_app.task(name="analyze_video_task")
def analyze_video_task(video_path: str) -> dict:
    return summarize_tracked_objects(video_path)
