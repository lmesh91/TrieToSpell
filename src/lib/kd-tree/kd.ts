// Methods for the kd-tree itself
import type { Word, KDNode, KDInternal, RangeVec } from './types';
import { WORD_VEC_SIZE } from './types';
import { partition_words, encode_word, word_vec_dist, word_range_dist } from './util';

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

// Helper function that searches for a word in a KDTree
function _search_kd_tree(node: KDNode | undefined, word: Word) : boolean {
    if (node == undefined) return false;
    if ('vec' in node) { // of type Word
        return (node as Word).str == word.str;
    } else {
        let internal = node as KDInternal;
        // Decide to look at left or right subtree
        if (word.vec[internal.dim] <= internal.split) {
            return _search_kd_tree(internal.left, word);
        } else {
            return _search_kd_tree(internal.right, word);
        }
    }
}

// Helper function that inserts a word in a KDTree
function _insert_kd_tree(node: KDNode | undefined, word: Word) : KDNode | undefined {
    if (node == undefined) return word;
    if ('vec' in node) { // of type Word
        if ((node as Word).str == word.str) {
            return node; // Word already in tree
        }
        // Add word to tree
        return _build_kd_tree([node as Word, word], 0, 2);
    } else {
        const internal = node as KDInternal;
        // Decide to look at left or right subtree
        if (word.vec[internal.dim] <= internal.split) {
            internal.left = _insert_kd_tree(internal.left, word);
            return node;
        } else {
            internal.right = _insert_kd_tree(internal.right, word);
            return node;
        }
    }
}

// Search for nearest neighbors of a word in a KDTree
// Looks for a finite number of neighbors, all within a given distance from a word
function _nn_search_kd_tree(node: KDNode | undefined, range: RangeVec, word: Word, num_neighbors: number, threshold: number) : Array<[string, number]> {
    if (node == undefined) return [];
    if ('vec' in node) { // leaf
        let dist = word_vec_dist(word.vec, node.vec);
        if (dist <= threshold) {
            return [[node.str, dist]];
        } else {
            return [];
        }
    }
    // Check if the range vector is already out of range
    if (word_range_dist(range, word.vec) > threshold) return [];
    // Check left and right branches
    const internal = node as KDInternal;
    const lrange = structuredClone(range); // Needs to deep copy so original range is unchanged
    const rrange = structuredClone(range);
    lrange[internal.dim].max = internal.split;
    rrange[internal.dim].min = internal.split;
    const lneighbors = _nn_search_kd_tree(internal.left, lrange, word, num_neighbors, threshold);
    const rneighbors = _nn_search_kd_tree(internal.right, rrange, word, num_neighbors, threshold);
    let neighbors = [...lneighbors, ...rneighbors];
    neighbors.sort((a, b) => a[1] - b[1]);
    return neighbors.slice(0, num_neighbors);
}

export class KDTree {
    head?: KDNode;

    // Precondition: all words in the array are unique
    constructor(words: string[]) {
        // Convert strings to Words
        const word_vecs : Word[] = words.map(word => encode_word(word));
        this.head = _build_kd_tree(word_vecs, 0, word_vecs.length);
    }

    search(word: string) : boolean {
        return _search_kd_tree(this.head, encode_word(word));
    }

    insert(word: string) : undefined {
        this.head = _insert_kd_tree(this.head, encode_word(word));
    }

    autocorrect(word: string) : Array<[string, number]> {
        // The initial construction of the RangeVec sets the minimum and maximum of every dimension
        // to +/-Infinity while ensuring that each object is at a different place in memory
        return _nn_search_kd_tree(this.head, Array.from({length: WORD_VEC_SIZE}, () => ({ min: -Infinity, max: Infinity}) ) as RangeVec, 
                                  encode_word(word), 5, 10);
    }
}