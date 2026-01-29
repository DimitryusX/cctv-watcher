import { json } from '@sveltejs/kit';
import os from 'os';
import type { SystemStats } from '$lib/types/stats';

export async function GET() {
	const cpuLoad = os.loadavg();
	const totalMem = os.totalmem();
	const freeMem = os.freemem();
	const usedMem = totalMem - freeMem;
	const cpuCount = os.cpus().length;

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
	};

	return json(stats);
}
