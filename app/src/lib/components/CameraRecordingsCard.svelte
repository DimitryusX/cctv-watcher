<script lang="ts">
	type RecordingItem = { label: string; duration: string };

	let { name, items = [] } = $props<{ name: string; items?: RecordingItem[] }>();
</script>

<div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
	<h4 class="font-medium">{name}</h4>
	<p class="mt-2 text-sm text-slate-400">Latest recordings</p>
	<ul class="mt-4 space-y-2 text-sm text-slate-300">
		{#each items as item}
			<li class="flex items-center justify-between rounded-lg bg-slate-950/60 px-3 py-2">
				<span>{item.label}</span>
				<span class="text-xs text-slate-500">{item.duration}</span>
			</li>
		{/each}
	</ul>
</div>
