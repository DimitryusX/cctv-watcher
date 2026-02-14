import { json } from '@sveltejs/kit';
import fs from 'fs';
import os from 'os';
import type { SystemStats } from '$lib/types/stats';

export async function GET() {
	const cpuLoad = os.loadavg();
	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = totalMem - freeMem;
	const cpuCount = os.cpus().length;
	const diskPath = process.env.DISK_PATH ?? '/';
	let totalDisk = 0;
	let freeDisk = 0;
	let usedDisk = 0;
	try {
		const diskInfo = await fs.promises.statfs(diskPath);
		totalDisk = diskInfo.blocks * diskInfo.bsize;
		freeDisk = diskInfo.bfree * diskInfo.bsize;
		usedDisk = totalDisk - freeDisk;
	} catch (error) {
		console.error('Failed to read disk stats for', diskPath, error);
	}

	const stats: SystemStats = {
		cpu: {
			load: cpuLoad[0],
			loadAverage: cpuLoad as [number, number, number],
			count: cpuCount,
			percent: Math.round((cpuLoad[0] / cpuCount) * 100),
		},
		memory: {
			total: totalMem,
			used: usedMem,
			free: freeMem,
			percent: Math.round((usedMem / totalMem) * 100),
			usedGB: (usedMem / 1024 / 1024 / 1024).toFixed(2),
			totalGB: (totalMem / 1024 / 1024 / 1024).toFixed(2),
		},
		disk: {
			path: diskPath,
			total: totalDisk,
			used: usedDisk,
			free: freeDisk,
			percent: totalDisk > 0 ? Math.round((usedDisk / totalDisk) * 100) : 0,
			usedGB: (usedDisk / 1024 / 1024 / 1024).toFixed(2),
			totalGB: (totalDisk / 1024 / 1024 / 1024).toFixed(2),
		},
	};

	return json(stats);
}
