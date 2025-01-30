<script lang="ts">
	import CloudContent from "./CloudContent/CloudContent.svelte";
	import SideBar from "./SideBar/SideBar.svelte";
	import Login from "./Auth/Login/Login.svelte";
	import Register from "./Auth/Register/Register.svelte";
	import ForgotPassword from "./Auth/ForgotPassword/ForgotPassword.svelte";
	import { theme } from "./stores/themeStore";
	import { onMount } from "svelte";

	// Définir les routes
	const routes: { [key: string]: typeof Login } = {
		"#/login": Login,
		"#/register": Register,
		"#/forgot-password": ForgotPassword,
		"#/": CloudContent,
	};

	// Déterminer le composant actuel en fonction du hachage
	let currentHash: keyof typeof routes =
		(window.location.hash as keyof typeof routes) || "#/login";
	let CurrentComponent = routes[currentHash] || Login;

	// Écouter les changements de hachage
	onMount(() => {
		const handleHashChange = () => {
			currentHash = window.location.hash;
			if (!routes[currentHash]) {
				window.location.hash = "#/login"; // Rediriger vers la page de connexion par défaut
			} else {
				CurrentComponent = routes[currentHash];
			}
		};

		// Vérifier la route actuelle au chargement de la page
		handleHashChange();

		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	});
</script>

<main>
	<svelte:component this={CurrentComponent} />
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
</style>
