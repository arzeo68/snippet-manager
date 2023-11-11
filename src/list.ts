import * as vscode from 'vscode';
import { SnipperList, Snippet } from './Inteface/snipper.interface';


const detectLanguage = (): string => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const document = activeEditor.document;
      const languageId = document.languageId;
      return languageId;
    }
    return '';
}

const getSnippetsToDisplay = (snipperList: SnipperList, languageId: string): Snippet[] => {
    const snippetsToDisplay: Snippet[] = [];
    if (snipperList.map.get(languageId) !== undefined)
        for (const ids of snipperList.map.get(languageId)!) snippetsToDisplay.push(snipperList.snippets[ids]);

    if (snippetsToDisplay.length === 0) {
        vscode.window.showErrorMessage('Snipper: No snippets found for this language');
        snippetsToDisplay.push({ label: 'No snippets found for this language', description: '', language: "", snippet: [] });
    } 
    return snippetsToDisplay;
}

const convertToWritableSnippets = (snippet: string[]): string => {
    let writableSnippet = '';
    for (const line of snippet) {
        writableSnippet += line + '\n';
    }
    return writableSnippet;
}

export const listSnippets = (snippets: SnipperList) => {
    const language = detectLanguage();
    const snippetsToDisplay = getSnippetsToDisplay(snippets, language);

    vscode.window.showQuickPick(snippetsToDisplay, { placeHolder: 'Select a snippet:' })
    .then(selectedSnippet => {
        if (selectedSnippet) {
            if (vscode.window.activeTextEditor) {
                vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(convertToWritableSnippets(selectedSnippet.snippet)));
            }
        }
    });
}


