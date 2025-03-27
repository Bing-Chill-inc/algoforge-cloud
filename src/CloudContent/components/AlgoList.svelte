<script lang="ts">
	import { deleteAlgo } from "../../stores/algoStore";
	import { notifications } from "../../stores/notificationStore";
	import type { Algo } from "../../utils/types";

	// Recevoir la liste d'algos en tant que prop
	export let algos: Algo[];
	export let loading: boolean = false;
	export let error: string = "";

	function handleRowClick(e: MouseEvent, algo: Algo) {
		if (algo?.id === undefined) {
			console.error("Erreur lors de l'ouverture de l'algorithme:", error);
			notifications.add(
				"error",
				"Erreur lors de l'ouverture de l'algorithme",
			);
			return;
		}
		notifications.add("success", "Algorithme ouvert avec succès");
		window.open(`/edit/#/${algo.id}`, "_blank");
	}

	async function handleDeleteClick(e: MouseEvent, algo: Algo): Promise<void> {
		e.stopPropagation();

		try {
			await deleteAlgo(algo.id);
			notifications.add("success", "Algorithme supprimé avec succès");
			window.location.reload();
		} catch (error) {
			console.error(
				"Erreur lors de la suppression de l'algorithme:",
				error,
			);
			notifications.add(
				"error",
				"Erreur lors de la suppression de l'algorithme",
			);
		}
	}
</script>

<div class="algo-list">
	{#if loading}
		<div class="loading">Chargement des algorithmes...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if algos.length === 0}
		<div class="empty">Aucun algorithme trouvé</div>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Dernière modification</th>
					<th>Date de création</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{#each algos as algo}
					<tr
						on:click={(e) => handleRowClick(e, algo)}
						class="table-row"
					>
						<td>{algo.nom}</td>
						<td>
							{#if algo.dateModification}
								{new Date(
									algo.dateModification,
								).toLocaleString()}
							{:else}
								-
							{/if}
						</td>
						<td>
							{#if algo.dateCreation}
								{new Date(algo.dateCreation).toLocaleString()}
							{:else}
								-
							{/if}
						</td>
						<td class="actions-cell">
							<button
								class="action-btn delete"
								aria-label="Supprimer l'algorithme"
								data-title="Déplacer l'algorithme vers la corbeille"
								on:click={(e) => handleDeleteClick(e, algo)}
								><svg
									id="DeleteIcon"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									data-name="DeleteIcon"
									><path
										d="m21.389 4.703c-.108-.045-1.83-.756-4.479-1.245-.306-1.135-.638-1.639-.739-1.771-.146-.19-.354-.322-.589-.371-.062-.013-1.534-.316-3.582-.316s-3.488.305-3.549.317c-.232.05-.44.182-.585.37-.1.132-.43.633-.737 1.764-2.671.489-4.409 1.206-4.518 1.252-.508.215-.746.8-.533 1.309.191.454.675.672 1.137.569-.141 1.503-.215 3.346-.215 5.419 0 6.103 1.078 9.206 1.124 9.335.099.277.315.498.591.602.116.043 2.888 1.063 7.285 1.063s7.169-1.021 7.285-1.063c.275-.104.492-.324.591-.602.046-.129 1.124-3.232 1.124-9.335 0-2.073-.074-3.915-.215-5.418.451.147.949-.126 1.137-.57.213-.509-.025-1.094-.533-1.309zm-5.789 8.097c-.437.329-1.067.245-1.399-.2-.368-.489-.774-.945-1.2-1.381v5.782c0 .553-.447 1-1 1s-1-.447-1-1v-5.782c-.427.436-.833.892-1.2 1.381-.33.443-.957.532-1.399.2-.442-.331-.532-.958-.2-1.399.91-1.214 1.986-2.29 3.2-3.2.355-.268.844-.268 1.199 0 1.214.91 2.29 1.986 3.2 3.2.332.441.242 1.068-.2 1.399z"
									/></svg
								></button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.algo-list {
		padding: 20px;
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}

	.table-row {
		cursor: pointer;
		transition: background-color 0.2s ease;
	}

	.table-row:hover {
		background-color: var(--fgColorSemiTransparent);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: var(--bgColor);
	}

	th,
	td {
		padding: 12px;
		text-align: left;
		border-bottom: 1px solid var(--titleColor);
		color: var(--fgColor);
	}

	td {
		font-weight: 500;
	}

	th {
		background-color: var(--titleColor);
		color: var(--bgColor);
		font-weight: bold;

		&:first-child {
			border-top-left-radius: 10px;
		}
		&:last-child {
			border-top-right-radius: 10px;
		}
	}

	.loading,
	.error,
	.empty {
		text-align: center;
		padding: 20px;
		color: var(--fgColor);
	}

	.actions-cell {
		position: relative;
		z-index: 1;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
		fill: var(--fgColor);
		width: fit-content;
		height: 100%;
		position: relative;
		margin: 0 20px 0 auto;
		z-index: 2;

		&::before {
			content: attr(data-title);
			position: absolute;
			bottom: calc(100% + 4px);
			left: 50%;
			width: 100px;
			transform: translateX(-50%);
			background: var(--bgColor);
			color: var(--fgColor);
			border: 1px solid var(--borderColor2);
			border-radius: 0.6em;
			padding: 0.3rem 1rem;
			font-size: var(--font-size2);
			white-space: wrap;
			text-align: center;
			opacity: 0;
			visibility: hidden;
			pointer-events: none;
			transition:
				opacity 0.3s ease,
				visibility 0.3s ease;
			z-index: 10;
		}

		&:hover::before {
			opacity: 1;
			visibility: visible;
		}

		&:hover {
			position: relative;
			z-index: 3;
		}
	}

	button > svg {
		width: 24px;
		height: 24px;
		fill: inherit;

		&:hover {
			fill: var(--warningColor);
		}

		&:active {
			fill: var(--warningColor);
			transform: scale(0.9);
		}
	}

	.error {
		color: var(--errorColor);
	}
</style>
