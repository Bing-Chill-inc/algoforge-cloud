<script lang="ts">  
    let email: string = "";
    let password: string = "";

    let errorMessage: string = "";
  
    // Simuler la soumission du formulaire
    function handleLogin(event: Event) {
      event.preventDefault();
  
      // Validation basique
      if (!email || !password) {
        errorMessage = "Veuillez remplir tous les champs.";
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(email)) {
        errorMessage = "Veuillez entrer une adresse email valide.";
        return;
      }
  
      errorMessage = "";
  
      // Simuler une requête d'authentification
      console.log("Connexion réussie :", { email, password });
      alert("Connexion réussie !");
    }
  </script>

  <main class="login">
    <div class="login-form">
        <h1>Connexion</h1>
        {#if errorMessage}
          <p class="error-message">{errorMessage}</p>
        {/if}
        <form on:submit|preventDefault={handleLogin}>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            bind:value={email}
            placeholder="Entrez votre email"
          />
      
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            bind:value={password}
            placeholder="Entrez votre mot de passe"
          />
      
          <button type="submit">Se connecter</button>
        </form>
      </div>
  </main>
  
  <style>
    .login-form {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      background-color: var(--bgColorSecondary);
    }
  
    .login-form h1 {
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .login-form label {
      font-weight: bold;
    }
  
    .login-form input {
      width: 100%;
      padding: 10px;
      margin: 8px 0 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  
    .login-form button {
      width: 100%;
      padding: 10px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  
    .login-form button:hover {
      background-color: #0056b3;
    }
  
    .error-message {
      color: red;
      margin-bottom: 10px;
      text-align: center;
    }
  </style>
  
  