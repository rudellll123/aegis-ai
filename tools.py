from langchain_core.tools import tool

# Mock database simulating incident log records
INCIDENT_DATABASE = [
    {
        "id": "INC-1001",
        "title": "Forklift near-miss in Loading Dock B",
        "severity": "Low",
        "description": "A forklift reversed unexpectedly without its backup alarm sounding. Nearby pedestrian stepped back safely.",
        "date": "2026-08-30"
    },
    {
        "id": "INC-1002",
        "title": "Minor chemical spill in Mixing Lab",
        "severity": "Medium",
        "description": "Approximately 500ml of cleaning solvent leaked from an unsecured container. Cleaned using standard spill kit.",
        "date": "2026-08-31"
    }
]

@tool
def search_incidents(query: str) -> str:
    """Search for historical incident summaries matching a keyword query."""
    query_lower = query.lower()
    matches = [
        f"[{inc['id']}] {inc['title']} (Severity: {inc['severity']})"
        for inc in INCIDENT_DATABASE
        if query_lower in inc["title"].lower() or query_lower in inc["description"].lower()
    ]
    if not matches:
        return f"No incidents found matching query: '{query}'"
    return "\n".join(matches)

@tool
def get_incident_details(incident_id: str) -> str:
    """Retrieve full diagnostic logs and metadata details for a specific incident ID."""
    for inc in INCIDENT_DATABASE:
        if inc["id"].upper() == incident_id.upper():
            return (
                f"ID: {inc['id']}\nTitle: {inc['title']}\nSeverity: {inc['severity']}\n"
                f"Date: {inc['date']}\nFull Description: {inc['description']}"
            )
    return f"Incident ID '{incident_id}' not found in database records."

# Export both investigation tools exactly as required by agent.py
ALL_TOOLS = [search_incidents, get_incident_details]
