<script lang="ts">
	import CameraLiveCard from '$lib/components/CameraLiveCard.svelte';

	const GO2RTC_HTTP = import.meta.env.PUBLIC_GO2RTC_HTTP ?? '/go2rtc';
	const CAMERA_COUNT = Number(import.meta.env.PUBLIC_CAMERA_COUNT ?? 4);

	const liveCameras = Array.from({ length: CAMERA_COUNT }, (_, index) => {
		const cameraNumber = index + 1;
		return {
			name: `Camera ${cameraNumber}`,
			sourceLabel: 'go2rtc',
			streamUrl: `${GO2RTC_HTTP}/stream.html?src=cam${cameraNumber}`
		};
	});
</script>

<section id="live" class="space-y-4">
	<div class="flex items-center justify-between">
		<h3 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Live video</h3>
		<span class="rounded-full bg-emerald-100 dark:bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 transition-colors">Live</span>
	</div>
	<div class="grid gap-4 sm:grid-cols-2">
		{#each liveCameras as camera}
			<CameraLiveCard
				name={camera.name}
				sourceLabel={camera.sourceLabel}
				streamUrl={camera.streamUrl}
			/>
		{/each}
	</div>
</section>
