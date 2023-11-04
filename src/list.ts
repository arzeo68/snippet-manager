import * as vscode from 'vscode';
import { Snippet } from './snipper.interface';


const detectLanguage = (): string => {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
      const document = activeEditor.document;
      const languageId = document.languageId;
      return languageId;
    }
    return '';
}

const getSnippetsToDisplay = (snippets: any, languageId: string): Snippet[] => {
    const snippetsToDisplay: Snippet[] = [];

    if (snippets[languageId] !== undefined)
        for (const snippet of snippets[languageId]) snippetsToDisplay.push(snippet);

    if (snippetsToDisplay.length === 0) {
        vscode.window.showErrorMessage('Snipper: No snippets found for this language');
        snippetsToDisplay.push({ label: 'No snippets found for this language', description: '', snippet: [] });
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

export const listSnippets = (snippets: JSON) => {
    const language = detectLanguage();
    const snippetsToDisplay = getSnippetsToDisplay(snippets, language);

    vscode.window.showQuickPick(snippetsToDisplay, { placeHolder: 'Select a snippet:' })
    .then(selectedSnippet => {
        if (selectedSnippet) {
            if (vscode.window.activeTextEditor)
                vscode.window.activeTextEditor.insertSnippet(new vscode.SnippetString(convertToWritableSnippets(selectedSnippet.snippet)));
        }
    });
}

