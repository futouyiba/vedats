# /vscode-ui-test-init

简体中文 | [English](init.md)

为 VS Code 扩展仓库注入 Workbench UI 测试脚手架。

步骤：
1. 在仓库根目录运行 `npx create-vedats@latest`。
2. 确认 `tests/ui/**`、`.github/workflows/ui-tests.yml`、scripts 已生成。
3. 执行 `npm run test:ui` 并输出 artifacts 路径。
