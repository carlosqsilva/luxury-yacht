This release is primarily refactoring and hardening, with just a few new convenience features.

### Added

- HPA-managed workloads now have "Scale to 0" and "Resume from 0" actions, replacing the previous disabled "Scale" placeholder.
- The Scale modal now includes a "Scale to 0" button, so you don't have to open the Scale modal and manually type 0 first.
- App logs panel updates:
  - Column-based layout with header.
  - Logs now include the source (cluster name or "Global").

### Changed

- Object panel and table actions are gated by an explicit per-action permission matrix (objectActionPermissionMatrix) derived from effective RBAC capabilities.
- App preferences: the backend now owns the authoritative settings schema (defaults, validation, integer bounds, enum options); the Appearance / Advanced / Object Panel settings sections
  derive slider ranges, enum lists, and clamps from that schema instead of hard-coded frontend constants.
- Refresh subsystem: the refresh-domain registry now derives from a single JSON contract (backend/refresh/domain/refresh-domain-contract.json) shared by backend registrations and frontend
  descriptors.
- Resource stream row updates carry full backend object identity through ref (`ResourceRef`); the legacy top-level identity fields on the wire have been retired now that all consumers read
  from ref.
- Snapshot and stream row construction now share projected-row helpers and are parity-tested for every streamed domain, so a field added to one path cannot silently drop on the other.
- Shell sessions, port-forwards, and node drains are tracked through a unified backend runtime-operation registry; SessionsStatus now sources its state from a single runtimeOperationStatus
  reducer. (Internal refactor — the popover still surfaces shell sessions and port-forwards as before.)
- Backend SIGSEGV sigstack workaround for Linux removed; no longer required under Wails 2.12.0.

### Fixed

- Shell-jump from the sessions status now verifies that the requested object-panel tab actually changed, surfacing dispatch failures instead of silently no-op'ing.
- Shell session close paths routed through a single `closeShellSessionByID` helper and the runtime registry, fixing inconsistent status events when sessions were closed by user action vs.
  cluster disconnect.
