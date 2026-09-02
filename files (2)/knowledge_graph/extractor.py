import json
import requests

OLLAMA_URL = "http://localhost:11434/api/chat"
OLLAMA_MODEL = "llama3.1"

EXTRACTION_SYSTEM_PROMPT = (
    "You are an entity and relationship extractor for AegisAI, "
    "an incident investigation system. Given a raw incident report, extract entities and "
    "relationships as JSON ONLY -- no preamble, no markdown fences, no explanation.

"
    "Allowed entity types: Person, Incident, Location, Camera, Policy, Document
"
    "Allowed relationship types: INVOLVED_IN, OCCURRED_AT, DETECTED_BY, VIOLATES, MENTIONED_IN, SIMILAR_TO

"
    "Output must match this exact JSON shape:
"
    "{
"
    "  ""entities"": [
"
    "    {""type"": ""Person"", ""id"": ""P001"", ""name"": ""Worker 001""}
"
    "  ],
"
    "  ""relationships"": [
"
    "    {""source"": ""P001"", ""type"": ""INVOLVED_IN"", ""target"": ""INC001""}
"
    "  ]
"
    "}

"
    "Rules:
"
    "- Invent stable, short IDs (P001, INC001, SITE001, CAM03, POL001) if the text does not give one.
"
    "- Reuse the SAME id for the same real-world entity if it is mentioned more than once.
"
    "- Every Incident needs: id, type, severity (LOW/MEDIUM/HIGH/CRITICAL), timestamp (ISO 8601).
"
    "- If you are not confident about an entity or relationship, omit it rather than guessing.
"
    "- Return ONLY the JSON object. Nothing else.
"
)


def extract_from_text(incident_text):
    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": EXTRACTION_SYSTEM_PROMPT},
            {"role": "user", "content": incident_text},
        ],
        "format": "json",
        "stream": False,
    }

    response = requests.post(OLLAMA_URL, json=payload, timeout=120)
    response.raise_for_status()
    data = response.json()

    raw_text = data.get("message", {}).get("content", "").strip()

    if raw_text.startswith("```"):
        raw_text = raw_text.strip("```")
        if raw_text.lower().startswith("json"):
            raw_text = raw_text[4:].strip()

    try:
        return json.loads(raw_text)
    except json.JSONDecodeError as e:
        raise ValueError("Extractor did not return valid JSON: " + str(e))
