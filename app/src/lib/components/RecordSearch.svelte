<script lang="ts">
	let {
		value = $bindable(''),
		placeholder = 'Search by file name'
	} = $props<{ value?: string; placeholder?: string }>();
</script>

<div class="flex-1">
	<label class="block text-xs uppercase tracking-[0.2em] text-slate-500" for="search">Search</label>
	<div class="mt-2 flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-2">
		<span class="text-slate-500">🔍</span>
		<input
			id="search"
			class="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none"
			placeholder={placeholder}
			bind:value
		/>
	</div>
</div>
