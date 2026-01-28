import type { PageServerLoad } from './$types';
import { getRecordings } from '$lib/server/recordings';
import type { Recording } from '$lib/core/types';

export const load: PageServerLoad = async () => {
	const root = process.env.RECORDINGS_ROOT ?? '/recordings';
	let recordings: Recording[] = [];

	try {
		recordings = await getRecordings(root);
	} catch {
		// If the folder doesn't exist yet, return empty list
	}

	return {
		recordings
	};
};
