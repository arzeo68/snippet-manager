export interface Snippet {
    label: string;
    description: string;
    language: string;
    snippet: string[];
}

export interface SnipperList {
    map: Map<string, number[]>;
    snippets: Snippet[];
}
