import cv2
import supervision as sv
from detector import _model, detect_objects

def track_video(video_path: str, max_frames: int = 150) -> list[dict]:
    tracker = sv.ByteTrack()
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25

    evidence = []
    frame_number = 0

    while cap.isOpened() and frame_number < max_frames:
        ret, frame = cap.read()
        if not ret:
            break

        timestamp = round(frame_number / fps, 2)
        results = _model(frame, verbose=False)[0]
        detections = sv.Detections.from_ultralytics(results)
        detections = tracker.update_with_detections(detections)

        from schema import ALLOWED_OBJECT_LABELS, MIN_CONFIDENCE_THRESHOLD
        objects_this_frame = []
        for xyxy, _, confidence, class_id, tracker_id, _ in detections:
            label = _model.names[class_id]
            if label not in ALLOWED_OBJECT_LABELS or confidence < MIN_CONFIDENCE_THRESHOLD:
                continue
            objects_this_frame.append({
                "track_id": int(tracker_id),
                "label": label,
                "confidence": round(float(confidence), 4),
                "bbox": tuple(int(v) for v in xyxy),
            })

        evidence.append({
            "frame_number": frame_number,
            "timestamp": timestamp,
            "objects": objects_this_frame,
        })
        frame_number += 1

    cap.release()
    return evidence

def summarize_tracked_objects(video_path: str) -> dict:
    evidence = track_video(video_path)
    tracks = {}

    for frame in evidence:
        for obj in frame["objects"]:
            tid = obj["track_id"]
            if tid not in tracks:
                tracks[tid] = {
                    "track_id": tid,
                    "label": obj["label"],
                    "first_seen": frame["timestamp"],
                    "last_seen": frame["timestamp"],
                    "max_confidence": obj["confidence"],
                }
            else:
                tracks[tid]["last_seen"] = frame["timestamp"]
                tracks[tid]["max_confidence"] = max(tracks[tid]["max_confidence"], obj["confidence"])

    return {
        "video_path": video_path,
        "frames_analyzed": len(evidence),
        "unique_objects": len(tracks),
        "tracks": list(tracks.values()),
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python tracker.py <video_path>")
    else:
        result = summarize_tracked_objects(sys.argv[1])
        frames_analyzed = result["frames_analyzed"]
        unique_objects = result["unique_objects"]
        print(f"\nAnalyzed {frames_analyzed} frames, found {unique_objects} tracked objects:\n")
        for t in result["tracks"]:
            duration = round(t["last_seen"] - t["first_seen"], 2)
            print(f"  Track #{t['track_id']}: {t['label']} "
                  f"({t['first_seen']}s-{t['last_seen']}s, duration {duration}s, "
                  f"max confidence {t['max_confidence']})")
