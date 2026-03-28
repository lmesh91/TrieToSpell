import { describe, test, expect } from 'vitest';
import { LENGTH_FAC, partition_words_dim, encode_word } from './util';
import { WORD_VEC_SIZE } from './types';
import { KDTree } from './kd';

describe('encode_word', () => {
    test('example', () => {
        const trie_encoding = encode_word('trick').vec
        expect(trie_encoding[0]).toBe(5*LENGTH_FAC);
        expect(trie_encoding[1]).toBe(4);
        expect(trie_encoding[2]).toBe(0);
        expect(trie_encoding[3]).toBe(3);
        expect(trie_encoding[4]).toBe(0);
        expect(trie_encoding[5]).toBe(7);
        expect(trie_encoding[6]).toBe(0);
        expect(trie_encoding[7]).toBe(2.75);
        expect(trie_encoding[8]).toBe(2);
        expect(trie_encoding[9]).toBe(7.25);
        expect(trie_encoding[10]).toBe(1);
        expect(trie_encoding[61]).toBe(4.5);
        expect(trie_encoding[62]).toBe(1);
    })
    test('empty', () => {
        const trie_encoding = encode_word('').vec
        expect(trie_encoding[0]).toBe(0);
        expect(trie_encoding[1]).toBe(4.5);
        expect(trie_encoding[2]).toBe(1);
    })
    test('invalid', () => {
        const trie_encoding = encode_word('TRIE').vec
        expect(trie_encoding[0]).toBe(4*LENGTH_FAC);
        expect(trie_encoding[1]).toBe(4.5);
        expect(trie_encoding[2]).toBe(1);
    })
})

describe('partition_words_dim', () => {
    const be = encode_word('be');
    const cut = encode_word('cut');
    const deep = encode_word('deep');
    test('example', () => {
        const part = partition_words_dim([be, cut, deep], 0, 0, 3);
        expect(part![1]).toBe(2);
        expect(part![0][0].vec[0]).toBe(2*LENGTH_FAC);
        expect(part![0][1].vec[0]).toBe(3*LENGTH_FAC);
        expect(part![0][2].vec[0]).toBe(4*LENGTH_FAC);
    })
    test('empty', () => {
        const part = partition_words_dim([], 0, 0, 0);
        expect(part![0].length).toBe(0);
        expect(part![1]).toBe(0);
    })
    test('invalid', () => {
        const part1 = partition_words_dim([], -1, 0, 0);
        const part2 = partition_words_dim([], WORD_VEC_SIZE, 0, 0);
        const part3 = partition_words_dim([], 0.5, 0, 0);
        expect(part1).toBe(null);
        expect(part2).toBe(null);
        expect(part3).toBe(null);
    })
    test('median moves', () => {
        const part = partition_words_dim([be, cut, cut, cut, deep], 0, 0, 5);
        expect(part![1]).toBe(4);
    })
    const retrad = encode_word('retrad');
    const tetras = encode_word('tetras');
    const tetrad = encode_word('tetrad');
    // In this case, the only "good" way to split the search is by
    // having two words on the right and one on the left
    test('large right branch', () => {
        const part = partition_words_dim([retrad, tetras, tetrad], 1, 0, 3);
        expect(part![1]).toBe(1);
    })
    test('sub-arrays', () => {
        const part1 = partition_words_dim([be, retrad, tetras, tetrad], 1, 1, 4);
        expect(part1![1]).toBe(2);
        const part2 = partition_words_dim([retrad, tetras, tetrad, be], 1, 0, 3);
        expect(part2![1]).toBe(1);
        const part3 = partition_words_dim([retrad, tetras, tetrad, be], 1, 2, 4);
        expect(part3![1]).toBe(3);
    })
})

describe('kd_tree', () => {
    test('empty', () => {
        let empty = new KDTree([]);
        expect(empty.search("something")).toBe(false);
        expect(empty.autocorrect("something").length).toBe(0);
        empty.insert("something");
        expect(empty.search("something")).toBe(true);
    })
    let kd_words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    let kd = new KDTree(kd_words);
    test('search', () => {
        for (let i = 0; i < kd_words.length; i++) {
            expect(kd.search(kd_words[i])).toBe(true);
        };
        expect(kd.search("eleven")).toBe(false);
        expect(kd.search("on")).toBe(false);
    })
    test('insert', () => {
        kd.insert("ten"); // Should not modify the tree
        kd.insert("eleven");
        kd.insert("twelve");
        expect(kd.search("ten")).toBe(true);
        expect(kd.search("eleven")).toBe(true);
        expect(kd.search("twelve")).toBe(true);
    })
    test('autocorrect', () => {
        expect(kd.autocorrect("tem")[0][0]).toBe("ten");
        expect(kd.autocorrect("sedan")[0][0]).toBe("seven");
        expect(kd.autocorrect("pzbvw").length).toBe(0);
    })
})