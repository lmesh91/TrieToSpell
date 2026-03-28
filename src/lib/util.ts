import wordList from "./assets/words_alpha.txt?raw";

// Returns the word list as an array of strings
export function wordListToArray(): string[] | undefined {
  try {
    return wordList.split("\r\n");
  } catch (e) {
    console.error(e);
  }
}

/**
 * Returns the number of different characters between two strings.
 * @param a
 * @param b
 */
export function numDifferentChars(a: string, b: string): number {
  const mapA = new Map<string, number>();
  const mapB = new Map<string, number>();

  for (let c = 0; c < a.length; c++) {
    const char = a[c];
    mapA.set(char, (mapA.get(char) ?? 0) + 1);
  }

  for (let c = 0; c < b.length; c++) {
    const char = b[c];
    mapB.set(char, (mapB.get(char) ?? 0) + 1);
  }

  let count = 0;

  mapA.forEach((value, key, map) => {
    const bValue = mapB.get(key) ?? 0;
    count += Math.abs(value - bValue);
  });

  mapB.forEach((value, key, map) => {
    if (!mapA.has(key)) {
      count += value;
    }
  });

  return count;
}

/**
 * For a given input string, splits into an array of words.
 * Words are delimited by spaces.
 * Words can contain punctuation marks, UNLESS they are the last character;
 * e.g.: "The r.ed fox" 'r.ed' is a word
 * but in "The red. Fox" 'red.' is not the word; 'red' is.
 * This helps correctly identify typos.
 * @param inputString
 */
export function splitIntoWords(inputString: string) {
  let startIndex = 0;
  let wordIndices = [];
  const hasAlphaAhead = /^[^ ]*\w/;
  for (let c = 0; c < inputString.length; c++) {
    let isPunctuation = /[.,;:!??\-_(){}"']/.test(inputString[c]);
    let isSpace = inputString[c] === " " || inputString[c] === "\n";

    const nextChar = inputString[c + 1];
    const isTerminal = !nextChar || nextChar === " ";
    let isWordBreak =
      isSpace ||
      (isPunctuation &&
        (isTerminal || !hasAlphaAhead.test(inputString.slice(c))));

    if (isWordBreak) {
      if (c > startIndex) {
        wordIndices.push({
          startIndex,
          endIndex: c,
          word: inputString.slice(startIndex, c),
        });
      }
      startIndex = c + 1;

      if (isPunctuation && nextChar === " ") {
        c++;
        startIndex = c + 1;
      }
    }
  }

  if (startIndex < inputString.length) {
    const lastWord = inputString.slice(startIndex);
    // Ensure the last "word" isn't just trailing dots
    if (/\w/.test(lastWord)) {
      wordIndices.push({
        startIndex,
        endIndex: inputString.length,
        word: lastWord,
      });
    }
  }

  return wordIndices;
}
