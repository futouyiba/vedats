# /vscode-ui-test-add-test

简体中文 | [English](add-test.md)

使用 DSL 新增 Workbench UI 用例。

规则：
- 使用 `tests/ui/dsl/workbench.ts` 的 DSL。
- 避免写原生选择器与 `pause`。

步骤：
1. 在 `tests/ui/specs/` 新增 spec。
2. 在 `tests/ui/specs/ui.e2e.ts` 注册。
3. 执行 `npm run test:ui` 并输出 artifacts。
