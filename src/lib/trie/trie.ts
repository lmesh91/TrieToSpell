type TrieNode = {
    char: string;
    isWord: boolean;
    nodeMap: Map<string, TrieNode>;
}

function _search_trie(node: TrieNode, word: string): TrieNode | undefined {
    if (word.length === 0) {
        return node;
    }

    if (!node.nodeMap.has(word[0])) {
        return undefined;
    }

    return _search_trie(node.nodeMap.get(word[0])!, word.substring(1));
}

function _insert_trie(node: TrieNode, word: string): void {
    if (word.length === 0) {
        return;
    }

    const char = word[0];
    const alreadyWord = node.nodeMap.has(char) ? node.nodeMap.get(char)!.isWord : false;
    node.nodeMap.set(char, {
        char,
        isWord: alreadyWord || word.length === 1,
        nodeMap: node.nodeMap.has(char) ? node.nodeMap.get(char)!.nodeMap : new Map<string, TrieNode>()
    });

    _insert_trie(node.nodeMap.get(char)!, word.substring(1));
}

function _build_trie(head: TrieNode, words: string[]): void {
    for (const word of words) {
        _insert_trie(head, word);
    }
}

export class Trie {
    head: TrieNode;
    outputCount: number;

    constructor(words: string[]) {
        this.head = {
            char: "",
            isWord: false,
            nodeMap: new Map<string, TrieNode>
        };

        this.outputCount = 0;
        _build_trie(this.head, words);
    }

    search(word: string): TrieNode | undefined {
        return _search_trie(this.head, word);
    }

    insert(word: string): void {
        _insert_trie(this.head, word);
    }

    autocorrect(word: string, originalWord: string): string[] {
        let res: string[] = [];

        this.outputCount = 0;
        for (let i = 0; i < word.length; ++i) {
            res = res.concat(this.autocomplete(word.substring(0, word.length - i), originalWord, word.length * 1.5));

            if (res.includes(originalWord)) {
                break;
            }
        }

        return res;
    }

    autocomplete(word: string, originalWord: string, maxLength: number): string[] {
        if (word.length < 1 || word.length > maxLength || this.outputCount > 1000
        ) {
            return [];
        }

        let res: string[] = [];
        const wordSearch = this.search(word);
        const isWord = wordSearch !== undefined && wordSearch.isWord;

        // return early if the original word is spelled correctly
        if (isWord && word === originalWord) {
            return [word];
        }

        // add word to res otherwise
        if (isWord) {
            res = res.concat(word);
        }

        // finding words that have word as a prefix
        if (wordSearch !== undefined) {
            wordSearch.nodeMap.forEach((value, key, map) => {
                this.outputCount++;
                res = res.concat(this.autocomplete(word + key, originalWord, maxLength));
            })
        }

        return res;
    }
}
