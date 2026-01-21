import { expect, browser } from '@wdio/globals';
import { waitForNotification } from '../dsl/workbench';

describe('Workbench UI smoke test', () => {
  it('shows a VS Code notification', async () => {
    await browser.executeWorkbench((vscode) => {
      vscode.window.showInformationMessage('UI test ready');
    });

    await waitForNotification('UI test ready');
    expect(true).toBe(true);
  });
});
