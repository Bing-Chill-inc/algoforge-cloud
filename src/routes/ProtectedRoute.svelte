<script lang="ts">
	import { onMount } from "svelte";
	import userStore from "../stores/userStores";
	import { get } from "svelte/store";

	// Fonction pour vérifier si l'utilisateur est connecté
	function isUserLoggedIn(): boolean {
		const user = get(userStore);
		console.log(user);
		return user !== null;
	}

	// Rediriger en fonction de l'état de connexion
	onMount(() => {
		if (!isUserLoggedIn()) {
			// Rediriger vers la page de login si l'utilisateur n'est pas connecté
			window.location.hash = "#/login";
		}
	});
</script>

<slot />
