// Methods for the kd-tree itself
import { type Word, type KDNode, type KDTree } from './types';
import { partition_words, encode_word } from './util';

// Helper function that returns a tree node
function _build_kd_tree(words: Word[]) : KDNode | undefined {
    // Handle base cases - 0 or 1 word
    if (words.length == 0) {
        return undefined;
    }
    if (words.length == 1) {
        // Make a leaf node
        return words[0];
    }
    // Use partition to make an internal node
    const partition = partition_words(words);
    return {
        // Value of the dimension that was split, calculated by
        // looking at the last element of the left side
        split: partition[1][0][partition[1][0].length-1].vec[partition[0]],
        dim: partition[0],
        left: _build_kd_tree(partition[1][0]),
        right: _build_kd_tree(partition[1][1])
    };
}

export function build_kd_tree(words: string[]) : KDTree {
    // Convert strings to Words
    const word_vecs : Word[] = words.map(word => encode_word(word));
    return { head: _build_kd_tree(word_vecs) };
}