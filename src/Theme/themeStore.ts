import { writable } from "svelte/store";
import { getCookie, setCookie } from "../utils";
import { listeTheme } from "./themes";
import type { Theme } from "./themes";

function createThemeStore() {
	const nomTheme = getCookie("theme") || listeTheme[0].nom;
	const { subscribe, set } = writable(nomTheme);

	function applyTheme(themeName: string) {
		const selectedTheme = listeTheme.find(
			(theme) => theme.nom === themeName,
		);
		if (selectedTheme) {
			for (let key of Object.keys(selectedTheme) as (keyof Theme)[]) {
				document.documentElement.style.setProperty(
					`--${key}`,
					selectedTheme[key].toString(),
				);
			}
		}
		setCookie("theme", themeName, 365);
	}

	function getValueTheme(key: keyof Theme) {
		const currentThemeName = getCookie("theme") || nomTheme;
		const selectedTheme = listeTheme.find(
			(theme) => theme.nom === currentThemeName,
		);
		if (selectedTheme) {
			return selectedTheme[key];
		}
		return "";
	}

	// Appliquer le thème initial
	applyTheme(nomTheme);

	return {
		subscribe,
		set: (value: string) => {
			set(value);
			applyTheme(value);
		},
		getValueTheme,
	};
}

export const theme = createThemeStore();
