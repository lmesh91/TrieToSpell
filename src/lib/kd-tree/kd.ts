// Methods for the kd-tree itself
import { type Word, type KDNode } from './types';
import { partition_words, encode_word } from './util';

// Helper function that returns a tree node
function _build_kd_tree(words: Word[], start: number, end: number) : KDNode | undefined {
    // Handle base cases - 0 or 1 word
    if (end-start == 0) {
        return undefined;
    }
    if (end-start == 1) {
        // Make a leaf node
        return words[start];
    }
    // Use partition to make an internal node
    const partition = partition_words(words, start, end);
    return {
        // Value of the dimension that was split, calculated by
        // looking at the last element of the left side
        split: partition[1][0][partition[1][1]-1].vec[partition[0]],
        dim: partition[0],
        left: _build_kd_tree(partition[1][0], start, partition[1][1]),
        right: _build_kd_tree(partition[1][0], partition[1][1], end)
    };
}

// TODO - move KDTree to a class
export class KDTree {
    head?: KDNode;

    constructor(words: string[]) {
        // Convert strings to Words
        const word_vecs : Word[] = words.map(word => encode_word(word));
        return { head: _build_kd_tree(word_vecs, 0, word_vecs.length) };
    } 
}