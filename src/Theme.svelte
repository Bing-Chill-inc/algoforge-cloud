<script lang="ts">
    import { getCookie, setCookie } from "./utils";

    interface Theme {
        nom: string;
        bgColor: string;
        bgColorSecondary: string;
        borderColor: string;
        fgColor: string;
        fgColorSemiTransparent: string;
        fgColorTransparent: string;
        fgColorForward: string;
        goodColor: string;
        goodColorTransparent: string;
        errorColor: string;
        warningColor: string;
        titleColor: string;
        fontFamily: string;
        glowColor: string;
        borderColor2: string;
        bgColorTertiary: string;
        fgColorHover: string;
        fgColorDisabled: string;
        baseGlowColor: number;
    }

    let listeTheme: Theme[] = [
        {
            nom: "Thème Pacifique",
            bgColor: "#F2F5F8",
            bgColorSecondary: "#E5EAF0",
            borderColor: "#BECBDA",
            fgColor: "#0C3245",
            fgColorSemiTransparent: "#BECBDA55",
            fgColorTransparent: "#BECBDA11",
            fgColorForward: "#33475C",
            goodColor: "#8ABE5E",
            goodColorTransparent: "#8ABE5E99",
            errorColor: "#D85959",
            warningColor: "#FFAD5A",
            titleColor: "#1C719C",
            fontFamily: "Roboto, sans-serif",
            glowColor: "",
            borderColor2: "#bdc6c9",
            bgColorTertiary: "#F2F5F870",
            fgColorHover: "#134D67",
            fgColorDisabled: "#7E7D73",
            baseGlowColor: 211,
        },
        {
            nom: "Thème AlgoForge",
            bgColor: "#161e27",
            bgColorSecondary: "#0f141a",
            borderColor: "#838787",
            fgColor: "#F2FBFF",
            fgColorSemiTransparent: "#83878755",
            fgColorTransparent: "#83878711",
            fgColorForward: "#A6AAA9",
            goodColor: "#D4E7C5",
            goodColorTransparent: "#D4E7C599",
            errorColor: "#FFA8A8",
            warningColor: "#FFD6AD",
            titleColor: "#34A5DA",
            fontFamily: "Roboto, sans-serif",
            glowColor: "",
            borderColor2: "#1f2b38",
            bgColorTertiary: "rgba(28,39,51,0.35)",
            fgColorHover: "#bdc6c9",
            fgColorDisabled: "rgba(166, 170, 169, .6)",
            baseGlowColor: 225,
        },
        {
            nom: "Thème FlashBang",
            bgColor: "#FFFFFF",
            bgColorSecondary: "#FFFFFF",
            borderColor: "#000000",
            fgColor: "#000000",
            fgColorSemiTransparent: "#00000055",
            fgColorTransparent: "#00000011",
            fgColorForward: "#000000",
            goodColor: "#00FF00",
            goodColorTransparent: "#00FF0099",
            errorColor: "#FF0000",
            warningColor: "#FFA300",
            titleColor: "#000000",
            fontFamily: "Roboto, sans-serif",
            glowColor: "",
            borderColor2: "#000000",
            bgColorTertiary: "#FFFFFF",
            fgColorHover: "#888888",
            fgColorDisabled: "#666666",
            baseGlowColor: 0,
        },
    ];

    let nomTheme: string = getCookie("theme") || listeTheme[0].nom;

    function applyTheme(themeName: string) {
        let selectedTheme = listeTheme.find((theme) => theme.nom === themeName);
        if (selectedTheme) {
            for (let key of Object.keys(selectedTheme) as (keyof Theme)[]) {
                document.documentElement.style.setProperty(`--${key}`, selectedTheme[key].toString());
            }
        }
    }

    $: {
        applyTheme(nomTheme);
        setCookie("theme", nomTheme, 365);
    }
</script>

<main class="select-theme">
    <select
        name="select-theme"
        id="select-theme"
        bind:value={nomTheme}
    >
        {#each listeTheme as theme}
            <option value={theme.nom}>{theme.nom}</option>
        {/each}
    </select>
</main>

<style>
    .select-theme {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    select {
        width: 95%;
        height: 100%;
        background: none;
        border: var(--fgColor) solid 0.1vw;
        border-radius: 1vw;
        font-size: var(--font-size2);
        color: var(--fgColor);
        cursor: pointer;
        padding: 4px 10px;
    }
</style>