<script lang="ts">
	import FileList from "./components/FileList.svelte";
</script>

<main class="cloud-content">
	<FileList />
</main>

<style>
	.cloud-content {
		width: 80%;
		height: calc(100vh - 120px);
		position: absolute;
		bottom: 15px;
		right: 15px;
		background-color: var(--bgColor);
		border-radius: 20px;
		box-shadow: 0 0 10px -5px var(--primary-color);
	}
</style>
