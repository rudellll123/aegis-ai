"""
Phase 8 - Latency benchmark.

Times each tool independently, using realistic inputs already used
throughout earlier phases. Helps answer "how fast is each capability"
with real numbers instead of a guess, and flags which tools are the
best candidates for the async/background pattern introduced in Phase 7.
"""

import time
import sys, os
sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from tools import search_incidents, get_incident_details, search_evidence, analyze_incident_video, transcribe_incident_report

BENCHMARKS = [
    ("search_incidents", lambda: search_incidents.invoke("forklift")),
    ("get_incident_details", lambda: get_incident_details.invoke("INC-1001")),
    ("search_evidence", lambda: search_evidence.invoke("PPE requirements")),
    ("transcribe_incident_report", lambda: transcribe_incident_report.invoke("audio/test_audio/sample1.wav")),
    ("analyze_incident_video (sync)", lambda: analyze_incident_video.invoke("vision/test_images/sample_video.avi")),
]

print(f"{'Tool':<32} {'Time (s)':<10}")
print("-" * 42)
for name, fn in BENCHMARKS:
    start = time.perf_counter()
    fn()
    elapsed = time.perf_counter() - start
    flag = "  <-- consider async (Phase 7)" if elapsed > 5 else ""
    print(f"{name:<32} {elapsed:<10.2f}{flag}")
