<script lang="ts">
	let {
		name,
		date,
		duration,
		size,
		tags = [],
		view = 'list',
		onPlay
	} = $props<{
		name: string;
		date: string;
		duration: string;
		size: string;
		tags?: string[];
		view?: 'list' | 'grid';
		onPlay?: () => void;
	}>();

	const displayName = $derived(name.split('/').pop() ?? name);
</script>

<div
	class={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 transition-colors ${
		view === 'grid' ? 'h-full p-5' : 'p-4'
	}`}
>
	<div class={view === 'grid' ? 'space-y-4' : 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'}>
		<div class="flex-1">
			<h3 class="text-sm font-medium text-slate-900 dark:text-slate-100">{displayName}</h3>
			<p class="mt-1 text-xs text-slate-500 dark:text-slate-400">{date}</p>
			{#if tags.length > 0}
				<div class="mt-2 flex flex-wrap gap-1">
					{#each tags as tag}
						<span class="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-700 px-2 py-1 text-xs text-blue-900 dark:text-blue-100">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
		<div
			class={
				view === 'grid'
					? 'grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400'
					: 'flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400'
			}
		>
			<span class="flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 px-3 py-1 text-slate-900 dark:text-slate-100">{size}</span>
			<button
				type="button"
				class="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 px-3 py-1 text-xs text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
				onclick={() => onPlay?.()}
			>
				Play
			</button>
		</div>
	</div>
</div>
