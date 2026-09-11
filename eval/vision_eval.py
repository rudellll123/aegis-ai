"""
Phase 8 - Vision detection accuracy eval.

Checks YOLOv8 detection counts against known ground truth for the two
test assets used throughout Phase 4 - the Ultralytics bus.jpg demo
image and the OpenCV sample pedestrian-walkway video. Also records the
known truck/car false positive as an expected (documented) failure
rather than treating it as a silent miss.

Note: "bus" is deliberately not in vision/schema.py's allow-list (only
person, truck, car, bicycle, motorcycle, backpack, handbag, suitcase
are incident-relevant), so detect_objects() correctly filters buses
out even though YOLO's raw model would detect one. That is confirmed
here as intended allow-list behavior, not a detection failure.
"""

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "vision"))

from detector import detect_objects
from tracker import summarize_tracked_objects

print("=== Image detection: sample1.jpg (expected: 3 people; bus filtered by allow-list) ===")
detections = detect_objects("vision/test_images/sample1.jpg")
counts = {}
for d in detections:
    counts[d["label"]] = counts.get(d["label"], 0) + 1
print(f"Detected (post allow-list): {counts}")
people_ok = counts.get("person", 0) == 3
bus_correctly_filtered = counts.get("bus", 0) == 0
print(f"[{'PASS' if people_ok else 'FAIL'}] person count == 3")
print(f"[{'PASS' if bus_correctly_filtered else 'FAIL'}] bus correctly filtered out (not in allow-list)")

print("\n=== Video tracking: sample_video.avi ===")
result = summarize_tracked_objects("vision/test_images/sample_video.avi")
labels = [t["label"] for t in result["tracks"]]
person_tracks = labels.count("person")
print(f"Frames analyzed: {result['frames_analyzed']}, unique tracked objects: {result['unique_objects']}")
print(f"Person tracks: {person_tracks}")
print(f"[{'PASS' if person_tracks >= 10 else 'FAIL'}] person tracks >= 10 (multiple pedestrians expected)")

has_known_fp = "truck" in labels and "car" in labels
print(f"[{'DOCUMENTED' if has_known_fp else 'NOT REPRODUCED'}] known static-background truck/car false positive")
