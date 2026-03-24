import wordList from "./assets/words_alpha.txt?raw";

export function wordListToArray(): string[] | undefined {
	try {
		return wordList.split("\r\n");
	} catch (e) {
		console.error(e);
	}
}
