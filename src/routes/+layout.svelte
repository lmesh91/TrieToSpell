<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { LETTER_ENCODINGS, encode_word } from '$lib';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// temporary: attach functions to the main site for debugging
	if (browser && dev) {
		window.trieToSpell = {
			LETTER_ENCODINGS,
			encode_word
		};
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
