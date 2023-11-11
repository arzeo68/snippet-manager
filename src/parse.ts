import { Snippet } from "./Inteface/snipper.interface";
import * as vscode from 'vscode';

export const EMPTY_SNIPPER_LIST = {map: new Map<string, number[]>(), snippets: []}; 

export const buildSnippetMap = (rawSnippets: Snippet[]): Map<string, number[]> => {
    const snippetMap = new Map<string, number[]>();
    rawSnippets.forEach((snippet: Snippet, idx: number) => {
        if (snippet.language === undefined) {
            const errorMessage = `Snipper: ${snippet.label} has an invalid language: ${snippet.language}`;
            vscode.window.showErrorMessage(errorMessage);
        };
        const languages = snippet.language.split(',');
        languages.forEach((language: string) => {
            if (snippetMap.get(language) !== undefined) snippetMap.get(language)?.push(idx);
            else snippetMap.set(language, [idx]);
        });
    });
    return snippetMap;
}