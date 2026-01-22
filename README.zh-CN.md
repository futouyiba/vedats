# VEDATS

简体中文 | [English](README.md)

VEDATS = VS Code Extension Debugging and Testing Skills。

本仓库提供：

- Claude Code 插件技能：用于 VS Code 扩展 UI 测试工作流
- 可分发的脚手架 CLI（`create-vedats`）
- 可复用的 Harness 库（`vedats-harness`），提供 artifact-first 证据与失败诊断

## 安装（Claude Code）

```bash
cc --plugin-dir /path/to/vedats
```

## 快速开始（CLI）

在你的 VS Code 扩展仓库根目录执行：

```bash
npx create-vedats@latest
```

然后运行：

```bash
npm run test:ui
```

Artifacts 目录：

```
artifacts/vscode-ui/<runId>/
```

## 文档

- [FEATURES.zh-CN.md](FEATURES.zh-CN.md) | [FEATURES.md](FEATURES.md)
- [OPERATIONS.zh-CN.md](OPERATIONS.zh-CN.md) | [OPERATIONS.md](OPERATIONS.md)
- 技能文档：
  - [skills/vscode-ui-test/SKILL.zh-CN.md](skills/vscode-ui-test/SKILL.zh-CN.md)
  - [skills/vscode-ui-test/SKILL.md](skills/vscode-ui-test/SKILL.md)

## npm 包

- `vedats-harness`
- `create-vedats`

## Claude Code 命令

- [commands/init.zh-CN.md](commands/init.zh-CN.md) | [commands/init.md](commands/init.md)
- [commands/run.zh-CN.md](commands/run.zh-CN.md) | [commands/run.md](commands/run.md)
- [commands/debug.zh-CN.md](commands/debug.zh-CN.md) | [commands/debug.md](commands/debug.md)
- [commands/add-test.zh-CN.md](commands/add-test.zh-CN.md) | [commands/add-test.md](commands/add-test.md)
