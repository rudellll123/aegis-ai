import base64
import requests

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "moondream"


def describe_scene(frame_path, detections=None):
    with open(frame_path, "rb") as f:
        image_data = base64.standard_b64encode(f.read()).decode("utf-8")

    context_line = ""
    if detections:
        labels = ", ".join(sorted(set(d["label"] for d in detections)))
        context_line = f"Objects already detected in this frame: {labels}. "

    prompt = (
        context_line +
        "Describe what is happening in this scene in 1-2 concise sentences, "
        "as if writing a note for an incident investigation report. "
        "Focus on actions, positions, and anything unusual or notable."
    )

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": MODEL_NAME,
            "prompt": prompt,
            "images": [image_data],
            "stream": False,
        },
        timeout=120,
    )
    response.raise_for_status()
    result = response.json()

    return result.get("response", "").strip()


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python -m vision.scene_reasoner <frame_path>")
    else:
        description = describe_scene(sys.argv[1])
        print("Scene description:")
        print(description)
