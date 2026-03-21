import { WORD_VEC_SIZE, type Word, type WordVec } from './types';

// Maps each letter into a number from 0-1 based on its horizontal position on a QWERTY keyboard
export const LETTER_ENCODINGS : {[key : string] : number} = {
    "q": 0,
    "a": 0.04,
    "z": 0.08,
    "w": 0.12,
    "s": 0.16,
    "x": 0.2,
    "e": 0.24,
    "d": 0.28,
    "c": 0.32,
    "r": 0.36,
    "f": 0.4,
    "v": 0.44,
    "t": 0.48,
    "g": 0.52,
    "b": 0.56,
    "y": 0.6,
    "h": 0.64,
    "n": 0.68,
    "u": 0.72,
    "j": 0.76,
    "m": 0.8,
    "i": 0.84,
    "k": 0.88,
    "o": 0.92,
    "l": 0.96,
    "p": 1
}

// Converts each word into an encoding based on its length and characters
export function encode_word(word: string) : Word {
    var vec: WordVec = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    vec[0] = word.length;
    for (var i = 1; i < WORD_VEC_SIZE; i++) {
        // If there is an a-z letter here, use its encoding
        if (i <= word.length && word[i-1] in LETTER_ENCODINGS) {
            vec[i] = LETTER_ENCODINGS[word[i-1]]
        } else {
            vec[i] = 0.5 // Use a neutral value
        }
    }
    return {str: word, vec: vec}
}