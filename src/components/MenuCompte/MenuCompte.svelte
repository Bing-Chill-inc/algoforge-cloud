<script lang="ts">
	import { onMount } from "svelte";
	import Theme from "./Theme.svelte";

	let isMenuOpen = false;

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	onMount(() => {
		const closeMenu = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest(".menu-container")) {
				isMenuOpen = false;
			}
		};
		document.addEventListener("click", closeMenu, true);
		return () => document.removeEventListener("click", closeMenu, true);
	});
</script>

<main class="menu-container">
	<button class="menu-icon" on:click={toggleMenu} aria-label="Toggle menu">
		<svg id="boutonCompte" viewBox="0 0 24 24">
			<path
				d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
			/>
		</svg>
	</button>

	{#if isMenuOpen}
		<div class="menu">
			<button class="menu-item" aria-label="Logout">Déconnexion</button>
			<div class="menu-item">
				<Theme />
			</div>
		</div>
	{/if}
</main>

<style>
	.menu-container {
		position: relative;
		display: inline-block;
	}

	.menu-icon {
		border: none;
		background: none;
		padding: 0;
		margin: 0;
		width: 40px;
		height: 40px;
		cursor: pointer;
	}

	.menu {
		position: absolute;
		top: calc(100% + 0.2vw);
		left: 50%;
		transform: translateX(-84%);
		background-color: var(--bgColor);
		padding: 0.2vw;
		border-radius: 0.6em;
		width: 15vw;
		min-width: 150px;
		font-size: 1vw;
		display: flex;
		flex-direction: column;
		gap: 0.5vw;
		z-index: 999;
		border: 1px solid #1f2b38;
	}

	.menu-item {
		padding: 0.5vw;
		color: var(--fgColor);
		cursor: pointer;
	}

	#boutonCompte {
		fill: var(--fgColor);
	}
</style>
