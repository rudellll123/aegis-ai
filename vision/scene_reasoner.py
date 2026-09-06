import ollama

def describe_scene(image_path: str, question: str = None) -> str:
    """
    Uses a local vision-language model (moondream) to produce a natural-
    language description of a scene - complements YOLO's object list with
    contextual/situational understanding an investigator would care about.
    """
    if question is None:
        question = (
            "Describe what is happening in this scene. Focus on people, "
            "vehicles, equipment, and anything that looks safety-relevant. "
            "Be factual and specific, not speculative."
        )

    response = ollama.generate(
        model="moondream",
        prompt=question,
        images=[image_path],
    )
    return response["response"].strip()


if __name__ == "__main__":
    import sys
    image_path = sys.argv[1] if len(sys.argv) > 1 else "test_images/sample1.jpg"
    description = describe_scene(image_path)
    print(f"\nScene description for {image_path}:\n")
    print(description)
