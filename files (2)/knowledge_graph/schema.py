
ALLOWED_ENTITY_TYPES = {
    "Person":   {"required": ["id", "name"]},
    "Incident": {"required": ["id", "type", "severity", "timestamp"]},
    "Location": {"required": ["id", "name"]},
    "Camera":   {"required": ["id", "name"]},
    "Policy":   {"required": ["id", "name"]},
    "Document": {"required": ["id", "title"]},
}

ALLOWED_RELATIONSHIP_TYPES = {
    "INVOLVED_IN",
    "OCCURRED_AT",
    "DETECTED_BY",
    "VIOLATES",
    "MENTIONED_IN",
    "SIMILAR_TO",
}

ALLOWED_SEVERITIES = {"LOW", "MEDIUM", "HIGH", "CRITICAL"}


def is_valid_entity_type(entity_type):
    return entity_type in ALLOWED_ENTITY_TYPES


def is_valid_relationship_type(rel_type):
    return rel_type in ALLOWED_RELATIONSHIP_TYPES


def required_fields_for(entity_type):
    return ALLOWED_ENTITY_TYPES.get(entity_type, {}).get("required", [])
