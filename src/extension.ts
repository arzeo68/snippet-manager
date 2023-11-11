// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { listSnippets } from './list';
import { getSnippets } from './update';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	let snippets = await getSnippets();
	// COMMANDS
	context.subscriptions.push(vscode.commands.registerCommand('extension.update', async () => { snippets = await getSnippets(); }));
	context.subscriptions.push(vscode.commands.registerCommand('extension.list', () => {listSnippets(snippets); }));
}
