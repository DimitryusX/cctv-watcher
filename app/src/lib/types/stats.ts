export interface SystemStats {
	cpu: {
		load: number;
		loadAverage: [number, number, number];
		count: number;
		percent: number;
	};
	memory: {
		total: number;
		used: number;
		free: number;
		percent: number;
		usedGB: string;
		totalGB: string;
	};
}
