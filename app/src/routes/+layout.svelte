<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme, type Theme } from '$lib/stores/theme';
	import type { SystemStats } from '$lib/types/stats';
	import { onMount } from 'svelte';

	let { children } = $props();
	let currentTheme = $state<Theme>('system');
	let stats = $state<SystemStats | null>(null);

	$effect(() => {
		const unsub = theme.subscribe((value) => {
			currentTheme = value;
		});
		return unsub;
	});

	const toggleTheme = () => {
		theme.toggle();
	};

	const getThemeIcon = () => {
		if (currentTheme === 'light') return '☀️';
		if (currentTheme === 'dark') return '🌙';
		return '🖥️';
	};

	const fetchStats = async () => {
		try {
			const response = await fetch('/api/stats');
			if (response.ok) {
				stats = await response.json();
			}
		} catch (e) {
			console.error('Failed to fetch stats:', e);
		}
	};

	onMount(() => {
		fetchStats();
		const interval = setInterval(fetchStats, 5000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>CCTV Watcher</title>
</svelte:head>

<div class="flex min-h-dvh flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
	<header class="border-b border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/80 backdrop-blur transition-colors duration-200">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
			<div class="flex items-center gap-3">
				<div class="grid h-10 w-10 place-items-center rounded-xl bg-slate-200 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-slate-100">
					CW
				</div>
				<div>
					<p class="text-sm uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">CCTV Watcher</p>
					<h1 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Dashboard</h1>
				</div>
			</div>
			<nav class="flex items-center gap-2 text-sm">
				<a class="rounded-full border border-slate-300 dark:border-slate-800 px-3 py-1.5 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors" href="/#live">
					Live
				</a>
				<a
					class="rounded-full border border-slate-300 dark:border-slate-800 px-3 py-1.5 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
					href="/history"
				>
					History
				</a>
				<button
					onclick={toggleTheme}
					class="rounded-full border border-slate-300 dark:border-slate-800 px-3 py-1.5 text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-colors ml-2"
					title={`Theme: ${currentTheme}`}
				>
					{getThemeIcon()}
				</button>
			</nav>
		</div>
	</header>

	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
		{@render children()}
	</main>

	<footer class="border-t border-slate-300 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/80 transition-colors duration-200">
		<div class="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-slate-600 dark:text-slate-500 sm:px-6">
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
				{#if stats}
					<div class="flex gap-4 text-slate-600 dark:text-slate-500">
						<span title="CPU Load">
							🔧 {stats.cpu.percent}% / {stats.cpu.count} cores
						</span>
						<span title="Memory Usage">
							💾 {stats.memory.usedGB}GB / {stats.memory.totalGB}GB ({stats.memory.percent}%)
						</span>
					</div>
				{/if}
			</div>
		</div>
	</footer>
</div>
