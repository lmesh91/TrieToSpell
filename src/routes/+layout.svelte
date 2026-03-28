<script lang="ts">
	import { browser, dev } from '$app/environment';
	import { KDTree, partition_words, encode_word } from '$lib';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// temporary: attach functions to the main site for debugging
	if (browser && dev) {
		window.trieToSpell = {
			KDTree,
			encode_word,
			partition_words
		};
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
