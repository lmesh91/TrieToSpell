// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		trieToSpell?: {
			LETTER_ENCODINGS: typeof import('$lib').LETTER_ENCODINGS;
			encode_word: typeof import('$lib').encode_word;
		};
	}

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
