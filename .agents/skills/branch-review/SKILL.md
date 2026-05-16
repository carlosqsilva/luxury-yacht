---
name: branch-review
description: Review a Luxury Yacht branch for merge readiness, production readiness, or PR-summary quality using the real diff and repo contracts
---

# Branch Review

Use this when the user asks whether a branch is production-ready, merge-ready,
an actual improvement, or asks for a branch/PR review or PR summary grounded in
the current diff.

## Goal

Return a concrete merge-readiness verdict based on the code, tests, and current
validation state. Findings lead. Summaries are secondary.

## Read-Only First Pass

Unless the user explicitly asks for fixes, begin in review mode.

1. Read `AGENTS.md`, `backend/AGENTS.md`, and `frontend/AGENTS.md`.
2. Read `.agents/README.md` and `.agents/context/code-map.md`.
3. Check repository state with read-only git commands:
   - `git status --short`
   - `git branch --show-current`
   - `git diff --stat origin/main...HEAD`
   - `git diff --name-only origin/main...HEAD`
   - `git diff --stat`
   - `git diff --name-only`
   - `git diff --cached --stat`
   - `git diff --cached --name-only`
   - `git ls-files --others --exclude-standard`
4. If the user provides a different base or range, use that instead of
   `origin/main...HEAD`.
5. Review both committed branch changes and working-tree changes. Do not ignore
   modified, staged, or untracked files just because `origin/main...HEAD` is
   empty.
6. Read any changed docs/plans that claim completion. Treat them as hints, not
   proof.

## Contract Audit

For every meaningful change, inspect the owning contract:

| Change Area                                          | Required Context                                                                   |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Multi-cluster, scopes, selected clusters, cache keys | `docs/architecture/multi-cluster.md`                                               |
| Refresh, snapshots, streams, diagnostics             | `docs/architecture/refresh-system.md`, `.agents/skills/refresh-subsystem/SKILL.md` |
| Identity, status, links, facts, object refs          | `docs/architecture/shared-resource-model.md`                                       |
| Browse/catalog/discovery/namespaces                  | `docs/architecture/catalog.md`                                                     |
| Frontend reads and stores                            | `docs/architecture/data-access.md`                                                 |
| Permissions/capabilities/RBAC UI                     | `docs/architecture/permissions.md`                                                 |
| Tables/large datasets                                | `docs/frontend/gridtable.md`, `docs/architecture/large-data.md`                    |
| Object map                                           | `.agents/skills/object-map/SKILL.md`, `docs/workflows/object-map.md`               |
| UI shell/modals/keyboard/tabs                        | Relevant `docs/frontend/*.md`                                                      |

## Required Checks

Look for these before considering the branch ready:

- Cluster-data paths carry `clusterId` through requests, scopes, caches, state,
  events, navigation, and actions.
- Object references crossing boundaries carry `clusterId`, `group`, `version`,
  `kind`, and concrete `namespace`/`name` when applicable.
- Backend status semantics are projected as `status`, `statusState`,
  `statusPresentation`, and optional `statusReason` where primary status is
  rendered.
- Relationship navigation uses `ResourceLink.ref` and catalog-backed identity,
  not frontend kind/name reconstruction.
- Backend and frontend refresh domain definitions are synchronized.
- Snapshot and stream payload shapes agree for the same table/list surface.
- Permission-denied or restricted-RBAC behavior remains visible in diagnostics.
- New frontend UI uses existing components, CSS files, tokens, aliases, and
  GridTable where applicable.
- Tests cover the changed behavior at the closest useful level.

## Validation Sequence

Run focused tests first when the branch has clear areas:

- Backend shared/resource-model/refresh changes: focused `go test` packages.
- Frontend changes: targeted Vitest specs and `npm run typecheck --prefix frontend`.
- Broad frontend/shared changes: consider `mage qc:knip`.

Before a final "ready" verdict on non-documentation work, run:

```sh
mage qc:prerelease
git diff --check
git status --short
```

If `mage qc:prerelease` cannot run or fails, report the exact command and first
concrete failure. Do not call the branch ready.

`mage qc:prerelease` includes `lint:fix`, so inspect changed files afterward.

## Output Format

For review findings:

1. Findings first, ordered by severity.
2. Each finding includes file/line, problem, impact, and concrete fix direction.
3. Then open questions or assumptions.
4. Then validation state.
5. Then short summary/verdict.

For no findings:

- Say that no merge-blocking issues were found.
- State exactly what was validated.
- State residual risk or untested areas.

For PR summaries:

- Use the real diff/range.
- Describe user-visible behavior and operational impact.
- Avoid touched-file inventories, commit hashes, and unverified claims.
