# /vscode-ui-test-add-test

- [add-test.zh-CN.md](add-test.zh-CN.md)

Add a new Workbench UI test using the DSL.

Rules:
- Use the DSL from `tests/ui/dsl/workbench.ts`.
- Avoid raw selectors and `pause` calls.

Steps:
1. Add a spec under `tests/ui/specs/`.
2. Register it in `tests/ui/specs/ui.e2e.ts`.
3. Run `npm run test:ui` and report artifacts.
