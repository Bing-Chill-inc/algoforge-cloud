<script lang="ts">
    import CloudContent from "./CloudContent/CloudContent.svelte";
    import SideBar from "./SideBar/SideBar.svelte";
    import Login from "./Login/Login.svelte";
    import MenuCompte from "./MenuCompte/MenuCompte.svelte";
    import { getCookie, setCookie } from "./utils";

</script>

<main>
    <!-- <CloudContent />
    <SideBar /> -->
    <Login />
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }
</style>