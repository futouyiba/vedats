# /vscode-ui-test-run

Run Workbench UI tests and return evidence.

Steps:
1. Execute `npm run test:ui`.
2. Identify the latest `artifacts/vscode-ui/<runId>`.
3. Report the last 5 steps from `steps.json`.
