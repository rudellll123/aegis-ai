from ultralytics import YOLO
from vision.schema import ALLOWED_OBJECT_LABELS, MIN_CONFIDENCE_THRESHOLD

_model = YOLO("yolov8n.pt")


def track_objects(video_path: str) -> list[dict]:
    results = _model.track(
        source=video_path,
        tracker="bytetrack.yaml",
        persist=True,
        verbose=False,
        stream=True,
    )

    tracks: dict[int, dict] = {}

    for frame_idx, frame_result in enumerate(results):
        if frame_result.boxes.id is None:
            continue

        timestamp = frame_idx / 30.0

        for box in frame_result.boxes:
            label = _model.names[int(box.cls[0])]
            confidence = float(box.conf[0])
            track_id = int(box.id[0])

            if label not in ALLOWED_OBJECT_LABELS:
                continue
            if confidence < MIN_CONFIDENCE_THRESHOLD:
                continue

            if track_id not in tracks:
                tracks[track_id] = {
                    "track_id": track_id,
                    "label": label,
                    "first_seen": timestamp,
                    "last_seen": timestamp,
                }
            else:
                tracks[track_id]["last_seen"] = timestamp

    return list(tracks.values())


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python -m vision.tracker <video_path>")
    else:
        result = track_objects(sys.argv[1])
        print(f"Total tracked objects: {len(result)}")
        for t in result:
            print(t)
