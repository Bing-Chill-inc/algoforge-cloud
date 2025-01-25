<script lang="ts">
    import { listTheme } from './themes';
    import { theme } from './themeStore';
</script>

<main class="select-theme">
    <select
        name="select-theme"
        id="select-theme"
        bind:value={$theme}
    >
        {#each listTheme as theme}
            <option value={theme.name}>{theme.name}</option>
        {/each}
    </select>
</main>

<style>
    .select-theme {
        display: flex;
        justify-content: center; 
        align-items: center;
    }

    select {
        width: 95%;
        background: none;
        border: var(--fgColor) solid 0.1vw;
        border-radius: 1vw;
        color: var(--fgColor);
        cursor: pointer;
        padding: 4px 10px;
    }
</style>