import os
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer, CrossEncoder
from rank_bm25 import BM25Okapi
from documents import DOCUMENTS

COLLECTION = "aegis_evidence"

_RAG_DIR = os.path.dirname(os.path.abspath(__file__))
client = QdrantClient(path=os.path.join(_RAG_DIR, "qdrant_data"))
model = SentenceTransformer("all-MiniLM-L6-v2")

_corpus_texts = [d["text"] for d in DOCUMENTS]
_bm25 = BM25Okapi([t.lower().split() for t in _corpus_texts])
_reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")


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


def bm25_search(query: str, top_k: int = 5):
    scores = _bm25.get_scores(query.lower().split())
    ranked = sorted(zip(DOCUMENTS, scores), key=lambda x: x[1], reverse=True)[:top_k]
    return [{"text": d["text"], "doc_id": d["id"], "score": float(s)} for d, s in ranked]


def hybrid_search(query: str, top_k: int = 5):
    dense = dense_search(query, top_k=10)
    sparse = bm25_search(query, top_k=10)

    scores = {}
    for rank, r in enumerate(dense):
        scores[r["doc_id"]] = scores.get(r["doc_id"], 0) + 1 / (60 + rank)
    for rank, r in enumerate(sparse):
        scores[r["doc_id"]] = scores.get(r["doc_id"], 0) + 1 / (60 + rank)

    by_id = {d["id"]: d for d in DOCUMENTS}
    fused = sorted(scores.items(), key=lambda x: x[1], reverse=True)[:top_k]
    return [{"text": by_id[doc_id]["text"], "doc_id": doc_id, "score": s} for doc_id, s in fused]


def rerank(query: str, candidates: list, top_k: int = 3):
    pairs = [[query, c["text"]] for c in candidates]
    scores = _reranker.predict(pairs)
    for c, s in zip(candidates, scores):
        c["rerank_score"] = float(s)
    return sorted(candidates, key=lambda c: c["rerank_score"], reverse=True)[:top_k]


if __name__ == "__main__":
    print("--- Dense search ---")
    for r in dense_search("safety violation near machinery"):
        print(f"[{r['score']:.3f}] {r['doc_id']}: {r['text'][:80]}...")

    print("\n--- BM25 search ---")
    for r in bm25_search("INC-1002 forklift"):
        print(f"[{r['score']:.3f}] {r['doc_id']}: {r['text'][:80]}...")

    print("\n--- Hybrid search ---")
    for r in hybrid_search("forklift safety violation"):
        print(f"[{r['score']:.4f}] {r['doc_id']}: {r['text'][:80]}...")

    print("\n--- Reranked ---")
    candidates = hybrid_search("forklift safety violation", top_k=10)
    for r in rerank("forklift safety violation", candidates):
        print(f"[{r['rerank_score']:.3f}] {r['doc_id']}: {r['text'][:80]}...")