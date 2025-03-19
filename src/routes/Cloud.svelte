<script lang="ts">
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import CloudContent from "../CloudContent/CloudContent.svelte";
	import SideBar from "../components/sideBar/SideBar.svelte";
	import MenuCompte from "../components/MenuCompte/MenuCompte.svelte";
	import Header from "../components/header/Header.svelte";
</script>

<ProtectedRoute />
<main class="cloud">
	<Header />
	<CloudContent />
	<SideBar />
</main>
