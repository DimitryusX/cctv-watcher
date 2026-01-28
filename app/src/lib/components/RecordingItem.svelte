<script lang="ts">
	let {
		name,
		date,
		duration,
		size,
		view = 'list',
		onPlay
	} = $props<{
		name: string;
		date: string;
		duration: string;
		size: string;
		view?: 'list' | 'grid';
		onPlay?: () => void;
	}>();

	const displayName = $derived(name.split('/').pop() ?? name);
</script>

<div
	class={`rounded-2xl border border-slate-800 bg-slate-900/60 ${
		view === 'grid' ? 'h-full p-5' : 'p-4'
	}`}
>
	<div class={view === 'grid' ? 'space-y-4' : 'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'}>
		<div>
			<h3 class="text-sm font-medium text-slate-100">{displayName}</h3>
			<p class="mt-1 text-xs text-slate-400">{date}</p>
		</div>
		<div
			class={
				view === 'grid'
					? 'grid grid-cols-2 gap-2 text-xs text-slate-400'
					: 'flex flex-wrap items-center gap-2 text-xs text-slate-400'
			}
		>
			<span class="flex items-center justify-center rounded-xl bg-slate-800 px-3 py-1">{size}</span>
			<button
				type="button"
				class="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200 hover:border-slate-500"
				onclick={() => onPlay?.()}
			>
				Play
			</button>
		</div>
	</div>
</div>
