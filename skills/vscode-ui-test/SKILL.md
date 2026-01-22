---
name: vedats
description: This skill should be used when the user wants to add, run, debug, or distribute Workbench UI tests for VS Code extensions with artifact-first diagnostics ("add UI tests", "wdio-vscode-service", "extension UI automation", "create vscode ui test", "debug extension UI tests").
version: 0.1.0
---

# VEDATS (VS Code Extension Debugging and Testing Skills)

- [SKILL.zh-CN.md](SKILL.zh-CN.md)

Use this skill to scaffold, run, and debug Workbench UI tests for VS Code extensions with artifact-first diagnostics. The workflow is powered by WebdriverIO and wdio-vscode-service, with a shared harness that records steps, screenshots, and failure dumps.

## What This Skill Delivers

- A repeatable `tests/ui/**` harness using mocha
- Artifact-first evidence (`steps.json`, screenshots, diagnostics)
- CI-ready workflow for Linux/Windows/macOS
- A stable DSL for command palette and notifications

## Core Workflow

1) Scaffold UI tests in the target repo
2) Run and verify evidence artifacts
3) Debug using failure dumps and screenshots
4) Add new specs using the DSL

## Commands

- `init`: run `npx create-vedats@latest` to add the UI test harness
- `run`: run `npm run test:ui` and surface artifacts
- `debug`: run headed with debug logs, then analyze dumps
- `add_test`: add a DSL-based spec and register it

## Evidence Contract

The artifacts directory must include:

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## Notes

- Avoid raw CSS selectors or sleeps in specs.
- Prefer command palette or VS Code API for actions.
- Always report the latest artifacts path after running tests.
