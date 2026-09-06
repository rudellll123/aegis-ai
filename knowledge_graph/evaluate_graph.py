from dotenv import load_dotenv
load_dotenv()

from agents.graph.graph_agent import KnowledgeAgent


TEST_CASES = [
    {
        "question": "incidents at Construction Site A",
        "tool": "find_incidents_at_location",
        "location": "Construction Site A",
        "expected_incident_ids": {"INC001", "INC002"},
    },
    {
        "question": "high severity people at Construction Site A",
        "tool": "find_high_severity_people_at_location",
        "location": "Construction Site A",
        "expected_person_ids": {"P001", "P002"},
    },
]


def run_evaluation():
    agent = KnowledgeAgent()
    passed = 0
    total = len(TEST_CASES)

    try:
        for case in TEST_CASES:
            if case["tool"] == "find_incidents_at_location":
                result = agent.tool_find_incidents_at_location(case["location"])
                got_ids = {i["incident_id"] for i in result["incidents"]}
                expected_ids = case["expected_incident_ids"]
                ok = got_ids == expected_ids

            elif case["tool"] == "find_high_severity_people_at_location":
                result = agent.tool_find_high_severity_people_at_location(case["location"])
                got_ids = {r["person_id"] for r in result["results"]}
                expected_ids = case["expected_person_ids"]
                ok = got_ids == expected_ids

            else:
                ok = False
                got_ids = set()
                expected_ids = set()

            status = "PASS" if ok else "FAIL"
            if ok:
                passed += 1
            print(f"[{status}] '{case['question']}' -> expected {expected_ids}, got {got_ids}")

        accuracy = (passed / total) * 100 if total else 0
        print()
        print(f"Accuracy: {passed}/{total} = {accuracy:.0f}%")
    finally:
        agent.close()


if __name__ == "__main__":
    run_evaluation()
