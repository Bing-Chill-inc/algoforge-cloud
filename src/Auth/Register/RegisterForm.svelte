<script lang="ts">
	let email: string = "";
	let password: string = "";
	let pseudo: string = "";
	let passwordConfirm: string = "";

	let emailError = "";
	let passwordError = "";
	let pseudoError = "";
	let passwordConfirmError = "";

	// Fonction pour gérer la soumission du formulaire d'inscription
	async function handleRegister(event: Event) {
		event.preventDefault();

		emailError = "";
		passwordError = "";
		pseudoError = "";

		if (!pseudo) {
			pseudoError = "Veuillez entrer un pseudo";
		}
		if (!email) {
			emailError = "Veuillez entrer votre email";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			emailError = "Adresse email mal formée";
		}
		if (!password) {
			passwordError = "Requis";
		}
		if (
			password.length < 8 ||
			!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*\W)|(?=.*[a-z])(?=.*\d)(?=.*\W)|(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(
				password,
			)
		) {
			passwordError =
				"Doit comporter au moins 8 caractères et contenir trois des quatre types de caractères suivants : majuscules, minuscules, chiffres et symboles";
		}
		if (!passwordConfirm) {
			passwordConfirmError = "Requis";
		}
		console.log(password, passwordConfirm);
		if (password !== passwordConfirm) {
			passwordConfirmError = "Les mots de passe ne correspondent pas";
		}
		if (
			!pseudoError &&
			!emailError &&
			!passwordError &&
			!passwordConfirmError
		) {
			try {
				const response = await fetch("/api/users/register", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ pseudo, email, password }),
				});

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(
						errorData.message || "Erreur à l'inscription",
					);
				}

				const data = await response.json();
				console.log("Inscription réussie :", data);
				window.location.hash = "#/login";
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

<main class="register-form">
	<form on:submit={handleRegister} novalidate>
		<div class="user-box">
			<input type="text" id="pseudo" bind:value={pseudo} required />
			<label for="pseudo">Pseudo</label>
			{#if pseudoError}
				<span class="error-message">{pseudoError}</span>
			{/if}
		</div>
		<div class="user-box">
			<input type="text" id="email" bind:value={email} required />
			<label for="email">Email</label>
			{#if emailError}
				<span class="error-message">{emailError}</span>
			{/if}
		</div>
		<div class="user-box">
			<input
				type="password"
				id="password"
				bind:value={password}
				required
			/>
			<label for="password">Mot de passe</label>
			{#if passwordError}
				<span class="error-message">{passwordError}</span>
			{/if}
		</div>
		<div class="user-box">
			<input
				type="password"
				id="password-confirm"
				bind:value={passwordConfirm}
				required
			/>
			<label for="password-confirm">Confirmer le mot de passe</label>
			{#if passwordConfirmError}
				<span class="error-message">{passwordConfirmError}</span>
			{/if}
		</div>
		<button type="submit">S'inscrire</button>
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
		margin-bottom: 5px;
		border: none;
		border-bottom: 1px solid var(--fgColorForward);
		outline: none;
		background: transparent;
		color: var(--fgColor);
		font-size: 16px;
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
		padding: 12px 24px;
		font-size: 16px;
		color: var(--bgColor);
		background-color: var(--titleColor);
		border-radius: 5px;
		cursor: pointer;
		transition:
			border 0.6s,
			box-shadow 0.6s,
			color 0.3s,
			background-color 0.3s;
		border: 0.1vw solid transparent;
	}

	button:hover {
		background-color: var(--fgColorHover);
		border: 0.1vw solid var(--fgColorForward);
		box-shadow: 0 0 0.5vw var(--fgColor);
	}
</style>
