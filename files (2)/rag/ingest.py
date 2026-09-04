import os
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
from documents import DOCUMENTS

COLLECTION = "aegis_evidence"
model = SentenceTransformer("all-MiniLM-L6-v2")

_RAG_DIR = os.path.dirname(os.path.abspath(__file__))
client = QdrantClient(path=os.path.join(_RAG_DIR, "qdrant_data"))

client.recreate_collection(
    collection_name=COLLECTION,
    vectors_config=VectorParams(size=384, distance=Distance.COSINE),
)

points = []
for i, doc in enumerate(DOCUMENTS):
    vector = model.encode(doc["text"]).tolist()
    points.append(PointStruct(
        id=i,
        vector=vector,
        payload={"text": doc["text"], "doc_id": doc["id"], **doc["metadata"]},
    ))

client.upsert(collection_name=COLLECTION, points=points)
print(f"Ingested {len(points)} documents into '{COLLECTION}'")