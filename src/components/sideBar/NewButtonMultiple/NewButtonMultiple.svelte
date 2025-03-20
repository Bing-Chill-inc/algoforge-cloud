<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	export let type: "button" | "reset" | "submit" | null = "button";
	export let disabled: boolean = false;
	let showOptions = false;
	let initialLoad = true;

	function toggleOptions() {
		showOptions = !showOptions;
		initialLoad = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const optionsList: HTMLElement | null =
			document.querySelector(".optionsList");
		const newButtonMultiple: HTMLElement | null =
			document.querySelector(".newButtonMultiple");
		if (
			optionsList &&
			showOptions &&
			newButtonMultiple &&
			!event.composedPath().includes(newButtonMultiple)
		)
			showOptions = false;
	}

	onMount(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<main class="newButtonMultiple">
	<button
		{type}
		{disabled}
		class={showOptions ? "active" : undefined}
		on:click={toggleOptions}
	>
		<div class="iconContainerPlus">+</div>
		Nouveau
		<div class="iconContainerDown">▾</div>
	</button>

	{#if showOptions}
		<ul class="optionsList">
			<li class="optionItem">Nouvel Algorithme</li>
			<li class="optionItem disabled">Nouveau Dossier</li>
		</ul>
	{:else if initialLoad}
		<ul class="optionsList initialHide">
			<li class="optionItem">Nouvel Algorithme</li>
			<li class="optionItem disabled">Nouveau Dossier</li>
		</ul>
	{:else}
		<ul class="optionsList hide">
			<li class="optionItem">Nouvel Algorithme</li>
			<li class="optionItem disabled">Nouveau Dossier</li>
		</ul>
	{/if}
</main>

<style>
	.newButtonMultiple {
		display: flex;
		position: relative;
		align-items: center;
		width: 100%;
		justify-content: center;
		flex-direction: column;
	}

	button {
		display: flex;
		user-select: none;
		padding: 12px 3px;
		font-size: 1.5rem;
		font-weight: bold;
		width: 80%;
		text-decoration: none;
		border-radius: 10px;
		margin-top: 20px;
		cursor: pointer;
		color: var(--bgColor);
		background-color: var(--titleColor);
		box-shadow: 0 0 0.5vw var(--titleColor);
		justify-content: space-around;
		align-items: center;
		transition:
			border 0.6s ease,
			box-shadow 0.6s ease,
			color 0.3s ease,
			background-color 0.3s ease;
		border: 0.1vw solid transparent;

		&:hover {
			background-color: var(--fgColorHover);
			border: 0.1vw solid var(--fgColorForward);
			box-shadow: 0 0 0.5vw var(--fgColor);
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}

		&.active {
			background-color: var(--fgColorHover);
			border: 0.1vw solid var(--fgColorForward);
			box-shadow: 0 0 0.5vw var(--fgColor);
		}
	}

	.iconContainerPlus {
		font-size: 2.5rem;
	}

	.iconContainerDown {
		font-size: 2rem;
	}

	.optionsList {
		position: absolute;
		top: calc(100% + 5px);
		list-style: none;
		padding: 0;
		margin-top: 5px;
		width: 80%;
		border-radius: 10px;
	}

	.optionItem {
		user-select: none;
		padding: 6px 3px;
		margin-bottom: 5px;
		font-size: 1rem;
		color: var(--fgColor);
		cursor: pointer;
		background: var(--bgColor);
		border-radius: 10px;
		box-shadow: 0 0 0.5vw var(--bgColorTertiary);
		border: 1px solid var(--titleColor);
		font-weight: 700;
		transition:
			background-color 0.3s ease,
			transform 0.3s ease,
			opacity 0.3s ease;
		transform: translateY(10px);
		opacity: 0;

		&.disabled {
			color: var(--fgColorDisabled);
			border-color: var(--fgColorDisabled);
			cursor: not-allowed;
		}
	}

	.optionsList.hide .optionItem {
		opacity: 1;
	}

	.optionsList .optionItem:nth-child(1) {
		animation: popIn 0.3s forwards 0.1s;
	}

	.optionsList .optionItem:nth-child(2) {
		animation: popIn 0.3s forwards 0.2s;
	}

	.optionsList.hide .optionItem:nth-child(1) {
		animation: popOut 0.3s forwards 0.1s;
	}

	.optionsList.hide .optionItem:nth-child(2) {
		animation: popOut 0.3s forwards 0.2s;
	}

	@keyframes popIn {
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@keyframes popOut {
		to {
			transform: translateY(0);
			opacity: 0;
			display: none;
		}
	}

	.initialHide .optionItem {
		display: none;
	}

	.optionItem:is(:not(.disabled):hover) {
		color: var(--bgColor);
		background-color: var(--fgColorHover);
	}
</style>
