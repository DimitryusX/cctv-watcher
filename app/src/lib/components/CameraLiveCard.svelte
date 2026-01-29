<script lang="ts">
	let {
		name,
		sourceLabel = 'go2rtc',
		status = 'Live',
		streamUrl
	} = $props<{ name: string; sourceLabel?: string; status?: string; streamUrl?: string }>();
</script>

<div class="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 transition-colors">
	<div class="flex items-center justify-between">
		<h4 class="font-medium text-slate-900 dark:text-slate-100">{name}</h4>
		<span class="text-xs text-slate-500 dark:text-slate-400">{sourceLabel}</span>
	</div>
	<div class="mt-4 aspect-video overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 transition-colors">
		{#if streamUrl}
			<iframe
				class="h-full w-full"
				src={streamUrl}
				title={`${name} stream`}
				allow="autoplay; fullscreen; picture-in-picture"
			></iframe>
		{:else}
			<div class="grid h-full place-items-center border border-dashed border-slate-300 dark:border-slate-700">
				<p class="text-xs text-slate-400 dark:text-slate-500">Stream placeholder</p>
			</div>
		{/if}
	</div>
	<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">{status}</p>
</div>
