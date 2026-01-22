---
name: vedats
description: 当用户需要为 VS Code 扩展添加、运行、调试或分发 Workbench UI 自动化测试，并要求 artifact-first 诊断时使用此技能（例如 “add UI tests”, “wdio-vscode-service”, “extension UI automation”, “create vscode ui test”, “debug extension UI tests”）。
version: 0.1.0
---

# VEDATS（VS Code Extension Debugging and Testing Skills）

- [SKILL.md](SKILL.md)

本技能用于为 VS Code 扩展落地 Workbench UI 测试体系，提供可复用的脚手架、证据包与失败诊断流程。

## 交付内容

- `tests/ui/**`（mocha + wdio-vscode-service）
- artifact-first 证据输出
- CI 模板（Ubuntu/Windows/macOS）
- 可维护的 DSL 用法规范

## 核心流程

1) 注入 UI 测试脚手架
2) 运行测试并输出证据包
3) 失败诊断（通知/诊断/面板截图）
4) 使用 DSL 新增用例

## 命令

- `init`：执行 `npx create-vedats@latest`
- `run`：执行 `npm run test:ui` 并返回 artifacts
- `debug`：headed + debug 日志并分析 dumps
- `add_test`：用 DSL 新增用例并注册

## 证据契约

必须包含：

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## 说明

- 不使用裸 CSS 选择器或 sleep。
- 优先命令面板/命令 ID/VS Code API。
- 运行后必须汇报最新 artifacts 路径。
