from ultralytics import YOLO
import cv2

def run_detection(image_path: str):
    model = YOLO("yolov8n.pt")
    results = model(image_path)

    detections = []
    for r in results:
        for box in r.boxes:
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]
            confidence = float(box.conf[0])
            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "class": class_name,
                "confidence": round(confidence, 3),
                "bbox": [round(x1, 1), round(y1, 1), round(x2, 1), round(y2, 1)],
            })

    return detections, results

if __name__ == "__main__":
    image_path = "test_images/sample1.jpg"
    detections, results = run_detection(image_path)

    print(f"\nFound {len(detections)} objects:")
    for d in detections:
        print(f"  - {d['class']} (confidence: {d['confidence']}) at {d['bbox']}")

    annotated = results[0].plot()
    cv2.imwrite("test_images/sample1_annotated.jpg", annotated)
    print("\nAnnotated image saved to test_images/sample1_annotated.jpg")
