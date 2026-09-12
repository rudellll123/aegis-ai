"""
Phase 9 debug helper - directly calls MCP tools in a loop for ~90 seconds,
without the Inspector UI or an LLM. Keeps the metrics server alive long
enough for Prometheus's 5s scrape interval to reliably catch real data,
unlike a one-shot script that exits before you can check the dashboard.
"""
import asyncio
import time
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

CALLS = [
    ("search_incidents", {"query": "forklift"}),
    ("search_incidents", {"query": "chemical"}),
    ("get_incident_details", {"incident_id": "INC-1001"}),
    ("get_incident_details", {"incident_id": "INC-1002"}),
    ("search_evidence", {"query": "PPE requirements"}),
    ("search_evidence", {"query": "vehicle clearance distance"}),
]

async def main():
    server_params = StdioServerParameters(
        command="python",
        args=["mcp_server/incident_server.py"],
    )
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print("Connected. Metrics server is live on :8001.")
            print("Looping tool calls for ~90 seconds - check Grafana/Prometheus now.\n")
            end_time = time.time() + 90
            round_num = 1
            while time.time() < end_time:
                print(f"--- round {round_num} ---")
                for tool_name, args in CALLS:
                    result = await session.call_tool(tool_name, args)
                    status = "ERROR" if result.isError else "OK"
                    print(f"[{status}] {tool_name}({args})")
                round_num += 1
                await asyncio.sleep(3)
            print("\nDone - server shutting down now.")

asyncio.run(main())
