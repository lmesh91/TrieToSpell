import { describe, test, expect } from "vitest";
import { Trie } from "./trie";

describe("trie constructor/search", () => {
    test("example", () => {
        const trie = new Trie(["apple", "application"]);
        const appleSearch = trie.search("apple")!;
        expect(appleSearch.isWord).toBe(true);
        expect(appleSearch.char).toBe("e");
        expect(appleSearch.nodeMap.size).toBe(0);

        const applSearch = trie.search("appl")!;
        expect(applSearch.isWord).toBe(false);
        expect(applSearch.char).toBe("l");
        expect(applSearch.nodeMap.size).toBe(2);

        const applicationSearch = trie.search("application")!;
        expect(applicationSearch.isWord).toBe(true);
        expect(applicationSearch.char).toBe("n");
        expect(applicationSearch.nodeMap.size).toBe(0);
    })

    test("empty", () => {
        const trie = new Trie([]);
        expect(trie.head.char).toBe("");
        expect(trie.head.isWord).toBe(false);
        expect(trie.head.nodeMap.size).toBe(0);
    })
})

describe("trie insert/search", () => {
    test("example", () => {
        const trie = new Trie([]);
        trie.insert("apple");
        trie.insert("application");

        const appleSearch = trie.search("apple")!;
        expect(appleSearch.isWord).toBe(true);
        expect(appleSearch.char).toBe("e");
        expect(appleSearch.nodeMap.size).toBe(0);

        const applSearch = trie.search("appl")!;
        expect(applSearch.isWord).toBe(false);
        expect(applSearch.char).toBe("l");
        expect(applSearch.nodeMap.size).toBe(2);

        const applicationSearch = trie.search("application")!;
        expect(applicationSearch.isWord).toBe(true);
        expect(applicationSearch.char).toBe("n");
        expect(applicationSearch.nodeMap.size).toBe(0);
    })

    test("alphabet", () => {
        const trie = new Trie([]);

        // a-z in ASCII
        for (let i = 97; i <= 122; ++i) {
            trie.insert(String.fromCharCode(i));
        }

        expect(trie.head.nodeMap.size).toBe(26);
    })
})

describe("trie search", () => {
    test("invalid", () => {
        const trie = new Trie(["apple"]);
        expect(trie.search("application")).toBe(undefined);
    })
})
