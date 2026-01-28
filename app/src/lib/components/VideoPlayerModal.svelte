<script lang="ts">
	import { onMount } from 'svelte';

	let {
		open = $bindable(false),
		title = 'Playback',
		src
	} = $props<{ open?: boolean; title?: string; src?: string }>();

	let isMobile = $state(false);
	let container = $state<HTMLDivElement | null>(null);
	let pos = $state({ x: 120, y: 120 });
	let size = $state({ w: 480, h: 300 });
	let dragStart = $state<{ x: number; y: number; px: number; py: number } | null>(null);
	let resizeStart = $state<{ x: number; y: number; w: number; h: number } | null>(null);

	const minSize = { w: 400, h: 260 };

	onMount(() => {
		const mq = window.matchMedia('(max-width: 768px)');
		const update = () => (isMobile = mq.matches);
		update();
		mq.addEventListener('change', update);
		return () => mq.removeEventListener('change', update);
	});

	const startDrag = (event: PointerEvent) => {
		if (isMobile) return;
		const target = event.target as HTMLElement | null;
		if (target?.closest('button')) return;
		dragStart = { x: event.clientX, y: event.clientY, px: pos.x, py: pos.y };
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	};

	const onDrag = (event: PointerEvent) => {
		if (!dragStart) return;
		pos = {
			x: dragStart.px + (event.clientX - dragStart.x),
			y: dragStart.py + (event.clientY - dragStart.y)
		};
	};

	const endDrag = () => {
		dragStart = null;
	};

	const startResize = (event: PointerEvent) => {
		if (isMobile) return;
		resizeStart = { x: event.clientX, y: event.clientY, w: size.w, h: size.h };
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	};

	const onResize = (event: PointerEvent) => {
		if (!resizeStart) return;
		const nextW = Math.max(minSize.w, resizeStart.w + (event.clientX - resizeStart.x));
		const nextH = Math.max(minSize.h, resizeStart.h + (event.clientY - resizeStart.y));
		size = { w: nextW, h: nextH };
	};

	const endResize = () => {
		resizeStart = null;
	};
</script>

{#if open}
	<div class="fixed inset-0 z-50 bg-slate-950/70" role="dialog" aria-modal="true">
		{#if isMobile}
			<div class="fixed inset-0 flex flex-col bg-slate-950">
				<header class="flex items-center justify-between border-b border-slate-800 px-4 py-3">
					<h2 class="text-sm font-semibold text-slate-100">{title}</h2>
					<button
						type="button"
						class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
						onpointerdown={(event) => event.stopPropagation()}
						onclick={(event) => {
							event.stopPropagation();
							open = false;
						}}
					>
						Close
					</button>
				</header>
				<div class="flex-1 p-4">
					{#if src}
						<video class="h-full w-full rounded-2xl bg-black" controls src={src}>
							<track kind="captions" />
						</video>
					{:else}
						<div class="grid h-full place-items-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/60">
							<p class="text-sm text-slate-400">Video source not set</p>
						</div>
					{/if}
				</div>
			</div>
		{:else}
			<div
				bind:this={container}
				class="absolute rounded-2xl border border-slate-700 bg-slate-900/95 shadow-2xl"
				style={`left:${pos.x}px; top:${pos.y}px; width:${size.w}px; height:${size.h}px;`}
			>
				<header
					class="flex cursor-move items-center justify-between border-b border-slate-800 px-4 py-2"
					role="button"
					tabindex="0"
					onpointerdown={startDrag}
					onpointermove={onDrag}
					onpointerup={endDrag}
					onpointercancel={endDrag}
				>
					<h2 class="text-sm font-semibold text-slate-100">{title}</h2>
					<button
						type="button"
						class="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200"
						onclick={() => (open = false)}
					>
						Close
					</button>
				</header>
				<div class="h-[calc(100%-42px)] p-4">
					{#if src}
						<video class="h-full w-full rounded-2xl bg-black" controls src={src}>
							<track kind="captions" />
						</video>
					{:else}
						<div class="grid h-full place-items-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/60">
							<p class="text-sm text-slate-400">Video source not set</p>
						</div>
					{/if}
				</div>
				<div
					class="absolute bottom-2 right-2 h-4 w-4 cursor-nwse-resize rounded border border-slate-600 bg-slate-800"
					role="button"
					tabindex="0"
					onpointerdown={startResize}
					onpointermove={onResize}
					onpointerup={endResize}
					onpointercancel={endResize}
				></div>
			</div>
		{/if}
	</div>
{/if}
