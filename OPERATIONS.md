# VEDATS Operations Notes

## Repo

- GitHub: https://github.com/futouyiba/vedats
- Branch: `main`

## Claude Code Install

```bash
cc --plugin-dir /path/to/vedats
```

## Packages (npm)

- `vedats-harness@0.1.0`
- `create-vedats@0.1.1`

## Publish Commands

```bash
npm publish -w vedats-harness
npm publish -w create-vedats
```

## CLI Quick Start

```bash
npx create-vedats@latest
```

## UI Test Run

```bash
npm run test:ui
```

Artifacts live under:

```
artifacts/vscode-ui/<runId>/
```

Required contents:

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## CI Workflow Template

Template path:

- `packages/create/templates/.github/workflows/ui-tests.yml`

OS matrix: Ubuntu, Windows, macOS.

## Known Requirements

- npm publish requires auth (token or OTP with 2FA enabled).
- `create-vedats` requires build before publish; `dist/index.js` must exist.
