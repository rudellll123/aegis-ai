# vision/schema.py

# Subset of COCO classes relevant to incident investigation.
# YOLOv8 pretrained on COCO can detect 80 classes total — this is the
# subset AegisAI actually cares about. Others get filtered out in detector.py.
ALLOWED_OBJECT_LABELS = {
    "person":         {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "car":            {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "truck":          {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "motorcycle":     {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "bicycle":        {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "backpack":       {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "handbag":        {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "suitcase":       {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "knife":          {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
    "fire hydrant":   {"required": ["label", "confidence", "bbox", "frame_timestamp"]},
}

ALLOWED_TRACK_STATUSES = {
    "ACTIVE",
    "LOST",
    "ENDED",
}

ALLOWED_ENTITY_TYPES = {
    "Detection": {
        "required": ["label", "confidence", "bbox", "frame_timestamp"]
    },
    "TrackedObject": {
        "required": ["track_id", "label", "first_seen", "last_seen"]
    },
    "VisionReport": {
        "required": ["video_path", "tracks", "evidence_frames", "descriptions"]
    },
}

MIN_CONFIDENCE_THRESHOLD = 0.5


def is_valid_object_label(label):
    return label in ALLOWED_OBJECT_LABELS


def is_valid_track_status(status):
    return status in ALLOWED_TRACK_STATUSES


def is_valid_entity_type(entity_type):
    return entity_type in ALLOWED_ENTITY_TYPES


def is_valid_confidence(confidence):
    return isinstance(confidence, (int, float)) and 0.0 <= confidence <= 1.0


def is_valid_bbox(bbox):
    return (
        isinstance(bbox, (tuple, list))
        and len(bbox) == 4
        and all(isinstance(v, (int, float)) for v in bbox)
    )


def required_fields_for(entity_type):
    return ALLOWED_ENTITY_TYPES.get(entity_type, {}).get("required", [])


def validate_detection(detection: dict):
    errors = []
    for field in required_fields_for("Detection"):
        if field not in detection:
            errors.append(f"missing field: {field}")

    if "label" in detection and not is_valid_object_label(detection["label"]):
        errors.append(f"unknown label: {detection['label']}")

    if "confidence" in detection and not is_valid_confidence(detection["confidence"]):
        errors.append(f"invalid confidence: {detection['confidence']}")

    if "bbox" in detection and not is_valid_bbox(detection["bbox"]):
        errors.append(f"invalid bbox: {detection['bbox']}")

    return (len(errors) == 0, errors)
