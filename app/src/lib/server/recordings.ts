import fs from 'node:fs/promises';
import path from 'node:path';
import type { Recording } from '$lib/core/types';

const formatBytes = (bytes: number) => {
	if (!Number.isFinite(bytes)) return '-';
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	let value = bytes;
	let unitIndex = 0;
	while (value >= 1024 && unitIndex < units.length - 1) {
		value /= 1024;
		unitIndex += 1;
	}
	return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

const formatDate = (date: Date) => date.toISOString().replace('T', ' ').slice(0, 19);

export const getRecordings = async (root: string) => {
	const recordings: Recording[] = [];

	const walk = async (dir: string) => {
		const entries = await fs.readdir(dir, { withFileTypes: true });
		for (const entry of entries) {
			const entryPath = path.join(dir, entry.name);
			if (entry.isDirectory()) {
				await walk(entryPath);
				continue;
			}
			if (!entry.isFile()) continue;
			const stats = await fs.stat(entryPath);
			recordings.push({
				name: path.relative(root, entryPath),
				date: formatDate(stats.mtime),
				size: formatBytes(stats.size),
				duration: '-'
			});
		}
	};

	await walk(root);
	recordings.sort((a, b) => b.date.localeCompare(a.date));
	return recordings;
};
