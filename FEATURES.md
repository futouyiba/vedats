# VEDATS Summary

- [FEATURES.zh-CN.md](FEATURES.zh-CN.md)

VEDATS = VS Code Extension Debugging and Testing Skills.

This document summarizes features, design details, and usage.

## Features

- Claude Code skill/plugin installable via `cc --plugin-dir`.
- Slash command docs:
  - `/vscode-ui-test-init`
  - `/vscode-ui-test-run`
  - `/vscode-ui-test-debug`
  - `/vscode-ui-test-add-test`
- NPM packages:
  - `create-vedats` (scaffold CLI)
  - `vedats-harness` (artifact-first harness + DSL)
- Scaffolding templates:
  - `tests/ui/**` (mocha + wdio-vscode-service)
  - `wdio.conf.ts` with stable defaults
  - CI workflow for Ubuntu/Windows/macOS
  - `.gitignore` entry for UI artifacts

## Small Details (Designed for Reliability)

- Artifact-first evidence:
  - `artifacts/vscode-ui/<runId>/` on every run
  - `steps.json` timeline, `screenshots/`, `logs/`, `ui-dump/`
- Step timeline:
  - Each `step()` records start/end time, duration, status, and stack
  - Auto-screenshot per step for a visual time series
- Failure diagnostics:
  - `ui-dump/notifications.json`
  - `ui-dump/diagnostics.json`
  - Screenshots of Problems/Output/Terminal panels
  - `ui-dump/error.txt` (stack)
- Stability defaults:
  - Single aggregated spec (`ui.e2e.ts`) to avoid multi-instance conflicts
  - Per-session storage path to isolate profiles
  - VS Code settings to reduce modal prompts and noise
- DSL-first usage:
  - Use command palette/command IDs/API instead of brittle selectors
  - Explicit waits (no raw sleep/pause)
- CI-ready:
  - Linux uses Xvfb for headless UI
  - Artifacts uploaded on failure or success
  - VS Code download cache enabled

## Usage

### Install Skill

```bash
cc --plugin-dir /path/to/vedats
```

### Scaffold UI Tests in a VS Code Extension Repo

```bash
npx create-vedats@latest
```

### Run UI Tests

```bash
npm run test:ui
```

### Debug Run

```bash
WDIO_LOG_LEVEL=debug npm run test:ui:headed
```

### Add a New Test

1. Add a spec under `tests/ui/specs/`.
2. Register it in `tests/ui/specs/ui.e2e.ts`.
3. Run `npm run test:ui` and inspect artifacts.

## Evidence Contract

Artifacts must include:

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## Package Versions

- `vedats-harness@0.1.0`
- `create-vedats@0.1.1`
