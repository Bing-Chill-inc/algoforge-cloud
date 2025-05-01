<script lang="ts">
	import { onMount } from "svelte";
	import type { Algo } from "../../utils/types";
	import { fetchAlgosByUserId, getAlgos } from "../../stores/algoStore";
	import AlgoList from "../components/AlgoList.svelte";

	let loading: boolean = true;
	let error: string = "";
	let algos: Algo[] = [];

	onMount(async () => {
		try {
			await fetchAlgosByUserId({ sorted: "dateModification" });
			algos = getAlgos().reverse();
		} catch (e: any) {
			error = e?.message;
		} finally {
			loading = false;
		}
	});
</script>

<main class="mainContent">
	<h1>Récents</h1>
	<AlgoList {algos} {loading} {error} />
</main>

<style>
	.mainContent {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		height: 100%;
		width: calc(100% - 80px);
		padding: 0 40px;
	}
	h1 {
		color: var(--fgColor);
		font-size: 2.5em;
	}
</style>
