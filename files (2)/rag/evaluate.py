from retrieve import hybrid_search, rerank

TEST_CASES = [
    ("forklift near walkway", "incident-1002"),
    ("worker without hard hat", "incident-1001"),
    ("PPE requirements", "policy-001"),
    ("vehicle clearance distance", "policy-002"),
]

hits = 0
for query, expected_id in TEST_CASES:
    candidates = hybrid_search(query, top_k=10)
    top = rerank(query, candidates, top_k=3)
    found = any(c["doc_id"] == expected_id for c in top)
    status = "PASS" if found else "FAIL"
    print(f"[{status}] '{query}' -> expected {expected_id}, top-3: {[c['doc_id'] for c in top]}")
    hits += found

print(f"\nPrecision@3: {hits}/{len(TEST_CASES)} = {hits/len(TEST_CASES)*100:.0f}%")
