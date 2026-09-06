from dotenv import load_dotenv
load_dotenv()

from .extractor import extract_from_text
from .validation import validate_extraction
from .service import Neo4jService


def ingest_incident_text(incident_text, neo4j_service):
    raw = extract_from_text(incident_text)
    valid_entities, valid_relationships = validate_extraction(raw)

    for entity in valid_entities:
        neo4j_service.upsert_entity(entity)

    for rel in valid_relationships:
        neo4j_service.upsert_relationship(rel["source"], rel["type"], rel["target"])

    summary = {
        "raw_entity_count": len(raw.get("entities", [])),
        "raw_relationship_count": len(raw.get("relationships", [])),
        "valid_entity_count": len(valid_entities),
        "valid_relationship_count": len(valid_relationships),
        "entities_written": [e["id"] for e in valid_entities],
        "relationships_written": [(r["source"], r["type"], r["target"]) for r in valid_relationships],
    }
    return summary


if __name__ == "__main__":
    test_text = (
        "At 15:10, Worker 003 was observed at Construction Site B without "
        "a safety harness while working at height. Camera CAM07 captured "
        "the event. The incident violated Fall Protection Policy FALL001."
    )

    service = Neo4jService()
    try:
        result = ingest_incident_text(test_text, service)
        print("Ingestion summary:")
        for k, v in result.items():
            print("  " + str(k) + ": " + str(v))
    finally:
        service.close()
