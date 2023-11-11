import * as vscode from 'vscode';
import axios from 'axios';
import { EMPTY_SNIPPER_LIST, buildSnippetMap } from './parse';
import { SnipperList } from './Inteface/snipper.interface';

const retreiveUrl = async () => {
	const config: string | undefined = vscode.workspace.getConfiguration().get('snipper.url');
	if (config === undefined) vscode.window.showErrorMessage('Snipper: No URL found in the settings, Default URL will be used');

    return config || "https://raw.githubusercontent.com/arzeo68/snippet/master/snippet.json";
}

// get the json file from the url
export const getSnippets = (): Thenable<SnipperList> => {
	return vscode.window.withProgress(
		{
		  location: vscode.ProgressLocation.Notification,
		  title: "Loading your snippets...",
		  cancellable: false, // Set to true if you want to allow cancellation
		},
		async () => {
			try {
                const url = await retreiveUrl();
				const response = await axios.get(url);
				vscode.window.showInformationMessage('Snipper: Snippets loaded');
                if (response?.data === undefined) { vscode.window.showErrorMessage('Snipper: No snippets found in the URL'); return EMPTY_SNIPPER_LIST;}
				return {map: buildSnippetMap(response.data), snippets: response.data}
			} catch (error) {
				vscode.window.showErrorMessage('Snipper: Please set the URL of your snippets in the settings');
				return EMPTY_SNIPPER_LIST;
			}
		}
	);
}