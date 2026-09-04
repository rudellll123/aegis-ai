from dotenv import load_dotenv
load_dotenv()
from knowledge_graph.service import Neo4jService


class KnowledgeAgent:
    """
    The Knowledge Agent performs relationship-aware retrieval over the graph.
    It exposes only safe, parameterized, allow-listed operations as tools --
    an LLM never generates raw Cypher against this agent. Each method here
    corresponds to one "tool" the Supervisor Agent can call.
    """

    def __init__(self, neo4j_service=None):
        self.service = neo4j_service or Neo4jService()

    def close(self):
        self.service.close()

    def tool_find_incidents_at_location(self, location_name):
        """
        Tool: find_incidents_at_location
        Answers: "What incidents happened at <location>?"
        """
        results = self.service.find_incidents_at_location(location_name)
        return {
            "tool": "find_incidents_at_location",
            "location": location_name,
            "incident_count": len(results),
            "incidents": results,
        }

    def tool_find_high_severity_people_at_location(self, location_name):
        """
        Tool: find_high_severity_people_at_location
        Answers: "Who was involved in high-severity incidents at <location>?"
        This is a multi-hop query: Person -> Incident -> Location.
        """
        results = self.service.find_people_in_high_severity_incidents_at(location_name)
        return {
            "tool": "find_high_severity_people_at_location",
            "location": location_name,
            "result_count": len(results),
            "results": results,
        }

    def answer_question(self, question, location_hint=None):
        """
        Very simple router: given a natural-language question and an optional
        location hint (extracted upstream by the Supervisor/NLU step), picks
        which safe tool to call. This is intentionally simple -- a real
        Supervisor Agent would use an LLM with tool-calling to pick the tool,
        but the tool itself must remain one of the fixed, safe methods above,
        never freeform Cypher.
        """
        if location_hint is None:
            return {"error": "No location identified in the question."}

        question_lower = question.lower()
        if "high" in question_lower or "severe" in question_lower or "severity" in question_lower:
            return self.tool_find_high_severity_people_at_location(location_hint)
        return self.tool_find_incidents_at_location(location_hint)


if __name__ == "__main__":
    agent = KnowledgeAgent()
    try:
        print("Test 1: incidents at Construction Site A")
        result1 = agent.tool_find_incidents_at_location("Construction Site A")
        print(result1)

        print()
        print("Test 2: high-severity people at Construction Site A")
        result2 = agent.tool_find_high_severity_people_at_location("Construction Site A")
        print(result2)
    finally:
        agent.close()

