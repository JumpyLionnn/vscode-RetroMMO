import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('retrommo.open', () => {
		const panel = vscode.window.createWebviewPanel("retrommo", "RetroMMO", vscode.ViewColumn.Beside, {
			enableScripts: true,
			enableForms: true
		});

		// And set its HTML content
		panel.webview.html = getWebviewContent();
		panel.iconPath = vscode.Uri.file(context.extensionPath + '/assets/retrommo.png');
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>RetroMMO</title>
		<style>
			*{border: 0;}
			body, html{margin:0;padding:0;height: 100vh;}
			#game{
				width: 100%;
				height: 100vh;
			}
		</style>
	</head>
	<body>
	<iframe id="game" src="https://play.retro-mmo.com"></iframe>
	</body>
	</html>`;
}

// this method is called when your extension is deactivated
export function deactivate() {}
