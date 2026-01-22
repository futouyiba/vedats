# VEDATS Operations

English | [简体中文](OPERATIONS.zh-CN.md)

## Repo

- GitHub: https://github.com/futouyiba/vedats

## Publish (npm)

Packages:

- `vedats-harness`
- `create-vedats`

Publish:

```bash
npm publish -w vedats-harness
npm publish -w create-vedats
```

Notes:

- npm may require 2FA/OTP or a token that can publish.
- `create-vedats` must be built before publish so `dist/index.js` exists.
