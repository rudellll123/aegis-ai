import os
from neo4j import GraphDatabase


class Neo4jService:
    def __init__(self, uri=None, username=None, password=None):
        uri = uri or os.environ["NEO4J_URI"]
        username = username or os.environ["NEO4J_USERNAME"]
        password = password or os.environ["NEO4J_PASSWORD"]
        self.driver = GraphDatabase.driver(uri, auth=(username, password))

    def close(self):
        self.driver.close()

    def upsert_entity(self, entity):
        entity_type = entity["type"]
        entity_id = entity["id"]
        props = {k: v for k, v in entity.items() if k not in ("type", "id")}

        query = "MERGE (n:" + entity_type + " {id: $id}) SET n += $props RETURN n"
        with self.driver.session() as session:
            session.run(query, id=entity_id, props=props)

    def upsert_relationship(self, source_id, rel_type, target_id):
        query = (
            "MATCH (a {id: $source_id}) "
            "MATCH (b {id: $target_id}) "
            "MERGE (a)-[:" + rel_type + "]->(b)"
        )
        with self.driver.session() as session:
            session.run(query, source_id=source_id, target_id=target_id)

    def find_incidents_at_location(self, location_name):
        query = (
            "MATCH (i:Incident)-[:OCCURRED_AT]->(l:Location) "
            "WHERE l.name = $location_name "
            "RETURN i.id AS incident_id, i.type AS type, "
            "i.severity AS severity, i.timestamp AS timestamp "
            "ORDER BY i.timestamp DESC"
        )
        with self.driver.session() as session:
            result = session.run(query, location_name=location_name)
            return [dict(record) for record in result]

    def find_people_in_high_severity_incidents_at(self, location_name):
        query = (
            "MATCH (p:Person)-[:INVOLVED_IN]->(i:Incident)-[:OCCURRED_AT]->(l:Location) "
            "WHERE l.name = $location_name AND i.severity = 'HIGH' "
            "RETURN p.id AS person_id, p.name AS person_name, "
            "i.id AS incident_id, i.type AS incident_type"
        )
        with self.driver.session() as session:
            result = session.run(query, location_name=location_name)
            return [dict(record) for record in result]
