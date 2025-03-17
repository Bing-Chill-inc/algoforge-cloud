<script lang="ts">
	import ProtectedRoute from "./ProtectedRoute.svelte";
	import ProfileForm from "../components/MenuCompte/ProfileForm.svelte";
</script>

<ProtectedRoute />
<main class="cloud">
	<ProfileForm />
</main>
