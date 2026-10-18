# ADR-001: Keep canonical context in Git

- Status: accepted
- Date: 2026-10-19

## Context

Agents need stable architecture and operational context across conversations and
across different agent clients. An orphan worktree or vector database would
require an additional synchronization mechanism and could drift from the code.

## Decision

Keep canonical architecture maps, contracts, runbooks, decisions, and curated
memory in the HOME_SERVER repository. Treat vector databases and search indexes
as derived caches that can be rebuilt.

## Consequences

- Context changes can be reviewed with code changes.
- Agents can discover context directly from the workspace.
- Rollback and audit history use normal Git operations.
- A future semantic index must retain a rebuild command and must not become the
  only copy of a memory entry.
