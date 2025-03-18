<script lang="ts">
	import NavBar from "./NavBar/NavBar.svelte";
	import UsageIndicator from "./UsageIndicator/UsageIndicator.svelte";
</script>

<main class="side-bar">
	<NavBar />
	<UsageIndicator used={50} total={100} />
</main>

<style>
	.side-bar {
		width: 20dvw;
		max-width: 260px;
		min-width: 200px;
		height: calc(100dvh - 120px);
	}
</style>
