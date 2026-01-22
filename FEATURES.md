# VEDATS Features

English | [简体中文](FEATURES.zh-CN.md)

## What You Get

- A Workbench UI test harness for VS Code extensions (mocha + wdio-vscode-service)
- Artifact-first evidence capture (steps + screenshots + dumps)
- A small DSL to avoid brittle selectors
- CI template for Ubuntu/Windows/macOS

## Evidence Contract

Every run must produce:

- `artifacts/vscode-ui/<runId>/steps.json`
- `artifacts/vscode-ui/<runId>/screenshots/`
- `artifacts/vscode-ui/<runId>/logs/`
- `artifacts/vscode-ui/<runId>/ui-dump/diagnostics.json`

## Designed Details

- Step timeline: each `step()` records duration, status, and stack, and auto-screenshots.
- Failure diagnostics: notifications + VS Code diagnostics + panel screenshots.
- Stability defaults: single aggregated spec to avoid multi-instance conflicts.
