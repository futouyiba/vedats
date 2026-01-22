# VEDATS 运维记录

## 仓库

- GitHub: https://github.com/futouyiba/vedats
- 分支：`main`

## Claude Code 安装

```bash
cc --plugin-dir /path/to/vedats
```

## npm 包

- `vedats-harness@0.1.0`
- `create-vedats@0.1.1`

## 发布命令

```bash
npm publish -w vedats-harness
npm publish -w create-vedats
```

## CLI 快速使用

```bash
npx create-vedats@latest
```

## UI 测试运行

```bash
npm run test:ui
```

Artifacts 目录：

```
artifacts/vscode-ui/<runId>/
```

必须包含：

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## CI 模板

模板路径：

- `packages/create/templates/.github/workflows/ui-tests.yml`

OS 矩阵：Ubuntu、Windows、macOS。

## 注意事项

- npm 发布需要登录并满足 2FA 策略。
- `create-vedats` 发布前必须 build，确保 `dist/index.js` 存在。

## English Version

- [OPERATIONS.md](OPERATIONS.md)
