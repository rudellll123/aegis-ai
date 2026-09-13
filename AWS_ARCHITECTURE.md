# AegisAI - Production Cloud Architecture (Design Document)

**Status: designed, not deployed.** This document specifies how AegisAI's full
multimodal system (agent, vision, audio, RAG, knowledge graph, Postgres,
Redis/Celery, observability) would be deployed on AWS in production. The
actual deployed artifact for this project is a deliberately scoped-down
FastAPI service on Render (see Phase 10 in the main README) - lightweight,
free, and sufficient to prove the deployment pipeline end-to-end. This
document exists to demonstrate the production architecture that would be
built next, with real reasoning behind every choice, not just a diagram.

## Why this exists as a separate document

Provisioning the full stack on AWS costs real money (NAT Gateway, ALB, RDS,
compute) and requires a payment method the project didn't have available
during development. Rather than skip cloud-architecture thinking entirely,
or provision live infrastructure just to screenshot it and tear it down,
this document captures the same design decisions an actual deployment would
require - sized, reasoned, and ready to implement.

## High-level architecture
                          Route 53 (DNS)
                                |
                                v
                     Application Load Balancer
                      (public subnet, 2 AZs)
                                |
                +---------------+----------------+
                |                                |
                v                                v
        ECS Fargate Service                ECS Fargate Service
       (Agent API - FastAPI)              (Celery Worker - vision/
        private subnet, autoscale          audio background jobs)
                |                                |
                +---------------+----------------+
                                |
          +---------------------+----------------------+
          |                     |                       |
          v                     v                       v
    RDS PostgreSQL       ElastiCache Redis      Neo4j (self-hosted
 (Multi-AZ, private        (broker + Celery       on EC2, private
  subnet)                   result backend)        subnet)
          |
          v
    S3 (evidence corpus, uploaded video/audio,
        Qdrant snapshot backups)

    ECR (Docker image registry, one repo per service)
    CloudWatch (logs, metrics, alarms)
    Secrets Manager (DB credentials, API keys)
    IAM (least-privilege roles per service, no shared credentials)

## Component-by-component reasoning

### Compute: ECS Fargate over EC2 or EKS
Fargate removes server management entirely - no patching, no capacity
planning for the underlying instances. EKS was ruled out for a
single-service system: its control plane costs a flat ~$73/month
regardless of load, which is disproportionate here. ECS's control plane
itself is free; you only pay for the Fargate tasks actually running.

Two separate ECS services are used rather than one combined container,
mirroring the sync/async tool split from Phase 7: the API service handles
fast, low-latency requests, while the Celery worker service handles heavy
CPU-bound vision/audio jobs. Scaling them independently means a burst of
video-analysis jobs doesn't starve simple incident-lookup requests of
compute.

### Database: RDS PostgreSQL (Multi-AZ)
Multi-AZ was chosen over Single-AZ despite the added cost, because
incident records are the system's source of truth - losing them to an AZ
outage is a real operational risk for a system meant to support real
investigations. Automated backups and point-in-time recovery come with
RDS by default, replacing the manual seed_db.py approach used in
development.

### Caching/queue: ElastiCache for Redis over self-managed Redis
Removes the operational burden of patching and failover for the Celery
broker - given Redis's role here is purely infrastructural (job queue,
result backend), a managed service is the right trade, not a place to
economize on ops time.

### Knowledge graph: Neo4j on EC2 (not a managed service)
AWS has no first-party managed Neo4j offering (Neo4j Aura runs on AWS
infrastructure but is a separate vendor relationship). Self-hosting on a
right-sized EC2 instance in a private subnet is the pragmatic middle
ground for this system's scale - a dedicated Neo4j Aura subscription would
be considered if the knowledge graph became a primary, high-traffic path
rather than a supporting one.

### Object storage: S3
Holds the RAG evidence corpus, user-uploaded video/audio for analysis, and
periodic Qdrant snapshot backups. S3's durability guarantees and lifecycle
policies (e.g., auto-archiving old uploaded videos to Glacier after 90
days) fit this data's access pattern - written once, read occasionally,
rarely deleted.

### Networking: VPC with public/private subnet split
Only the Application Load Balancer sits in public subnets. All compute
(ECS tasks, RDS, ElastiCache, the Neo4j EC2 instance) sits in private
subnets, reachable only from inside the VPC. This is the same principle
behind the Phase 3 Knowledge Graph's parameterized-query design and the
Phase 7 SQLAlchemy ORM choice, applied at the network layer instead of the
application layer: minimize what's directly reachable from the internet.

**Known cost trade-off, stated honestly:** a NAT Gateway is required for
private-subnet resources (like the Celery worker) to reach the internet
for things like pulling Docker images or calling external APIs - this is
one of the least obvious, most commonly underestimated AWS costs (~$32-45
/month depending on data transfer). A cost-conscious alternative for a
lower-traffic system would be VPC endpoints for AWS services (S3, ECR)
to avoid needing a NAT Gateway for those specific calls, falling back to
NAT only for genuinely external traffic.

### Secrets: AWS Secrets Manager
Database credentials and any third-party API keys (e.g., a production
ChatAnthropic key, replacing the local Ollama setup) are stored here, not
in environment variables baked into task definitions - the same principle
that motivated rotating the Render database password after it was
accidentally exposed during manual setup in this project's own history.

### IAM: least-privilege roles per service
Each ECS service gets its own IAM task role scoped to exactly what it
needs (the API service can read/write RDS and S3; the Celery worker
additionally needs S3 read/write for video files but not database write
access beyond what the ORM requires). No service shares a broad
"admin"-style role - a deliberate mirror of the injection-safety
reasoning from the Phase 3 Knowledge Graph design (restrict to the
minimum necessary surface, not the maximum convenient one).

### CI/CD: GitHub Actions -> ECR -> ECS
Extends the CI pipeline already built in Phase 10 (see main README): on a
merge to main, after the existing eval suite passes, a new job builds the
production Docker image, pushes it to ECR, and triggers an ECS service
update (rolling deployment, zero downtime). The same eval-suite job that
currently just reports pass/fail would become a deployment gate - a
failing eval blocks the deploy.

### Observability: CloudWatch, extending Phase 9
The Phase 9 Prometheus/Grafana/OpenTelemetry setup (built locally, with a
documented limitation around cross-process trace propagation) would be
extended with CloudWatch Container Insights for infrastructure-level
metrics (task CPU/memory, ALB request counts) alongside the
application-level metrics and traces already designed. This is additive,
not a replacement - the existing tracing/metrics code doesn't need to
change, just where it's shipped to.

## What would change from the local/Render setup

| Local / Render (this project) | Production AWS design |
|---|---|
| SQLite-like file-mode Qdrant | Qdrant on a dedicated EC2 instance or ECS service, backed by EBS, snapshotted to S3 |
| Manual `docker run` commands | ECS task definitions, Terraform/CloudFormation for repeatable provisioning |
| Local Ollama (CPU-bound, slow) | ChatAnthropic API (per the Phase 1/6 findings on tool-calling reliability) |
| Render free Postgres (30-day expiry) | RDS Multi-AZ with automated backups |
| Manual environment variable entry | Secrets Manager + parameterized task definitions |
| Single Render web service | Two ECS services (API + Celery worker), scaled independently |

## Estimated monthly cost (rough order of magnitude)

This is a directional estimate, not a quote - actual cost depends on
traffic and instance sizing:

- ECS Fargate (2 services, modest sizing): ~$30-60/month
- RDS PostgreSQL (Multi-AZ, small instance): ~$50-70/month
- ElastiCache Redis (small instance): ~$15-25/month
- NAT Gateway: ~$32-45/month
- ALB: ~$16-20/month
- S3, ECR, CloudWatch: typically under $10/month combined at this scale
- Neo4j EC2 instance: ~$15-30/month depending on size

**Total: roughly $160-260/month** for a genuinely production-grade,
Multi-AZ deployment - a realistic number to be able to state and defend
in an interview, rather than an unrealistic "it would cost almost
nothing" claim.
