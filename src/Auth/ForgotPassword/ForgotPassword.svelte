<script lang="ts">
    import AuthLayout from "../AuthLayout.svelte";
    import ForgotPasswordForm from "./ForgotPasswordForm.svelte";

    function handleSuccess() {
        alert("Connexion réussie !");
    }
</script>

<main class="forgot-password">
    <AuthLayout title="Mot de passe oublié">
        <ForgotPasswordForm onSuccess={handleSuccess} />
    </AuthLayout>
</main>