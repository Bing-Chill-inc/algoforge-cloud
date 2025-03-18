<script lang="ts">
	import { activeItem } from "../stores/activeItemStore";
	import FileList from "./components/FileList.svelte";
</script>

<main class="cloud-content">
	{#if $activeItem === "Home"}
		<FileList />
	{:else if $activeItem === "Clock"}
		<h1>RecentFiles</h1>
	{:else if $activeItem === "Shared"}
		<h1>SharedFiles</h1>
	{/if}
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
