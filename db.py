"""
Phase 7 - Postgres connection and Incident model.
Phase 10 - DATABASE_URL now reads from an environment variable first,
falling back to the local Docker Postgres used throughout development.
Automatically normalizes a plain "postgresql://" URL (e.g. copied
directly from Render) into "postgresql+psycopg2://" as SQLAlchemy
requires - so the raw copied URL can be pasted as-is, with no manual
mid-string editing needed.
"""

import os
from sqlalchemy import create_engine, Column, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql+psycopg2://postgres:aegispass@localhost:5433/aegisai"
)

if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

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
