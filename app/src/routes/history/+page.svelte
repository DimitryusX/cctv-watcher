<script lang="ts">
	import RecordSearch from '$lib/components/RecordSearch.svelte';
	import RecordingItem from '$lib/components/RecordingItem.svelte';
	import VideoPlayerModal from '$lib/components/VideoPlayerModal.svelte';
	import type { PageData } from './$types';
	import type { Recording } from '$lib/core/types';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let { data } = $props<{ data: PageData }>();

	let query = $state('');
	let view = $state<'list' | 'grid'>('list');
	let isPlayerOpen = $state(false);
	let selected = $state<Recording | null>(null);
	let selectedUrl = $state<string | null>(null);
	let items = $state<Recording[]>([]);
	let searchTimer: ReturnType<typeof setTimeout> | null = null;

	$effect(() => {
		items = data.recordings as Recording[];
	});

	const filtered = $derived.by(() => {
		if (!query.trim()) {
			return items;
		}
		return items.filter((item) =>
			item.name.toLowerCase().includes(query.toLowerCase())
		);
	});

	const groupedByDate = $derived.by(() => {
		const groups = new Map<string, Recording[]>();

		filtered.forEach((item) => {
			const dateOnly = item.date.split(' ')[0];
			if (!groups.has(dateOnly)) {
				groups.set(dateOnly, []);
			}
			groups.get(dateOnly)!.push(item);
		});

		return Array.from(groups.entries()).sort((a, b) => b[0].localeCompare(a[0]));
	});

	const openPlayer = (item: Recording) => {
		selected = item;
		selectedUrl = `/recordings/${item.name
			.split('/')
			.map((segment) => encodeURIComponent(segment))
			.join('/')}`;
		isPlayerOpen = true;
	};

	const updateUrlWithSearch = (value: string) => {
		if (searchTimer) clearTimeout(searchTimer);
		searchTimer = setTimeout(() => {
			const trimmed = value.trim();
			const next = new URL(page.url);
			if (trimmed) {
				next.searchParams.set('search', trimmed);
			} else {
				next.searchParams.delete('search');
			}
			if (next.toString() !== page.url.toString()) {
				goto(next, { replaceState: true, keepFocus: true, noScroll: true });
			}
		}, 300);
	};

	$effect(() => {
		updateUrlWithSearch(query);
	});

	onMount(() => {
		const searchParam = page.url.searchParams.get('search');
		if (searchParam) {
			query = searchParam;
		}
	});
</script>

<section class="space-y-4">
	<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
		<RecordSearch bind:value={query} />
		<div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-500">
			<span class="rounded-full bg-slate-200 dark:bg-slate-800 px-3 py-1 text-slate-900 dark:text-slate-100 transition-colors">{filtered.length} items</span>
			<div class="flex items-center rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 p-1 transition-colors">
				<button
					type="button"
					class={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
						view === 'list'
							? 'bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
							: 'text-slate-600 dark:text-slate-400'
					}`}
					onclick={() => {
						view = 'list';
					}}
				>
					List
				</button>
				<button
					type="button"
					class={`cursor-pointer rounded-full px-3 py-1 text-xs transition-colors ${
						view === 'grid'
							? 'bg-slate-300 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
							: 'text-slate-600 dark:text-slate-400'
					}`}
					onclick={() => {
						view = 'grid';
					}}
				>
					Grid
				</button>
			</div>
		</div>
	</div>

	{#if view === 'list'}
		<!-- List View with Date Grouping -->
		<div class="space-y-8">
			{#if filtered.length === 0}
				<div class="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 p-8 text-center transition-colors">
					<p class="text-sm text-slate-600 dark:text-slate-400">No recordings found !</p>
				</div>
			{:else}
				{#each groupedByDate as [date, recordings]}
					<div>
						<div class="mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
							<h3 class="text-sm font-semibold text-slate-700 dark:text-slate-300">{date}</h3>
						</div>
						<div class="space-y-2">
							{#each recordings as item}
								<RecordingItem
									name={item.name}
									date={item.date}
									duration={item.duration}
									size={item.size}
									tags={item.tags}
									view="list"
									onPlay={() => openPlayer(item)}
								/>
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</div>
	{:else}
		<!-- Grid View -->
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
			{#if filtered.length === 0}
				<div class="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 p-8 text-center transition-colors">
					<p class="text-sm text-slate-600 dark:text-slate-400">No recordings found !</p>
				</div>
			{:else}
				{#each filtered as item}
					<RecordingItem
						name={item.name}
						date={item.date}
						duration={item.duration}
						size={item.size}
						tags={item.tags}
						view="grid"
						onPlay={() => openPlayer(item)}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</section>

<VideoPlayerModal
	bind:open={isPlayerOpen}
	title={selected ? selected.name : 'Playback'}
	src={selectedUrl ?? undefined}
/>
