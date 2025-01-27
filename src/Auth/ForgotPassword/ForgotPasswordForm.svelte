<script lang="ts">
	export let onSuccess: () => void;

	let email: string = "";

	let emailError: string = "";

	// Fonction pour gérer la soumission du formulaire de mot de passe oublié
	async function handleForgotPassword(event: Event) {
		event.preventDefault();

		emailError = "";

		if (!email) {
			emailError = "Veuillez entrer votre email";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			emailError = "Veuillez entrer une adresse email valide";
		}

		if (!emailError) {
			try {
				const response = await fetch("/api/users/recover", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email }),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message ||
							"Erreur lors de la réinitialisation du mot de passe",
					);
				}

				const data = await response.json();
				console.log("Email de réinitialisation envoyé :", data);
				alert(
					"Un email de réinitialisation de mot de passe vous a été envoyé",
				);
				onSuccess && onSuccess();
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				} else {
					alert("Une erreur inconnue est survenue");
				}
			}
		}
	}
</script>

<main class="forgot-password-form">
	<form on:submit={handleForgotPassword} novalidate>
		<div class="user-box">
			<input type="text" id="email" bind:value={email} required />
			<label for="email">Email</label>
			{#if emailError}
				<span class="error-message">{emailError}</span>
			{/if}
		</div>
		<button type="submit">Envoyer</button>
	</form>
</main>

<style>
	.user-box {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 35px;
		position: relative;
	}

	.user-box label {
		position: absolute;
		top: 0;
		left: 0;
		padding: 10px 0;
		font-size: 16px;
		color: var(--fgColor);
		pointer-events: none;
		transition: 0.5s;
	}

	.user-box input {
		width: 100%;
		padding: 10px 0;
		font-size: 16px;
		margin-bottom: 5px;
		border: none;
		border-bottom: 1px solid var(--fgColorForward);
		outline: none;
		background: transparent;
		color: var(--fgColor);
	}

	.user-box input:focus ~ label,
	.user-box input:valid ~ label {
		top: -20px;
		left: 0;
		color: var(--titleColor);
		font-size: 12px;
	}

	.error-message {
		color: var(--errorColor);
		font-size: 12px;
	}

	button {
		display: inline-block;
		padding: 12px 24px;
		font-size: 16px;
		color: var(--bgColor);
		background-color: var(--titleColor);
		text-decoration: none;
		border-radius: 5px;
		margin-top: 20px;
		cursor: pointer;
		transition:
			border 0.6s ease,
			box-shadow 0.6s ease,
			color 0.3s ease,
			background-color 0.3s ease;
		border: 0.1vw solid transparent;
	}

	button:hover {
		background-color: var(--fgColorHover);
		border: 0.1vw solid var(--fgColorForward);
		box-shadow: 0 0 0.5vw var(--fgColor);
	}
</style>
