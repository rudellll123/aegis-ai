from .schema import (
    is_valid_entity_type,
    is_valid_relationship_type,
    required_fields_for,
    ALLOWED_SEVERITIES,
)


class ValidationError(Exception):
    pass


def validate_extraction(data):
    entities = data.get("entities", [])
    relationships = data.get("relationships", [])

    valid_entities = []
    valid_entity_ids = set()

    for ent in entities:
        entity_type = ent.get("type")
        entity_id = ent.get("id")

        if not is_valid_entity_type(entity_type):
            print("[validation] dropped entity, unknown type: " + str(ent))
            continue

        missing = [f for f in required_fields_for(entity_type) if f not in ent]
        if missing:
            print("[validation] dropped entity, missing fields " + str(missing) + ": " + str(ent))
            continue

        if entity_type == "Incident" and ent.get("severity") not in ALLOWED_SEVERITIES:
            print("[validation] dropped incident, invalid severity: " + str(ent))
            continue

        if not entity_id or not isinstance(entity_id, str):
            print("[validation] dropped entity, missing/invalid id: " + str(ent))
            continue

        valid_entities.append(ent)
        valid_entity_ids.add(entity_id)

    valid_relationships = []
    for rel in relationships:
        rel_type = rel.get("type")
        source = rel.get("source")
        target = rel.get("target")

        if not is_valid_relationship_type(rel_type):
            print("[validation] dropped relationship, unknown type: " + str(rel))
            continue

        if source not in valid_entity_ids or target not in valid_entity_ids:
            print("[validation] dropped relationship, source/target not a valid entity: " + str(rel))
            continue

        valid_relationships.append(rel)

    return valid_entities, valid_relationships
