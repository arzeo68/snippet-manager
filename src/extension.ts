// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { listSnippets } from './list';
import axios from 'axios';

// get the json file from the url
const getSnippets = (): Thenable<JSON> => {


	const config: string | undefined = vscode.workspace.getConfiguration().get('snipper.url');
	if (config === undefined) vscode.window.showErrorMessage('Snipper: No URL found in the settings, Default URL will be used');

	const url: string = config || "https://raw.githubusercontent.com/arzeo68/snippet/master/snippet.json";
	if (url === "") vscode.window.showErrorMessage('Snipper: Please set the URL of your snippets in the settings');

	return vscode.window.withProgress(
		{
		  location: vscode.ProgressLocation.Notification,
		  title: "Loading your snippets...",
		  cancellable: false, // Set to true if you want to allow cancellation
		},
		async () => {
			try {
				const response = await axios.get(url);
				vscode.window.showInformationMessage('Snipper: Snippets loaded');
				return response?.data;
			} catch (error) {
				vscode.window.showErrorMessage('Snipper: Please set the URL of your snippets in the settings');
				return {};
			}
		}
	);
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	let snippets = await getSnippets() || {};
	// COMMANDS
	context.subscriptions.push(vscode.commands.registerCommand('extension.list', () => {listSnippets(snippets); }));
	context.subscriptions.push(vscode.commands.registerCommand('extension.update', async () => {snippets = await getSnippets() || {}; }));
}
