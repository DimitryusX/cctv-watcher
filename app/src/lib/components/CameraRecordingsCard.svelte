<script lang="ts">
	type RecordingItem = { label: string; duration: string };

	let { name, items = [] } = $props<{ name: string; items?: RecordingItem[] }>();
</script>

<div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 transition-colors">
	<h4 class="font-medium text-slate-900 dark:text-slate-100">{name}</h4>
	<p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Latest recordings</p>
	<ul class="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
		{#each items as item}
			<li class="flex items-center justify-between rounded-lg bg-slate-100 dark:bg-slate-950/60 px-3 py-2 transition-colors">
				<span>{item.label}</span>
				<span class="text-xs text-slate-500 dark:text-slate-400">{item.duration}</span>
			</li>
		{/each}
	</ul>
</div>
