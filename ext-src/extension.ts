/**
 * This file was created with reference to the sample code below.
 * @see https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/src/extension.ts
 */
import * as path from 'path';
import * as vscode from 'vscode';
import { StorageKey, StorageKeyToValueTypeMap } from '../src/services/storage.service';

export type SettingItem = {
  settingOption: StorageKey;
  value: StorageKeyToValueTypeMap<StorageKey>;
};

const defaultSettingItemMap: Record<StorageKey, boolean> = {
  'settings:minimap': true,
  'settings:nodePath': true,
};

export type WebviewMessage =
  | {
      // Extension(VS Code) -> React
      command: 'json';
      jsonData: string;
      fileName: string;
    }
  | {
      // Extension(VS Code) -> React
      command: 'init-settings';
      settings: SettingItem[];
    }
  | {
      // React -> Extension(VS Code)
      command: 'update-setting';
      setting: SettingItem;
    }
  | {
      // React -> Extension(VS Code)
      command: 'invalid-json';
      warningMessage: string;
    };

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('json-sea-vscode.run', () => {
    JsonSeaPanel.createOrShow(context);
  });

  context.subscriptions.push(disposable);
}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

class JsonSeaPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: JsonSeaPanel | undefined;

  public static readonly viewType = 'jsonSeaWebview';
  public static readonly column = vscode.ViewColumn.Active;

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;

  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(context: vscode.ExtensionContext) {
    const currentTextEditor: vscode.TextEditor | undefined = vscode.window.visibleTextEditors[0]; // 파일에서 바로 열때
    const fileName = path.basename(currentTextEditor?.document.fileName);
    const panelTitle = `JSON Sea (${fileName})`;

    // If we already have a panel, show it.
    if (JsonSeaPanel.currentPanel !== undefined) {
      JsonSeaPanel.currentPanel._panel.title = panelTitle;

      JsonSeaPanel.currentPanel._panel.webview.postMessage({
        command: 'json',
        jsonData: currentTextEditor?.document.getText(),
        fileName,
      } as WebviewMessage);

      JsonSeaPanel.currentPanel._panel.reveal(JsonSeaPanel.column);

      return;
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(JsonSeaPanel.viewType, panelTitle, JsonSeaPanel.column, {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'build')],
    });

    const settings = ['settings:minimap', 'settings:nodePath'].map((storageKey) => {
      const valueFromStorage = context.globalState.get<boolean>(storageKey);
      const defaultValue = defaultSettingItemMap[storageKey as StorageKey] as boolean;

      return {
        settingOption: storageKey,
        value: valueFromStorage ?? defaultValue,
      } as SettingItem;
    });

    panel.webview.postMessage({
      command: 'init-settings',
      settings,
    } as WebviewMessage);

    panel.webview.postMessage({
      command: 'json',
      jsonData: currentTextEditor?.document.getText(),
      fileName,
    } as WebviewMessage);

    JsonSeaPanel.currentPanel = new JsonSeaPanel(panel, context, panelTitle);
  }

  private constructor(panel: vscode.WebviewPanel, context: vscode.ExtensionContext, panelTitle: string) {
    this._panel = panel;
    this._extensionPath = context.extensionPath;

    this._initWebviewContent(panelTitle);

    // This happens when the user closes the panel or when the panel is closed programmatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    this._panel.webview.onDidReceiveMessage(
      (message: WebviewMessage) => {
        switch (message.command) {
          case 'update-setting':
            context.globalState.update(message.setting.settingOption, message.setting.value);
            return;
          case 'invalid-json':
            vscode.window.showWarningMessage(message.warningMessage);
            return;
        }
      },
      null,
      this._disposables,
    );
  }

  public dispose() {
    JsonSeaPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _initWebviewContent(panelTitle: string) {
    const webview = this._panel.webview;

    this._panel.title = panelTitle;
    this._panel.webview.html = this._getHtmlForWebview(webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const manifest = require(path.join(this._extensionPath, 'build', 'asset-manifest.json'));
    const mainScript = manifest['files']['main.js'];
    const mainStyle = manifest['files']['main.css'];

    const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainScript));
    const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'build', mainStyle));

    const scriptUri = webview.asWebviewUri(scriptPathOnDisk);
    const styleUri = webview.asWebviewUri(stylePathOnDisk);

    // Use a nonce to only allow specific scripts to be run
    const nonce = getNonce();

    // <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    // <meta name="theme-color" content="#000000">
    // <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">
    // <base href="${vscode.Uri.file(path.join(context.extensionPath, 'build')).with({ scheme: 'vscode-resource' })}/">

    /**
     * [Content security policy]
     * TODO: Need to check
     * https://code.visualstudio.com/api/extension-guides/webview#content-security-policy
     */
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'unsafe-eval' vscode-resource: data: http: https:;">

          <link rel="stylesheet" type="text/css" href="${styleUri}">
        </head>

        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>

          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
  }
}
