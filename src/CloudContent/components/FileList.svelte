<script lang="ts">
	import { onMount } from "svelte";
	import { getSessionData, logout } from "../../stores/userStores";

	type File = {
		id: number;
		name: string;
		lastModified: string;
		creationDate: string;
		owner: string;
		location: string;
	};

	let files: File[] = [];
	let loading = true;
	let error = "";

	async function fetchFiles() {
		const sessionData = getSessionData();
		const token = sessionData?.token;
		const userId = sessionData?.userId;
		if (!token || !userId) {
			try {
				const response = await fetch(`/api/algos/byUserId/${userId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!response.ok) {
					throw new Error("Failed to fetch files");
				}

				const data = await response.json();
				console.log(data);
			} catch (err) {
				error = "Failed to load files";
				console.error(err);
			} finally {
				loading = false;
			}
		} else {
			// logout();
		}
	}
	onMount(() => {
		fetchFiles();
	});
</script>

<div class="file-list">
	{#if loading}
		<div class="loading">Loading files...</div>
	{:else if error}
		<div class="error">{error}</div>
	{:else if files.length === 0}
		<div class="empty">No files found</div>
	{:else}
		<div class="actions">
			<button class="new-button">+ Nouveau</button>
		</div>
		<table>
			<thead>
				<tr>
					<th>Nom</th>
					<th>Dernière modification</th>
					<th>Date de création</th>
					<th>Propriétaire</th>
					<th>Emplacement</th>
				</tr>
			</thead>
			<tbody>
				{#each files as file}
					<tr>
						<td>{file.name}</td>
						<td>{new Date(file.lastModified).toLocaleString()}</td>
						<td>{new Date(file.creationDate).toLocaleString()}</td>
						<td>{file.owner}</td>
						<td>{file.location}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>

<style>
	.file-list {
		padding: 20px;
		height: 100%;
		overflow-y: auto;
	}

	.actions {
		margin-bottom: 20px;
	}

	.new-button {
		background-color: var(--primary-color);
		color: var(--bgColor);
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1em;
	}

	.new-button:hover {
		opacity: 0.9;
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
		border-bottom: 1px solid var(--primary-color);
	}

	th {
		background-color: var(--primary-color);
		color: var(--bgColor);
	}

	.loading,
	.error,
	.empty {
		text-align: center;
		padding: 20px;
		color: var(--fgColor);
	}

	.error {
		color: red;
	}
</style>
