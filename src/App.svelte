<script lang="ts">
	import Login from "./routes/Login.svelte";
	import Cloud from "./routes/Cloud.svelte";
	import Register from "./routes/Register.svelte";
	import ForgotPassword from "./routes/ForgotPassword.svelte";
	import { theme } from "./stores/themeStore";
	import { onMount } from "svelte";
	import { loadUser } from "./stores/userStores";
	import Test from "./routes/test.svelte";
	import NotificationManager from "./components/NotificationManager.svelte";

	onMount(() => {
		// Charger l'utilisateur actuel
		loadUser();
	});

	// Définir les routes
	const routes: { [key: string]: typeof Login } = {
		"#/login": Login,
		"#/register": Register,
		"#/forgot-password": ForgotPassword,
		"#/": Cloud,
		"#/test": Test,
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
	<NotificationManager />
</main>

<style>
	main {
		background-color: var(--bgColor);
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
</style>
