import { writable, get } from "svelte/store";
import {
	theme,
	getPositionTheme,
	getThemeNameFromPosition,
} from "./themeStore";
import { getCookie } from "../utils/utils";
import type { User } from "../utils/types";

// Création du store utilisateur
const userStore = writable<User | null>(null);

// Fonction pour enregistrer l'utilisateur après connexion
export function setUser(user: User, rememberMe: boolean) {
	// Stocker l'utilisateur en mémoire
	userStore.set(user);

	// Extraire le token et l'ID
	const token = user.tokens?.[0]?.token;
	const userId = user.id.toString();
	const tokenExpiration = user.tokens?.[0]?.dateExpiration;

	if (token) {
		// Calculer la durée de validité du token en secondes
		const expirationTime = tokenExpiration
			? Math.floor((tokenExpiration - Date.now()) / 1000)
			: 604800; // 7 jours par défaut

		if (rememberMe) {
			// Stockage sécurisé en cookie (expire selon la date d'expiration du token)
			document.cookie = `authToken=${token}; path=/; max-age=${expirationTime}; Secure; SameSite=Strict`;
			document.cookie = `userId=${userId}; path=/; max-age=${expirationTime}; Secure; SameSite=Strict`;
		} else {
			// Stocker dans sessionStorage
			sessionStorage.setItem("authToken", token);
			sessionStorage.setItem("userId", userId);
		}
	}
}

// Fonction pour récupérer le token et l'ID utilisateur
export function getSessionData() {
	// Vérifier sessionStorage
	const sessionToken = sessionStorage.getItem("authToken");
	const sessionUserId = sessionStorage.getItem("userId");

	if (sessionToken && sessionUserId) {
		return { token: sessionToken, userId: sessionUserId };
	}

	// Vérifier les cookies
	const cookies = document.cookie ? document.cookie.split("; ") : [];
	const tokenCookie = cookies.find((row) => row.startsWith("authToken="));
	const userIdCookie = cookies.find((row) => row.startsWith("userId="));

	const token = tokenCookie ? tokenCookie.split("=")[1] : null;
	const userId = userIdCookie
		? parseInt(userIdCookie.split("=")[1], 10)
		: null;

	if (token && userId) {
		return { token, userId };
	}

	return null;
}

// Fonction pour charger les infos utilisateur au démarrage
export async function loadUser() {
	const sessionData = getSessionData();

	if (sessionData) {
		try {
			const response = await fetch(`/api/users/${sessionData.userId}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${sessionData.token}`,
				},
			});

			if (!response.ok) throw new Error("Utilisateur non trouvé");
			const user: User = await response.json();

			// Vérifier si le token a expiré
			const tokenExpiration = user.tokens?.[0]?.dateExpiration;
			if (tokenExpiration && tokenExpiration < Date.now()) {
				logout();
				return;
			}

			// Synchroniser le thème
			const cookiePositionTheme = getPositionTheme(getCookie("theme"));
			if (user.theme && user.theme !== cookiePositionTheme) {
				theme.set(getThemeNameFromPosition(user.theme));
			}
			userStore.set(user);
		} catch (error) {
			console.error("Erreur lors du chargement de l'utilisateur:", error);
			logout();
		}
	}
}

// Fonction pour se déconnecter
export function logout() {
	userStore.set(null);
	document.cookie = "authToken=; path=/; max-age=0"; // Supprimer le cookie
	document.cookie = "userId=; path=/; max-age=0"; // Supprimer l'ID
	sessionStorage.removeItem("authToken"); // Supprimer sessionStorage
	sessionStorage.removeItem("userId");
	document.location.hash = "#/login"; // Rediriger vers la page de connexion
}
// Fonction pour vérifier si l'utilisateur est connecté
export function isUserLoggedIn() {
	return get(userStore) !== null;
}

export default userStore;
