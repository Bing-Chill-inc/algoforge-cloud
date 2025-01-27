<script lang="ts">
	import AuthLayout from "../AuthLayout.svelte";
	import ForgotPasswordForm from "./ForgotPasswordForm.svelte";

	function handleSuccess() {
		alert("Un email de réinitialisation de mot de passe vous a été envoyé");
	}
</script>

<main class="forgot-password">
	<AuthLayout title="Mot de passe oublié">
		<ForgotPasswordForm onSuccess={handleSuccess} />
	</AuthLayout>
</main>
