### Added

- Nodes now have a Shell tab, equivalent to `kubectl debug node/<name> --profile=sysadmin`.
  - Runs a privileged debug pod in the `default` namespace with your kubeconfig's credentials. RBAC and admission policies apply as they do for kubectl.
  - The node's filesystem is at `/host`, and the pod shares the node's network, process, and IPC namespaces.
  - The debug pod is deleted when the session ends. If deletion fails, the session stays in the Sessions list with the error until ending it succeeds.

### Changed

- Replaced the Pods pane with embedded tables in Workloads and Nodes views. Click the Pods count or press spacebar to expand the row.
- Added context menu support to Namespaces views.
- Clearer error messages:
  - A rejected request shows its specific reason instead of a generic "Invalid request".
  - An edit that conflicts with another change says the object changed and to refresh and try again.
  - An action the cluster refuses shows a notification instead of failing silently.

### Fixed

- Node Logs auto-refresh no longer fails on every refresh and reloads the whole log.
- The object panel marks an object deleted only when it is gone, not when a related lookup fails.
- "Insufficient permissions" appears only for real permission denials, not for timeouts on RBAC resources.
- Opening a shell session from the Sessions list no longer shows an error when that pod's panel is already open.
- Alt-clicking a namespace link, or choosing Go to Table View for a namespace, correctly opens the Namespaces view instead of the Config view.
