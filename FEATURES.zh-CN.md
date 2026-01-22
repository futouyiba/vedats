# VEDATS 功能总结

VEDATS = VS Code Extension Debugging and Testing Skills。

本文总结功能、细节设计与使用方式。

## 功能

- Claude Code 技能/插件可安装：`cc --plugin-dir`。
- Slash 命令文档：
  - `/vscode-ui-test-init`
  - `/vscode-ui-test-run`
  - `/vscode-ui-test-debug`
  - `/vscode-ui-test-add-test`
- npm 包：
  - `create-vedats`（脚手架 CLI）
  - `vedats-harness`（证据优先 Harness + DSL）
- 脚手架模板：
  - `tests/ui/**`（mocha + wdio-vscode-service）
  - `wdio.conf.ts` 稳定默认配置
  - CI workflow（Ubuntu/Windows/macOS）
  - `.gitignore` 自动忽略 UI artifacts

## 设计小细节（稳定性/可维护性）

- 证据优先 artifacts：
  - 每次运行都输出 `artifacts/vscode-ui/<runId>/`
  - 包含 `steps.json`、`screenshots/`、`logs/`、`ui-dump/`
- Step 时间线：
  - `step()` 记录开始/结束时间、耗时、状态、错误堆栈
  - 每 step 自动截图
- 失败诊断：
  - `ui-dump/notifications.json`
  - `ui-dump/diagnostics.json`
  - Problems/Output/Terminal 面板截图
  - `ui-dump/error.txt`
- 稳定性默认值：
  - 聚合 spec（`ui.e2e.ts`）避免多实例冲突
  - 每会话独立 storagePath
  - VS Code userSettings 关闭欢迎页/自动更新/信任提示
- DSL 优先：
  - 使用命令面板/命令 ID/API，避免脆弱选择器
  - 使用显式等待，避免裸 sleep/pause
- CI 细节：
  - Linux 使用 Xvfb
  - artifacts 始终上传
  - 缓存 VS Code 下载

## 使用说明

### 安装技能

```bash
cc --plugin-dir /path/to/vedats
```

### 在扩展仓库中注入 UI 测试

```bash
npx create-vedats@latest
```

### 运行 UI 测试

```bash
npm run test:ui
```

### 调试运行

```bash
WDIO_LOG_LEVEL=debug npm run test:ui:headed
```

### 新增用例

1. 在 `tests/ui/specs/` 新增 spec。
2. 在 `tests/ui/specs/ui.e2e.ts` 注册。
3. 运行 `npm run test:ui` 并检查 artifacts。

## 证据契约

Artifacts 必须包含：

- `steps.json`
- `screenshots/`
- `logs/`
- `ui-dump/diagnostics.json`

## 包版本

- `vedats-harness@0.1.0`
- `create-vedats@0.1.1`

## English Version

- [FEATURES.md](FEATURES.md)
