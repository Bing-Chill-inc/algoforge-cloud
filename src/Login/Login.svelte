<script lang="ts">
  import { theme } from "../Theme/themeStore";

  let email: string = "";
  let password: string = "";
  let emailError: string = "";
  let passwordError: string = "";

  const fgColor = theme.getValueTheme("fgColor");
  const logoURL = `assetsDynamiques/AlgoForge.svg?fgColor=${fgColor}`;

  async function handleLogin(event: Event) {
    event.preventDefault();
    
    // Réinitialiser les messages d'erreur
    emailError = "";
    passwordError = "";

    // Validation basique
    if (!email) {
      emailError = "Veuillez entrer votre email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Veuillez entrer une adresse email valide";
    }

    if (!password) {
      passwordError = "Veuillez entrer votre mot de passe";
    }

    if (!emailError && !passwordError) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erreur de connexion');
        }

        const data = await response.json();
        console.log("Connexion réussie :", data);
        alert("Connexion réussie !");
      } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Une erreur inconnue est survenue');
        }
      }
    }
  }
</script>

<main class="login">
  <div class="login-container">
    <img 
      src=../assets/construction.png
      alt="Logo AlgoForge"
      class="floating-image-1"
    />
    <img 
      src=../assets/construction.png
      alt="Logo AlgoForge"
      class="floating-image-2"
    />
    <div class="login-box">
      <h2>Connexion</h2>
      <form on:submit={handleLogin}>
        <div class="user-box">
          <input
            type="text"
            id="email"
            bind:value={email}
            required
          />
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
        <a href="/cloud" on:click|preventDefault={handleLogin}>
          Se connecter
        </a>
      </form>
    </div>
  </div>
</main>

<style>

.login {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .login-container {
    position: relative;
    width: 400px;
  }

  .floating-image-1 {
    position: absolute;
    z-index: -1; 
    top: -90px;
    left: -80px;
    width: 200px;
    transform: rotate(-37deg);
    pointer-events: none;
  }

  .floating-image-2 {
    position: absolute;
    z-index: 2; 
    bottom: -100px;
    right: -120px;
    width: 200px;
    transform: rotate(8deg);
    pointer-events: none;
  }

  .login-box {
    position: relative;
    margin: 0 auto;
    padding: 40px;
    background: #E5EAF070;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4px );
    -webkit-backdrop-filter: blur( 4px );
    border-radius: 10px;
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  }

  .login-box h2 {
    margin: 0 0 30px;
    padding: 0;
    color: var(--titleColor);
    text-align: center;
  }

  .login-box .user-box {
    display: flex; 
    flex-direction: column; 
    align-items: flex-start; 
    margin-bottom: 35px; 
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: var(--fgColor);
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid var(--fgColorForward);
    outline: none;
    background: transparent;
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: var(--fgColor);
    pointer-events: none;
    transition: 0.5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: var(--titleColor);
    font-size: 12px;
  }

  .login-box form a {
    display: inline-block;
    padding: 12px 24px;
    font-size: 16px;
    color: var(--bgColor);
    background-color: var(--titleColor);
    text-decoration: none;
    border-radius: 5px;
    margin-top: 20px;
    transition: border 0.6s ease, box-shadow 0.6s ease, color 0.3s ease,
    background-color 0.3s ease;
  }

  .login-box a:hover {
    background-color: var(--fgColorHover);
    border: 0.1vw solid var(--fgColorForward);
    box-shadow: 0 0 0.5vw var(--fgColor);
  }

  .error-message {
    color: var(--errorColor);
    font-size: 12px;
  }

  .login-box .user-box {
    position: relative;
    margin-bottom: 35px;
  }

  .login-box .user-box input {
    margin-bottom: 5px;
  }
</style>
