"""
Phase 9 - Prometheus metrics for tool calls.

track_metrics wraps a tool function to record a call counter (labeled
by success/error) and a latency histogram, both labeled by tool name.
start_metrics_server exposes them on an HTTP endpoint for Prometheus
to scrape - called once by whichever process is actually serving
requests (agent.py, mcp_server/incident_server.py), not by one-off
scripts, so the metrics reflect real usage.
"""

import time
import functools
from prometheus_client import Counter, Histogram, start_http_server

TOOL_CALLS = Counter(
    "aegisai_tool_calls_total", "Total number of tool calls", ["tool_name", "status"]
)
TOOL_LATENCY = Histogram(
    "aegisai_tool_latency_seconds", "Tool call latency in seconds", ["tool_name"]
)


def track_metrics(tool_name):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.perf_counter()
            try:
                result = func(*args, **kwargs)
                TOOL_CALLS.labels(tool_name=tool_name, status="success").inc()
                return result
            except Exception:
                TOOL_CALLS.labels(tool_name=tool_name, status="error").inc()
                raise
            finally:
                TOOL_LATENCY.labels(tool_name=tool_name).observe(time.perf_counter() - start)
        return wrapper
    return decorator


def start_metrics_server(port=8001):
    start_http_server(port)
    print(f"Prometheus metrics available at http://localhost:{port}/metrics")
