# /vscode-ui-test-debug

简体中文 | [English](debug.md)

以 headed 模式运行 UI 测试并输出诊断信息。

步骤：
1. 运行 `WDIO_LOG_LEVEL=debug npm run test:ui:headed`。
2. 查看 `ui-dump/` 与截图，定位失败原因。
3. 输出最可能原因与下一步建议。
