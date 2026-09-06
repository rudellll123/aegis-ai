import cv2
from ultralytics import YOLO
import supervision as sv

def track_video(video_path: str, output_path: str = "test_images/sample_video_annotated.mp4", max_frames: int = 150):
    """
    Runs YOLO detection + ByteTrack tracking on a video.
    max_frames caps processing so a CPU test run finishes quickly.
    Returns a list of per-frame evidence dicts.
    """
    model = YOLO("yolov8n.pt")
    tracker = sv.ByteTrack()
    box_annotator = sv.BoxAnnotator()
    label_annotator = sv.LabelAnnotator()

    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    evidence = []
    frame_number = 0

    while cap.isOpened() and frame_number < max_frames:
        ret, frame = cap.read()
        if not ret:
            break

        results = model(frame, verbose=False)[0]
        detections = sv.Detections.from_ultralytics(results)
        detections = tracker.update_with_detections(detections)

        objects_this_frame = []
        labels = []
        for xyxy, _, confidence, class_id, tracker_id, _ in detections:
            class_name = model.names[class_id]
            labels.append(f"#{tracker_id} {class_name} {confidence:.2f}")
            objects_this_frame.append({
                "track_id": int(tracker_id),
                "class": class_name,
                "confidence": round(float(confidence), 3),
                "bbox": [round(float(v), 1) for v in xyxy],
            })

        annotated = box_annotator.annotate(frame.copy(), detections=detections)
        annotated = label_annotator.annotate(annotated, detections=detections, labels=labels)
        writer.write(annotated)

        evidence.append({
            "frame_number": frame_number,
            "timestamp_sec": round(frame_number / fps, 2),
            "objects": objects_this_frame,
        })

        frame_number += 1

    cap.release()
    writer.release()
    return evidence


def detect_incident_objects(video_path: str) -> dict:
    """
    Agent tool: analyzes a video for incident evidence.
    Returns a structured summary an LLM agent can reason over -
    unique tracked objects, their classes, and when they appeared.
    """
    evidence = track_video(video_path)

    tracks = {}
    for frame in evidence:
        for obj in frame["objects"]:
            tid = obj["track_id"]
            if tid not in tracks:
                tracks[tid] = {
                    "track_id": tid,
                    "class": obj["class"],
                    "first_seen_sec": frame["timestamp_sec"],
                    "last_seen_sec": frame["timestamp_sec"],
                    "max_confidence": obj["confidence"],
                }
            else:
                tracks[tid]["last_seen_sec"] = frame["timestamp_sec"]
                tracks[tid]["max_confidence"] = max(tracks[tid]["max_confidence"], obj["confidence"])

    return {
        "video_path": video_path,
        "frames_analyzed": len(evidence),
        "unique_objects_tracked": len(tracks),
        "objects": list(tracks.values()),
    }


if __name__ == "__main__":
    result = detect_incident_objects("test_images/sample_video.avi")

    print(f"\nAnalyzed {result['frames_analyzed']} frames")
    print(f"Found {result['unique_objects_tracked']} unique tracked objects:\n")
    for obj in result["objects"]:
        duration = round(obj["last_seen_sec"] - obj["first_seen_sec"], 2)
        print(f"  - Track #{obj['track_id']}: {obj['class']} "
              f"(seen {obj['first_seen_sec']}s-{obj['last_seen_sec']}s, "
              f"duration {duration}s, max confidence {obj['max_confidence']})")

    print(f"\nAnnotated video saved to test_images/sample_video_annotated.mp4")
