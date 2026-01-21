import fs from 'fs';
import path from 'path';
import { browser } from '@wdio/globals';

type StepStatus = 'running' | 'passed' | 'failed';

type StepEntry = {
  id: number;
  name: string;
  startTime: string;
  endTime?: string;
  durationMs?: number;
  status: StepStatus;
  error?: {
    message: string;
    stack?: string;
  };
};

export type RunContext = {
  runId: string;
  rootDir: string;
  artifactsDir: string;
  screenshotsDir: string;
  dumpsDir: string;
  logsDir: string;
  stepsPath: string;
  storageDir: string;
  steps: StepEntry[];
  stepCounter: number;
};

let runContext: RunContext | null = null;

function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]+/g, '_').slice(0, 80);
}

function nowIso(): string {
  return new Date().toISOString();
}

export function initRunContext(rootDir: string, runId?: string): RunContext {
  if (runContext) {
    return runContext;
  }

  const resolvedRunId =
    runId ??
    `${new Date().toISOString().replace(/[:.]/g, '-')}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;
  const artifactsDir = path.join(rootDir, 'artifacts', 'vscode-ui', resolvedRunId);
  const screenshotsDir = path.join(artifactsDir, 'screenshots');
  const dumpsDir = path.join(artifactsDir, 'ui-dump');
  const logsDir = path.join(artifactsDir, 'logs');
  const storageDir = path.join(artifactsDir, 'vscode-storage');
  const stepsPath = path.join(artifactsDir, 'steps.json');

  ensureDir(artifactsDir);
  ensureDir(screenshotsDir);
  ensureDir(dumpsDir);
  ensureDir(logsDir);
  ensureDir(storageDir);

  runContext = {
    runId: resolvedRunId,
    rootDir,
    artifactsDir,
    screenshotsDir,
    dumpsDir,
    logsDir,
    stepsPath,
    storageDir,
    steps: [],
    stepCounter: 0
  };

  fs.writeFileSync(stepsPath, JSON.stringify([], null, 2), 'utf8');

  return runContext;
}

export function getRunContext(): RunContext {
  if (!runContext) {
    throw new Error('Run context not initialized.');
  }
  return runContext;
}

async function writeSteps(): Promise<void> {
  const context = getRunContext();
  fs.writeFileSync(context.stepsPath, JSON.stringify(context.steps, null, 2), 'utf8');
}

async function captureScreenshot(fileName: string): Promise<void> {
  const context = getRunContext();
  const target = path.join(context.screenshotsDir, `${fileName}.png`);
  await browser.saveScreenshot(target);
}

export async function step<T>(name: string, action: () => Promise<T>): Promise<T> {
  const context = getRunContext();
  const id = ++context.stepCounter;
  const entry: StepEntry = {
    id,
    name,
    startTime: nowIso(),
    status: 'running'
  };

  context.steps.push(entry);
  await writeSteps();

  try {
    const result = await action();
    entry.status = 'passed';
    return result;
  } catch (error) {
    entry.status = 'failed';
    entry.error = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
    throw error;
  } finally {
    entry.endTime = nowIso();
    if (entry.startTime) {
      const start = Date.parse(entry.startTime);
      const end = Date.parse(entry.endTime);
      entry.durationMs = Number.isFinite(end - start) ? end - start : undefined;
    }
    await captureScreenshot(`step-${id}-${sanitizeFileName(name)}`);
    await writeSteps();
  }
}

export async function captureFailureArtifacts(error?: unknown): Promise<void> {
  const context = getRunContext();
  const workbench = await browser.getWorkbench();

  const capturePanelScreenshot = async (command: string, name: string) => {
    try {
      await browser.executeWorkbench((vscode, commandId: string) => {
        return vscode.commands.executeCommand(commandId);
      }, command);
      await captureScreenshot(name);
    } catch (dumpError) {
      fs.writeFileSync(
        path.join(context.dumpsDir, `${name}.error.txt`),
        String(dumpError),
        'utf8'
      );
    }
  };

  try {
    const notifications = await workbench.getNotifications();
    const messages = await Promise.all(notifications.map((item) => item.getMessage()));
    fs.writeFileSync(
      path.join(context.dumpsDir, 'notifications.json'),
      JSON.stringify(messages, null, 2),
      'utf8'
    );
  } catch (dumpError) {
    fs.writeFileSync(
      path.join(context.dumpsDir, 'notifications.error.txt'),
      String(dumpError),
      'utf8'
    );
  }

  try {
    const diagnostics = await browser.executeWorkbench((vscode) => {
      const entries = vscode.languages.getDiagnostics();
      return entries.map(([uri, items]) => ({
        uri: uri.toString(),
        diagnostics: items.map((item) => ({
          message: item.message,
          severity: item.severity,
          source: item.source ?? null,
          code: item.code ?? null,
          range: {
            start: { line: item.range.start.line, character: item.range.start.character },
            end: { line: item.range.end.line, character: item.range.end.character }
          }
        }))
      }));
    });
    fs.writeFileSync(
      path.join(context.dumpsDir, 'diagnostics.json'),
      JSON.stringify(diagnostics, null, 2),
      'utf8'
    );
  } catch (dumpError) {
    fs.writeFileSync(
      path.join(context.dumpsDir, 'diagnostics.error.txt'),
      String(dumpError),
      'utf8'
    );
  }

  await capturePanelScreenshot('workbench.panel.markers.view.focus', 'problems');
  await capturePanelScreenshot('workbench.panel.output.focus', 'output');
  await capturePanelScreenshot('workbench.action.terminal.focus', 'terminal');

  if (error) {
    fs.writeFileSync(
      path.join(context.dumpsDir, 'error.txt'),
      error instanceof Error ? error.stack ?? error.message : String(error),
      'utf8'
    );
  }

  await captureScreenshot('failure');
}
