from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

COLLECTION = "aegis_evidence"
client = QdrantClient(path="./qdrant_data")
model = SentenceTransformer("all-MiniLM-L6-v2")

def dense_search(query: str, top_k: int = 5, category: str = None):
    query_vector = model.encode(query).tolist()
    filter_ = None
    if category:
        from qdrant_client.models import Filter, FieldCondition, MatchValue
        filter_ = Filter(must=[FieldCondition(key="category", match=MatchValue(value=category))])

    results = client.query_points(
        collection_name=COLLECTION,
        query=query_vector,
        query_filter=filter_,
        limit=top_k,
    ).points
    return [{"text": r.payload["text"], "doc_id": r.payload["doc_id"], "score": r.score} for r in results]

if __name__ == "__main__":
    results = dense_search("safety violation near machinery")
    for r in results:
        print(f"[{r['score']:.3f}] {r['doc_id']}: {r['text'][:80]}...")