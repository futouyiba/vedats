# VEDATS

English | [简体中文](README.zh-CN.md)

VEDATS = VS Code Extension Debugging and Testing Skills.

This repo provides:

- A Claude Code plugin skill for extension UI testing workflows
- A distributable scaffolding CLI (`create-vedats`)
- A reusable harness library (`vedats-harness`) for artifact-first diagnostics

## Install (Claude Code)

```bash
cc --plugin-dir /path/to/vedats
```

## Quick Start (CLI)

Run this in your VS Code extension repo:

```bash
npx create-vedats@latest
```

Then:

```bash
npm run test:ui
```

Artifacts:

```
artifacts/vscode-ui/<runId>/
```

## Docs

- [FEATURES.md](FEATURES.md) | [FEATURES.zh-CN.md](FEATURES.zh-CN.md)
- [OPERATIONS.md](OPERATIONS.md) | [OPERATIONS.zh-CN.md](OPERATIONS.zh-CN.md)
- Skill: [skills/vscode-ui-test/SKILL.md](skills/vscode-ui-test/SKILL.md) | [skills/vscode-ui-test/SKILL.zh-CN.md](skills/vscode-ui-test/SKILL.zh-CN.md)

## NPM Packages

- `vedats-harness`
- `create-vedats`

## Commands (in Claude Code)

- [commands/init.md](commands/init.md) | [commands/init.zh-CN.md](commands/init.zh-CN.md)
- [commands/run.md](commands/run.md) | [commands/run.zh-CN.md](commands/run.zh-CN.md)
- [commands/debug.md](commands/debug.md) | [commands/debug.zh-CN.md](commands/debug.zh-CN.md)
- [commands/add-test.md](commands/add-test.md) | [commands/add-test.zh-CN.md](commands/add-test.zh-CN.md)
