<script lang="ts">
	export let used: number;
	export let total: number;
</script>

<main class="usage-indicator">
	<div class="usage-indicator-bar">
		<div class="usage-indicator-bar-inner" style="width: {(used / total) * 100}%"></div>
	</div>
	<p class="usage-indicator-number">{used} algorithmes réalisés sur {total} disponibles</p>
</main>

<style>
	.usage-indicator {
		position: absolute;
		bottom: 30px;
		right: 50%;
		transform: translateX(50%);
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.usage-indicator-bar {
		width: 80%;
		height: 15px;
		background-color: var(--off-background-color);
		border-radius: 20px;
		overflow: hidden;
	}

	.usage-indicator-bar-inner {
		height: 100%;
		background-color: var(--primary-color);
		border-radius: 0 20px 20px 0;
	}

	.usage-indicator-number {
		color: white;
		font-size: 0.7em;
		margin-top: 5px;
	}
</style>
