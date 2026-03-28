import { WORD_VEC_SIZE, WORD_LETTERS, type Word, type WordVec, type RangeVec } from './types';

// Maps each letter into numbers based on their position on a QWERTY keyboard
export const LETTER_ENCODINGS : {[key : string] : [number, number]} = {
    "q": [0, 0],
    "w": [1, 0],
    "e": [2, 0],
    "r": [3, 0],
    "t": [4, 0],
    "y": [5, 0],
    "u": [6, 0],
    "i": [7, 0],
    "o": [8, 0],
    "p": [9, 0],
    "a": [0.25, 1],
    "s": [1.25, 1],
    "d": [2.25, 1],
    "f": [3.25, 1],
    "g": [4.25, 1],
    "h": [5.25, 1],
    "j": [6.25, 1],
    "k": [7.25, 1],
    "l": [8.25, 1],
    "z": [0.75, 2],
    "x": [1.75, 2],
    "c": [2.75, 2],
    "v": [3.75, 2],
    "b": [4.75, 2],
    "n": [5.75, 2],
    "m": [6.75, 2],
}
// The "distance" between words added when a letter is inserted/removed
export const LENGTH_FAC = 10;

// Converts each word into an encoding based on its length and characters
export function encode_word(word: string) : Word {
    const vec: WordVec = Array(WORD_VEC_SIZE).fill(0) as WordVec;
    vec[0] = word.length * LENGTH_FAC;
    for (let i = 0; i < WORD_LETTERS; i++) {
        // If there is an a-z letter here, use its encoding
        if (i < word.length && word[i] in LETTER_ENCODINGS) {
            vec[2*i+1] = LETTER_ENCODINGS[word[i]][0];
            vec[2*i+2] = LETTER_ENCODINGS[word[i]][1];
        } else {
            // Use a neutral value
            vec[2*i+1] = 4.5;
            vec[2*i+2] = 1;
        }
    }
    return {str: word, vec: vec}
}

// Splits a list of words into two parts; one where a given dimension is at most the median,
// and one where it is greater than the median.
export function partition_words_dim(words: Word[], dim: number, start: number, end: number) : [Word[], number] | null {
    // Check for invalid dimension
    if (dim % 1 != 0 || dim < 0 || dim >= WORD_VEC_SIZE) {
        return null;
    }
    // Sort by the given dimension
    // A potential improvement here is creating a sorting algorithm
    // to do this in-place, and utilize the limited range of the values
    const subarray = words.slice(start, end);
    subarray.sort((a, b) => a.vec[dim] - b.vec[dim]);
    
    // Insert the sorted elements back to the words array
    for (let i = 0; i < subarray.length; i++) {
        words[start + i] = subarray[i];
    }
    // Determine partition location
    const partition = Math.floor((start+end-1) / 2);
    // If the median value occurs multiple times, we want
    // to partition at the last median (or just before it)
    let partl = partition
    let partr = partition
    while (partr < end - 1 && words[partr].vec[dim] == words[partr+1].vec[dim]) {
        partr++;
    }
    while (partl > start && words[partl].vec[dim] == words[partl-1].vec[dim]) {
        partl--;
    }
    // We need to decrement once more so that partl is the value before the first instance of median
    partl--;
    
    // Figure out which partition to use
    // Use left partition if the larger part is smaller
    if (end-(partl+1) < partr+1-start) {
        return [words, partl+1];
    } else {
        return [words, partr+1];
    }
}

// Pick a good partition to use
const PARTITION_QUALITY = 0.6
export function partition_words(words: Word[], start: number, end: number) : [number, [Word[], number]] {
    // Try every possible partition, stopping early past a cutoff
    let best_partition = -1;
    let best_accuracy = Infinity;
    const partitions = Array(WORD_VEC_SIZE).fill(null);
    for (let i = 0; i < WORD_VEC_SIZE; i++) {
        partitions[i] = partition_words_dim(words, i, start, end);
        const accuracy = Math.max(partitions[i][1]-start,end-partitions[i][1])
        if (accuracy <= PARTITION_QUALITY * (end-start)) {
            return [i, partitions[i]];
        } else if (accuracy < best_accuracy) {
            best_partition = i;
            best_accuracy = accuracy;
        }
    }
    return [best_partition, partitions[best_partition]]
}

// We use Manhattan distance rather than Pythagorean distance
export function word_vec_dist(a: WordVec, b: WordVec) : number {
    let dist: number = 0;
    for (let i = 0; i < WORD_VEC_SIZE; i++) {
        dist += Math.abs(a[i]-b[i]);
    }
    return dist;
}

// Returns the minimum distance between a word and words in a given range
export function word_range_dist(a: RangeVec, b: WordVec) : number {
    let dist: number = 0;
    for (let i = 0; i < WORD_VEC_SIZE; i++) {
        if (b[i] > a[i].max) {
            dist += b[i]-a[i].max;
        } else if (b[i] < a[i].min) {
            dist += a[i].min-b[i];
        }
    }
    return dist;
}