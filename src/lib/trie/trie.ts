type TrieNode = {
    char: string;
    isWord: boolean;
    nodeMap: Map<string, TrieNode>;
    visitCount: number;
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
    const hasChar = node.nodeMap.has(char);
    const charNode = node.nodeMap.get(char);
    node.nodeMap.set(char, {
        char,
        isWord: hasChar ? charNode!.isWord : word.length === 1,
        nodeMap: hasChar ? charNode!.nodeMap : new Map<string, TrieNode>(),
        visitCount: hasChar ? charNode!.visitCount + 1 : 0
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
            nodeMap: new Map<string, TrieNode>,
            visitCount: 0
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
            // sort the entries in nodeMap by visitCount in descending order; prioritizes more commonly used nodes
            let sortedByVisitCount = [...wordSearch.nodeMap.entries()].sort(([_key1, node1], [_key2, node2]) => node2.visitCount - node1.visitCount);

            sortedByVisitCount.forEach(([_key, node]) => {
                this.outputCount++;
                res = res.concat(this.autocomplete(word + node.char, originalWord, maxLength));
            })
        }

        return res;
    }
}
