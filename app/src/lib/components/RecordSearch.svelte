<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = 'Search by file name'
	} = $props<{ value?: string; placeholder?: string }>();
</script>

<div class="flex-1">
	<label class="block text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-500" for="search">Search</label>
	<div class="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-2 transition-colors">
		<span class="text-slate-500 dark:text-slate-400">🔍</span>
		<input
			id="search"
			class="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none"
			placeholder={placeholder}
			bind:value
		/>
	</div>
</div>
