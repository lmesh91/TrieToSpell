// @ts-nocheck
import { wordListToArray } from '$lib/util';
import type { PageServerLoad } from './$types';

export const load = async () => {
	const wordArray = wordListToArray();
	return {
		content: wordArray
	};
};
;null as any as PageServerLoad;