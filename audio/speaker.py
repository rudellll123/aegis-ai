import pyttsx3

def speak_text(text: str, output_path: str = None) -> str:
    """
    Converts text to speech. If output_path is given, saves audio to a file
    instead of playing it live - useful for an agent tool (can't play audio
    live from a backend process, but can produce a file the frontend plays).
    """
    engine = pyttsx3.init()

    if output_path:
        engine.save_to_file(text, output_path)
        engine.runAndWait()
        return output_path
    else:
        engine.say(text)
        engine.runAndWait()
        return "played live"

if __name__ == "__main__":
    import sys
    text = sys.argv[1] if len(sys.argv) > 1 else "This is a test of the AegisAI text to speech system."
    output = "test_audio/output_speech.wav"
    result = speak_text(text, output)
    print(f"Saved speech audio to: {result}")
