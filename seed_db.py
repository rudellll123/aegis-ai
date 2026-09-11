"""
Phase 7 - one-time setup: create the incidents table and seed it with
the same two records that used to live in tools.py's INCIDENT_DATABASE.
Safe to re-run - skips records that already exist.
"""

from db import engine, SessionLocal, Base, Incident

Base.metadata.create_all(engine)

SEED_DATA = [
    Incident(
        id="INC-1001",
        title="Forklift near-miss in Loading Dock B",
        severity="Low",
        description="A forklift reversed unexpectedly without its backup alarm sounding. Nearby pedestrian stepped back safely.",
        date="2026-08-30",
    ),
    Incident(
        id="INC-1002",
        title="Minor chemical spill in Mixing Lab",
        severity="Medium",
        description="Approximately 500ml of cleaning solvent leaked from an unsecured container. Cleaned using standard spill kit.",
        date="2026-08-31",
    ),
]

session = SessionLocal()
for inc in SEED_DATA:
    existing = session.get(Incident, inc.id)
    if existing is None:
        session.add(inc)
        print(f"Inserted {inc.id}")
    else:
        print(f"Skipped {inc.id} (already exists)")
session.commit()
session.close()
print("Seeding complete.")
