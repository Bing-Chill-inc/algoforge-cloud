<script lang="ts">
	import DynamicAsset from "./assets/DynamicAsset.svelte";
</script>

<main class="nav-bar">
	<div class="nav-item">
		<DynamicAsset assetIdentifier="Home" />
		Accueil
	</div>
	<div class="nav-item">
		<DynamicAsset assetIdentifier="Clock" />
		Récent
	</div>
	<div class="nav-item">
		<DynamicAsset assetIdentifier="Shared" />
		Partagé avec moi
	</div>
	<div class="nav-item">
		<DynamicAsset assetIdentifier="Trash" />
		Corbeille
	</div>
</main>

<style>
	.nav-bar {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 80px;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-left: 20px;
		font-size: 1.75em;
		width: 80%;
		padding: 10px;
		padding-left: 20px;
		border-radius: 10px;
	}

	.nav-item:hover {
		cursor: pointer;
		background-color: var(--alt-background-color);
	}
</style>
