import { wordListToArray } from '$lib/util';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const wordArray = wordListToArray();
	return {
		content: wordArray
	};
};
