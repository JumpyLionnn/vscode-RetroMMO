import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('retrommo.open', () => {
		const panel = vscode.window.createWebviewPanel("retrommo", "RetroMMO", vscode.ViewColumn.Beside, {
			enableScripts: true,
			enableForms: true,
			retainContextWhenHidden: true
		});

		// And set its HTML content
		panel.webview.html = getWebviewContent();
		panel.iconPath = vscode.Uri.file(context.extensionPath + '/assets/retrommo.png');
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent() {
	const config = vscode.workspace.getConfiguration('retrommo');
	const kind = <string>config.get("kind", "regular");
	let url: string;
	if(kind === "localhost (dev)"){
		url = "http://localhost:" + config.get("localhost-port", 3000);
	}
	else{
		url = urlLookup[kind];
	}
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
		<iframe id="game" src="${url}"></iframe>
	</body>
	</html>`;
}


const urlLookup: {[kind: string]: string} = {
	"regular": "https://play.retro-mmo.com",
	"development version (retrommo2)": "https://retrommo2.herokuapp.com/",
	"bots": "https://retrommo-bots.herokuapp.com"
};

// this method is called when your extension is deactivated
export function deactivate() {}
