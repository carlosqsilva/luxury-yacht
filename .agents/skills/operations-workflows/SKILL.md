---
name: operations-workflows
description: Work on logs, shell exec, debug containers, port-forward, node drain/maintenance, long-running operations, permissions, lifecycle, and cleanup tests
---

# Operations Workflows

Use this when touching logs, shell exec, debug containers, port-forward, node
drain/maintenance, session lifecycle, operation cancellation, permission-gated
actions, or related tests.

## Core Contracts

Read:

1. `AGENTS.md`
2. `backend/AGENTS.md`
3. `frontend/AGENTS.md`
4. `docs/workflows/logs/overview.md`
5. `docs/workflows/shell-debug.md`
6. `docs/architecture/permissions.md`
7. `docs/architecture/multi-cluster.md`
8. `docs/architecture/auth.md` when cluster auth or recovery is involved

## Backend Entry Points

- `backend/refresh/containerlogsstream`
- `backend/resources/pods/logs.go`
- `backend/resources/nodes/logs.go`
- `backend/app_logs.go`
- `backend/shell_sessions.go`
- `backend/resources/pods/debug.go`
- `backend/portforward*.go`
- `backend/nodemaintenance`
- `backend/refresh/snapshot/node_maintenance.go`

## Frontend Entry Points

- `frontend/src/modules/object-panel/components/ObjectPanel/Logs`
- `frontend/src/modules/object-panel/components/ObjectPanel/NodeLogs`
- `frontend/src/modules/object-panel/components/ObjectPanel/Shell`
- `frontend/src/modules/port-forward`
- shared drain/maintenance components
- settings or modals that configure these workflows

## Checklist

- [ ] Requests and events carry `clusterId` and full target identity.
- [ ] Permission checks and capability reasons are visible in the UI.
- [ ] Streams, sessions, and long-running operations clean up on close,
      disconnect, cluster removal, auth failure, and app shutdown.
- [ ] Cancellation/stop paths are idempotent.
- [ ] Frontend state resets on cluster/namespace/object changes.
- [ ] Logs preserve transport-specific behavior documented in the logs docs.
- [ ] Tests cover lifecycle, permission-denied, and cleanup behavior.
- [ ] Non-doc changes pass `mage qc:prerelease`.

## Validation

Use focused checks while iterating:

```sh
go test ./backend ./backend/resources/pods ./backend/resources/nodes ./backend/nodemaintenance
npm run typecheck --prefix frontend
npm run test --prefix frontend -- Logs Shell port-forward drain
```

Then run `mage qc:prerelease` for non-documentation changes.
