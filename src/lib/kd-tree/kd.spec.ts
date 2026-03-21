import { describe, test, expect } from 'vitest';
import { LENGTH_FAC, partition_words, encode_word } from './util';
import { WORD_VEC_SIZE } from './types';

describe('encode_word', () => {
    test('example', () => {
        var trie_encoding = encode_word('trick').vec
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
        var trie_encoding = encode_word('').vec
        expect(trie_encoding[0]).toBe(0);
        expect(trie_encoding[1]).toBe(4.5);
        expect(trie_encoding[2]).toBe(1);
    })
    test('invalid', () => {
        var trie_encoding = encode_word('TRIE').vec
        expect(trie_encoding[0]).toBe(4*LENGTH_FAC);
        expect(trie_encoding[1]).toBe(4.5);
        expect(trie_encoding[2]).toBe(1);
    })
})

describe('partition_words', () => {
    var be = encode_word('be');
    var cut = encode_word('cut');
    var deep = encode_word('deep');
    test('example', () => {
        var part = partition_words([be, cut, deep], 0);
        expect(part![0].length).toBe(2);
        expect(part![1].length).toBe(1);
        expect(part![0][0].vec[0]).toBe(2*LENGTH_FAC);
        expect(part![0][1].vec[0]).toBe(3*LENGTH_FAC);
        expect(part![1][0].vec[0]).toBe(4*LENGTH_FAC);
    })
    test('empty', () => {
        var part = partition_words([], 0);
        expect(part![0].length).toBe(0);
        expect(part![1].length).toBe(0);
    })
    test('invalid', () => {
        var part1 = partition_words([], -1);
        var part2 = partition_words([], WORD_VEC_SIZE);
        var part3 = partition_words([], 0.5);
        expect(part1).toBe(null);
        expect(part2).toBe(null);
        expect(part3).toBe(null);
    })
    test('median moves', () => {
        var part = partition_words([be, cut, cut, cut, deep], 0);
        expect(part![0].length).toBe(4);
        expect(part![1].length).toBe(1);
    })
})