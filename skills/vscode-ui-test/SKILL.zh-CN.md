---
name: vedats
description: 当用户希望使用 VEDATS（VS Code Extension Debugging and Testing Skills）为 VS Code 扩展添加、运行、调试或分发 Workbench UI 自动化测试，并要求 artifact-first 诊断时使用此技能（例如 “add UI tests”, “wdio-vscode-service”, “extension UI automation”, “create vscode ui test”, “debug extension UI tests”）。
version: 0.1.0
---

# VEDATS（VS Code Extension Debugging and Testing Skills）

简体中文 | [English](SKILL.md)

使用该技能为 VS Code 扩展落地 Workbench UI 测试体系，重点提供 artifact-first 证据包与失败诊断闭环。

## 交付内容

- `tests/ui/**`（mocha + wdio-vscode-service）
- 证据包（`steps.json`、截图、diagnostics）
- CI 模板（Ubuntu/Windows/macOS）
- DSL（命令面板/命令 ID/API 驱动，避免脆弱选择器）

## 核心流程

1) 注入脚手架
2) 运行并验证 artifacts
3) 根据 dumps/截图诊断失败
4) 用 DSL 新增用例并注册

## 命令

- `init`：运行 `npx create-vedats@latest`
- `run`：运行 `npm run test:ui` 并输出 artifacts 路径
- `debug`：headed + debug 日志运行，并分析 dumps
- `add_test`：新增 DSL 用例并注册到聚合 spec

## 证据契约

Artifacts 目录必须包含：

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## 参考

- [references/workflows.zh-CN.md](references/workflows.zh-CN.md) | [references/workflows.md](references/workflows.md)
- [references/dsl.zh-CN.md](references/dsl.zh-CN.md) | [references/dsl.md](references/dsl.md)
