<script lang="ts">
	import FileList from "./components/FileList.svelte";
</script>

<main class="cloud-content">
	<FileList />
</main>

<style>
	.cloud-content {
		flex: 1;
		width: calc(100% - 300px);
		height: calc(100vh - 80px);
		background-color: var(--bgColorTertiary);
		border-radius: 20px;
		box-shadow: 0 0 10px -5px var(--primary-color);
	}
</style>
