"""
Phase 9 - OpenTelemetry tracing for the agent + tool call path.

Uses a ConsoleSpanExporter rather than a Jaeger/Tempo backend, since
this environment is already tight on RAM (Docker + WSL2 overhead ate
most of a 7.8GB machine's free memory during this phase). Every span
still carries real timing and attributes - it just prints to stdout/
stderr instead of a separate UI.

Known limitation: trace context is not propagated across the MCP
protocol boundary between agent.py and mcp_server/incident_server.py -
they are separate OS processes started independently, and correlating
their spans into a single end-to-end trace would need context
propagation added to the MCP call itself. Each side's spans are
correct and real, just not yet linked into one unified trace.
"""

import sys
import functools
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter

_provider = TracerProvider()
_provider.add_span_processor(BatchSpanProcessor(ConsoleSpanExporter(out=sys.stderr)))
trace.set_tracer_provider(_provider)

tracer = trace.get_tracer("aegisai")


def trace_tool(tool_name):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            with tracer.start_as_current_span(f"tool.{tool_name}") as span:
                span.set_attribute("tool.name", tool_name)
                span.set_attribute("tool.args", str(kwargs) if kwargs else str(args))
                try:
                    result = func(*args, **kwargs)
                    span.set_attribute("tool.status", "success")
                    return result
                except Exception as e:
                    span.set_attribute("tool.status", "error")
                    span.record_exception(e)
                    raise
        return wrapper
    return decorator
