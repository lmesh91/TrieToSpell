import wordList from "./assets/google-10000-english-usa.txt?raw";

export function wordListToArray(): string[] | undefined {
	try {
		return wordList.split("\n");
	} catch (e) {
		console.error(e);
	}
}
