// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as path from 'path';
import * as vscode from 'vscode';

export type WebviewMessage = {
  jsonData: string;
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand('json-sea-vscode.run', async () => {
    diveDeepJsonSea(context);
  });

  context.subscriptions.push(disposable);
}

async function diveDeepJsonSea(context: vscode.ExtensionContext) {
  const currentTextEditor: vscode.TextEditor | undefined = vscode.window.visibleTextEditors[0];

  const WEBVIEW_VIEW_TYPE = 'jsonSeaWebview';
  const TITLE = 'JSON SEA'; // Title of the panel displayed to the user

  const panel = vscode.window.createWebviewPanel(WEBVIEW_VIEW_TYPE, TITLE, vscode.ViewColumn.Active, {
    enableScripts: true,
    retainContextWhenHidden: true, // TODO: Check: 다른 탭에서 다시 JSON SEA 탭으로 이동했을 때 데이터가 유지되는지 확인해볼것 / `retainContextWhenHidden`는 메모리 많이 소요되니 최후의 방법으로 쓸 것
    localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'build'))], // TODO: Check: 에제에서는 context.extensionUri 사용.
  });

  const foundText = currentTextEditor?.document.getText();

  panel.webview.postMessage({
    jsonData: foundText,
  } as WebviewMessage);

  // const onActiveEditorChange = vscode.window.onDidChangeActiveTextEditor(
  //   (editor) => {
  //     currentTextEditor = editor;
  //   }
  // );

  const onTextChange = vscode.workspace.onDidChangeTextDocument((changeEvent) => {
    panel.webview.postMessage({
      jsonData: changeEvent.document.getText(),
    });
  });

  // `onDidDispose` fired when a webview is destroyed
  panel.onDidDispose(
    () => {
      onTextChange.dispose();
      // onActiveEditorChange.dispose();
    },
    null,
    context.subscriptions,
  );

  const manifest = require(path.join(context.extensionPath, 'build', 'asset-manifest.json'));
  const mainScript = manifest['files']['main.js'];
  const mainStyle = manifest['files']['main.css'];

  const scriptPathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'build', mainScript));
  const stylePathOnDisk = vscode.Uri.file(path.join(context.extensionPath, 'build', mainStyle));

  // const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-resource' });
  // const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

  const scriptUri = panel.webview.asWebviewUri(scriptPathOnDisk);
  const styleUri = panel.webview.asWebviewUri(stylePathOnDisk);

  panel.webview.html = getWebviewContent(styleUri, scriptUri);
}

function getWebviewContent(styleUri: vscode.Uri, scriptUri: vscode.Uri) {
  // Use a nonce to whitelist which scripts can be run
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
        <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'unsafe-eval' vscode-resource: data: https: http:;">

        <link rel="stylesheet" type="text/css" href="${styleUri}">
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>

        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
    </html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getNonce() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
