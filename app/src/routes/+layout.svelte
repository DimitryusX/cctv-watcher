<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { theme, type Theme } from '$lib/stores/theme';

	let { children } = $props();
	let currentTheme = $state<Theme>('system');

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
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>CCTV Watcher</title>
</svelte:head>

<div class="min-h-dvh bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
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

	<main class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
		{@render children()}
	</main>

	<footer class="border-t border-slate-300 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-950/80 transition-colors duration-200">
		<div class="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-slate-600 dark:text-slate-500 sm:px-6">
			No authentication enabled • Internal use only
		</div>
	</footer>
</div>
