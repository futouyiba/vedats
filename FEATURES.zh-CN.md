# VEDATS 功能

简体中文 | [English](FEATURES.md)

## 你会得到什么

- VS Code 扩展的 Workbench UI 测试体系（mocha + wdio-vscode-service）
- artifact-first 证据包（steps + 截图 + dumps）
- 小型 DSL，避免脆弱选择器
- CI 模板（Ubuntu/Windows/macOS）

## 证据契约

每次运行必须产出：

- `artifacts/vscode-ui/<runId>/steps.json`
- `artifacts/vscode-ui/<runId>/screenshots/`
- `artifacts/vscode-ui/<runId>/logs/`
- `artifacts/vscode-ui/<runId>/ui-dump/diagnostics.json`

## 精心设计的细节

- Step 时间线：`step()` 记录耗时、状态、堆栈，并自动截图。
- 失败诊断：notifications + VS Code diagnostics + 面板截图。
- 稳定性默认值：聚合 spec，避免多实例冲突。
