<script lang="ts">
    import AuthLayout from "../AuthLayout.svelte";
    import RegisterForm from "./RegisterForm.svelte";
  
    function handleSuccess() {
      alert("Inscription réussie !");
    }
  </script>
  
<main class="register">
    <AuthLayout title="Inscription">
        <RegisterForm onSuccess={handleSuccess} />
    </AuthLayout>
</main>