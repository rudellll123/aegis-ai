import os

FFMPEG_DIR = r"C:\Users\rahul jha\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.1-full_build\bin"
if FFMPEG_DIR not in os.environ["PATH"]:
    os.environ["PATH"] += os.pathsep + FFMPEG_DIR

import whisper

_model = whisper.load_model("base")

def transcribe_audio(audio_path: str) -> dict:
    result = _model.transcribe(audio_path)
    return {
        "text": result["text"].strip(),
        "language": result["language"],
        "segments": [
            {
                "start": round(seg["start"], 2),
                "end": round(seg["end"], 2),
                "text": seg["text"].strip(),
            }
            for seg in result["segments"]
        ],
    }

if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: python transcriber.py <audio_path>")
    else:
        result = transcribe_audio(sys.argv[1])
        print(f"\nDetected language: {result['language']}")
        print(f"Full transcript: {result['text']}\n")
        print("Segments:")
        for seg in result["segments"]:
            print(f"  [{seg['start']}s - {seg['end']}s] {seg['text']}")
