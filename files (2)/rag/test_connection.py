from neo4j import GraphDatabase

URI = "neo4j+s://b43cff9b.databases.neo4j.io"
USERNAME = "neo4j"
PASSWORD = "QLeuD5yJb7bpwEUGxcOI0m0Yy7blh67JVsBnvdHZhY8"

try:
    driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))
    driver.verify_connectivity()
    print("SUCCESS: connected to Neo4j Aura instance.")
    driver.close()
except Exception as e:
    print("FAILED:", type(e).__name__, "-", e)from neo4j import GraphDatabase

URI = "neo4j+s://b43cff9b.databases.neo4j.io"
USERNAME = "neo4j"
PASSWORD = "PASTE_YOUR_PASSWORD_HERE"

try:
    driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))
    driver.verify_connectivity()
    print("SUCCESS: connected to Neo4j Aura instance.")
    driver.close()
except Exception as e:
    print("FAILED:", type(e).__name__, "-", e)