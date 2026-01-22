# VS Code UI Test Skill

This repository provides a Claude Code skill workflow (VEDATS: VS Code Extension Debugging and Testing Skills) and a reusable CLI + harness
to add Workbench UI automation for VS Code extensions.

## Packages

- `vscode-ui-test-harness`: shared DSL + artifacts + diagnostics
- `create-vscode-ui-test`: CLI scaffolding tool

## Skill

Claude Code skill lives under `skills/vscode-ui-test/`.

## Features & Usage

- [FEATURES.md](FEATURES.md) | [FEATURES.zh-CN.md](FEATURES.zh-CN.md)

## Chinese Docs

- [README.zh-CN.md](README.zh-CN.md)
- [OPERATIONS.zh-CN.md](OPERATIONS.zh-CN.md)

## Install Skill (Claude Code)

```bash
cc --plugin-dir /path/to/vscode-ui-test-skill
```

## Quick Start (CLI)

```bash
npx create-vedats@latest
```

## Publish (npm)

Update repository URLs in:

- `packages/harness/package.json`
- `packages/create/package.json`

Then publish:

```bash
npm publish -w vedats-harness
npm publish -w create-vedats
```
