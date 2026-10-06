### Added

- Extended support for metadata search (labels and annotations) on the namespace and cluster resource tables.

### Changed

- Improvements to icon bar buttons in the Logs tab and/or table views.
  - Search button opens search controls in its own row. Can also be invoked with ⌘F / Ctrl+F..
  - Consolidated Filter button replaces the separate Highlight and Invert buttons when search is enabled. Click to cycle the filter modes or select from its dropdown.
  - Consolidated download button in tables and log viewers, replacing the separate Copy and Export buttons. Click to select Copy to Clipboard or Save to File.
  - Consolidated Format button cycles Raw, Pretty, and Table views, or you can pick from its menu.
  - The Timestamp button has a UTC / local time menu and shows which is in use.
  - Workload logs hide the container name unless there are multiple containers, to save space.
  - Auto-refresh button now toggles between a red Stop button and a green Play button.
  - Button styling updated. Dimmed only when unavailable, and filled when on. Buttons that cycle modes (format, filter mode, auto-refresh) are never filled. Hovering brightens the icon.

### Fixed

- Logs tab container that starts after the tab opens, such as a debug container, appears in the Containers dropdown and its lines are named
- In the Workloads view, the collapsed Pods pane stays collapsed until you open it again. Previously, selecting a workload would reopen the pane.
- The object panel's Pods tab no longer has a Favorite button, which saved the wrong view
- Copying or saving the Jobs tab includes only the jobs that match its search
