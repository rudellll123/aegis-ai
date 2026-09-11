"""
Phase 7 - Postgres connection and Incident model.

Replaces the in-memory INCIDENT_DATABASE list from Phase 1 with a real
table, via SQLAlchemy. Connection details point at the aegis-postgres
Docker container (see Phase 7 setup notes in README).
"""

from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "postgresql+psycopg2://postgres:aegispass@localhost:5433/aegisai"

engine = create_engine(DATABASE_URL, echo=False)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    severity = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    date = Column(String, nullable=False)
