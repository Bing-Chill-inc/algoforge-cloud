import { writable } from "svelte/store";
import { getCookie, setCookie } from "../utils";
import { listTheme } from "./themes";
import type { Theme } from "./themes";

function createThemeStore() {
	const nameTheme = getCookie("theme") || listTheme[0].name;
	const { subscribe, set } = writable(nameTheme);

	function applyTheme(themeName: string) {
		const selectedTheme = listTheme.find(
			(theme) => theme.name === themeName,
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
		const currentThemeName = getCookie("theme") || nameTheme;
		const selectedTheme = listTheme.find(
			(theme) => theme.name === currentThemeName,
		);
		if (selectedTheme) {
			return selectedTheme[key];
		}
		return "";
	}

	// Appliquer le thème initial
	applyTheme(nameTheme);

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
