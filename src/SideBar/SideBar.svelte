<script lang="ts">
	import UsageIndicator from "./UsageIndicator/UsageIndicator.svelte";
</script>

<main class="side-bar">
	<UsageIndicator used={50} total={100} />
</main>

<style>
	.side-bar {
		width: calc(100% - 80% - 35px);
		height: calc(100vh - 120px);
		position: absolute;
		bottom: 15px;
		left: 15px;
		/* background-color: rgba(255, 0, 0, 0.07); */
	}
</style>
