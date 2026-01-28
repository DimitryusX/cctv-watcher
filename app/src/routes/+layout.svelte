<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Home Server UI</title>
</svelte:head>

<div class="min-h-dvh bg-slate-950 text-slate-100">
	<header class="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
		<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
			<div class="flex items-center gap-3">
				<div class="grid h-10 w-10 place-items-center rounded-xl bg-slate-800 text-sm font-semibold">
					HS
				</div>
				<div>
					<p class="text-sm uppercase tracking-[0.2em] text-slate-400">Home Server</p>
					<h1 class="text-lg font-semibold">CCTV Dashboard</h1>
				</div>
			</div>
			<nav class="flex items-center gap-2 text-sm">
				<a class="rounded-full border border-slate-800 px-3 py-1.5 text-slate-200 hover:border-slate-600" href="/#live">
					Live
				</a>
				<a
					class="rounded-full border border-slate-800 px-3 py-1.5 text-slate-200 hover:border-slate-600"
					href="/history"
				>
					History
				</a>
			</nav>
		</div>
	</header>

	<main class="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
		{@render children()}
	</main>

	<footer class="border-t border-slate-800 bg-slate-950/80">
		<div class="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">
			No authentication enabled • Internal use only
		</div>
	</footer>
</div>
