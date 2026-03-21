import { describe, it, expect } from 'vitest';
import { encode_word } from './util';

describe('encode_word', () => {
    it('example word', () => {
        var trie_encoding = encode_word('trie').vec
        expect(trie_encoding[0]).toBe(4);
        expect(trie_encoding[1]).toBe(0.48);
        expect(trie_encoding[2]).toBe(0.36);
        expect(trie_encoding[3]).toBe(0.84);
        expect(trie_encoding[4]).toBe(0.24);
        expect(trie_encoding[5]).toBe(0.5);
        expect(trie_encoding[15]).toBe(0.5);
    })
    it('empty word', () => {
        var trie_encoding = encode_word('').vec
        expect(trie_encoding[0]).toBe(0);
        expect(trie_encoding[1]).toBe(0.5);
        expect(trie_encoding[15]).toBe(0.5);
    })
    it('invalid word', () => {
        var trie_encoding = encode_word('TRIE').vec
        expect(trie_encoding[0]).toBe(4);
        expect(trie_encoding[1]).toBe(0.5);
        expect(trie_encoding[4]).toBe(0.5);
        expect(trie_encoding[15]).toBe(0.5);
    })
    it('long word', () => {
        var trie_encoding = encode_word('antidisestablishmentarianism').vec
        expect(trie_encoding[0]).toBe('antidisestablishmentarianism'.length);
        expect(trie_encoding[1]).toBe(0.04);
        expect(trie_encoding[4]).toBe(0.84);
        expect(trie_encoding[15]).toBe(0.16);
    })
})