from ultralytics import YOLO
from vision.schema import ALLOWED_OBJECT_LABELS, MIN_CONFIDENCE_THRESHOLD

_model = YOLO("yolov8n.pt")


def detect_objects(frame_path: str, frame_timestamp: float = 0.0) -> list[dict]:
    results = _model(frame_path, verbose=False)[0]

    print(f"DEBUG: raw boxes detected = {len(results.boxes)}")
    for box in results.boxes:
        label = _model.names[int(box.cls[0])]
        conf = float(box.conf[0])
        print(f"DEBUG: found '{label}' at confidence {conf:.3f}")

    detections = []
    for box in results.boxes:
        label = _model.names[int(box.cls[0])]
        confidence = float(box.conf[0])

        if label not in ALLOWED_OBJECT_LABELS:
            continue
        if confidence < MIN_CONFIDENCE_THRESHOLD:
            continue

        x1, y1, x2, y2 = box.xyxy[0].tolist()

        detections.append({
            "label": label,
            "confidence": round(confidence, 4),
            "bbox": (int(x1), int(y1), int(x2), int(y2)),
            "frame_timestamp": frame_timestamp,
        })

    return detections


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python vision/detector.py <frame_path>")
    else:
        result = detect_objects(sys.argv[1])
        print(f"\nFinal filtered detections: {len(result)}")
        for d in result:
            print(d)
