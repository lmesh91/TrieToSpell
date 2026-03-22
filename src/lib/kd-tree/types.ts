// These types are used to make fixed-length vectors for word encodings
// See https://stackoverflow.com/questions/52489261/can-i-define-an-n-length-tuple-type
type Tuple<T, N extends number> = N extends N ? number extends N ? T[] : _TupleOf<T, N, []> : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _TupleOf<T, N, [T, ...R]>;

// Fixed-length vector of numbers to store words
// We store the word length followed by horizontal and vertical positions
// Because the longest word in the list has 31 letters, we use vectors of size 63
export const WORD_VEC_SIZE = 63
export const WORD_LETTERS = (WORD_VEC_SIZE-1)/2
export type WordVec = Tuple<number, typeof WORD_VEC_SIZE>

// Stores all the information about a word
export type Word = {
    str: string;
    vec: WordVec;
};

// Types for the k-d tree

// Of note, unlike traditional k-d trees, the split dimension isn't sequential;
// this is due to some dimensions having much higher variance than others.
export type KDInternal = {
    split: number;
    dim: number;
    left?: KDNode;
    right?: KDNode;
};
export type KDNode = Word | KDInternal;