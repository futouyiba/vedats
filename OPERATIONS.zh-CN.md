# VEDATS 运维

简体中文 | [English](OPERATIONS.md)

## 仓库

- GitHub: https://github.com/futouyiba/vedats

## 发布（npm）

包：

- `vedats-harness`
- `create-vedats`

发布：

```bash
npm publish -w vedats-harness
npm publish -w create-vedats
```

注意：

- npm 可能要求 2FA/OTP 或可发布的 token。
- `create-vedats` 发布前必须 build，确保 `dist/index.js` 存在。
