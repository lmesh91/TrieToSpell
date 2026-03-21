// These types are used to make fixed-length vectors for word encodings
// See https://stackoverflow.com/questions/52489261/can-i-define-an-n-length-tuple-type
type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

// Fixed-length vector of numbers to store words
// We store the word length followed by horizontal positions of the first 15 letters
export const WORD_VEC_SIZE = 16
export type WordVec = Tuple<number, typeof WORD_VEC_SIZE>

// Stores all the information about a word
export type Word = {
    str: string;
    vec: WordVec;
};

// Types for the k-d tree

// Because leaf nodes and internal nodes store different data,
// they are represented as separate types.
export type KDLeaf = {
    word: Word;
    level: number;
};
export type KDInternal = {
    split: number;
    level: number;
    left?: KDNode;
    right?: KDNode;
};
export type KDNode = KDLeaf | KDInternal;

export type KDTree = {
    head?: KDNode
}