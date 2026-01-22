#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

type PackageJson = {
  scripts?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const DEFAULT_DEV_DEPS: Record<string, string> = {
  '@wdio/cli': '^8.32.2',
  '@wdio/globals': '^8.32.2',
  '@wdio/local-runner': '^8.32.2',
  '@wdio/mocha-framework': '^8.32.2',
  '@wdio/spec-reporter': '^8.32.2',
  '@wdio/types': '^8.32.2',
  'expect-webdriverio': '^4.12.4',
  'ts-node': '^10.9.2',
  'vedats-harness': '^0.1.0',
  'wdio-vscode-service': '^6.1.4',
  'webdriverio': '^8.32.2'
};

function parseArgs(argv: string[]): { targetDir: string } {
  const targetFlagIndex = argv.findIndex((arg) => arg === '--target');
  if (targetFlagIndex !== -1 && argv[targetFlagIndex + 1]) {
    return { targetDir: path.resolve(argv[targetFlagIndex + 1]) };
  }
  return { targetDir: process.cwd() };
}

function ensureFile(filePath: string): void {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Required file not found: ${filePath}`);
  }
}

function copyTemplate(targetDir: string): void {
  const templateDir = path.resolve(__dirname, '..', 'templates');
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Template directory missing: ${templateDir}`);
  }
  fs.cpSync(templateDir, targetDir, { recursive: true, errorOnExist: false });
}

function updatePackageJson(targetDir: string): void {
  const packageJsonPath = path.join(targetDir, 'package.json');
  ensureFile(packageJsonPath);

  const raw = fs.readFileSync(packageJsonPath, 'utf8');
  const pkg = JSON.parse(raw) as PackageJson;

  pkg.scripts ??= {};
  pkg.devDependencies ??= {};

  pkg.scripts['test:ui'] ??= 'wdio run ./tests/ui/wdio.conf.ts';
  pkg.scripts['test:ui:headed'] ??= 'wdio run ./tests/ui/wdio.conf.ts';

  if (pkg.scripts.compile && !pkg.scripts['pretest:ui']) {
    pkg.scripts['pretest:ui'] = 'npm run compile';
  }

  for (const [dep, version] of Object.entries(DEFAULT_DEV_DEPS)) {
    if (!pkg.devDependencies[dep]) {
      pkg.devDependencies[dep] = version;
    }
  }

  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), 'utf8');
}

function updateTsconfig(targetDir: string): void {
  const tsconfigPath = path.join(targetDir, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    return;
  }

  const raw = fs.readFileSync(tsconfigPath, 'utf8');
  const config = JSON.parse(raw) as { exclude?: string[] };
  const exclude = new Set(config.exclude ?? []);
  exclude.add('tests');
  config.exclude = Array.from(exclude);
  fs.writeFileSync(tsconfigPath, JSON.stringify(config, null, 2), 'utf8');
}

function updateGitignore(targetDir: string): void {
  const gitignorePath = path.join(targetDir, '.gitignore');
  const entry = '**/artifacts/vscode-ui/';

  if (!fs.existsSync(gitignorePath)) {
    fs.writeFileSync(gitignorePath, entry + '\n', 'utf8');
    return;
  }

  const content = fs.readFileSync(gitignorePath, 'utf8');
  if (!content.includes(entry)) {
    const updated = `${content.trimEnd()}\n\n${entry}\n`;
    fs.writeFileSync(gitignorePath, updated, 'utf8');
  }
}

function main(): void {
  const { targetDir } = parseArgs(process.argv);
  try {
    copyTemplate(targetDir);
    updatePackageJson(targetDir);
    updateTsconfig(targetDir);
    updateGitignore(targetDir);
    process.stdout.write(`UI test scaffold added to ${targetDir}\n`);
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

main();
