<script lang="ts">
    export let title: string = "Connexion";
</script>
  
<main class="auth-layout">
    <div class="auth-container">
        <img 
        src="../assets/construction.png"
        alt="Floating Img 1"
        class="floating-image-1"
        />
        <img 
        src="../assets/construction.png"
        alt="Floating Img 2"
        class="floating-image-2"
        />
        <div class="auth-box">
            <h2>{title}</h2>
            <slot />
        </div>
    </div>
</main>
  
<style>
    .auth-layout {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .auth-container {
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
        animation: float-1 3s ease-in-out infinite alternate;
    }

    .floating-image-2 {
        position: absolute;
        z-index: 2; 
        bottom: -100px;
        right: -120px;
        width: 200px;
        transform: rotate(8deg);
        pointer-events: none;
        animation: float-2 4s ease-in-out infinite alternate;
    }

    @keyframes float-1 {
        0% {
        transform: rotate(-37deg) translateY(0);
        }
        100% {
        transform: rotate(-37deg) translateY(10px);
        }
    }

    @keyframes float-2 {
        0% {
        transform: rotate(8deg) translateY(0);
        }
        100% {
        transform: rotate(8deg) translateY(-10px);
        }
    }

    .auth-box {
        position: relative;
        margin: 0 auto;
        padding: 40px;
        background: #E5EAF070;
        box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .auth-box h2 {
        margin: 0 0 30px;
        color: var(--titleColor);
        text-align: center;
    }
    
</style>