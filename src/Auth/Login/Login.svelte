<script lang="ts">
	import AuthLayout from "../AuthLayout.svelte";
	import LoginForm from "./LoginForm.svelte";

	function handleSuccess() {
		alert("Connexion réussie !");
	}
</script>

<main class="login">
	<AuthLayout title="Connexion">
		<LoginForm onSuccess={handleSuccess} />
	</AuthLayout>
</main>
