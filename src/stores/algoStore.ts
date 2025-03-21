import { writable, get } from "svelte/store";
import type { Algo } from "../utils/types";
import { getSessionData } from "./userStores";

export type TAlgoCreateDTO = {
	nom: string;
	ownerId: number;
	sourceCode: JSON;
};

export type TAlgoUpdateDTO = {
	id: number;
	nom: string;
	requestedUserId: number;
	sourceCode: JSON;
};

// Création du store pour les algorithmes
const algoStore = writable<Algo[]>([]);

const sessionData = getSessionData();
const API_BASE_URL = "/api/algos";

export const fetchAlgosByUserId = async (userId: number) => {
	const response = await fetch(`${API_BASE_URL}/byUserId/${userId}`);
	const data = await response.json();
	algoStore.set(data);
};

export const fetchAlgoById = async (id: number) => {
	const response = await fetch(`${API_BASE_URL}/${id}`);
	const data = await response.json();
	return data;
};

export const createAlgo = async (algo: TAlgoCreateDTO) => {
	const response = await fetch(API_BASE_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${sessionData?.token}`,
		},
		body: JSON.stringify(algo),
	});

	const isresponseOk = response.ok;
	const responseData = await response.json();

	if (!isresponseOk)
		throw new Error(
			`Impossible de créer l'algorithme: ${responseData.message}`,
		);

	// Extraire l'algorithme
	const algoData: Algo = responseData.data;

	algoStore.update((current) => [...current, algoData]);
};

export const updateAlgo = async (id: number, algo: TAlgoUpdateDTO) => {
	const response = await fetch(`${API_BASE_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(algo),
	});
	const responseData = await response.json();

	// Extraire l'algorithme
	const algoData: Algo = responseData.data;
	algoStore.update((current) =>
		current.map((a) => (a.id === id ? algoData : a)),
	);
};

export const deleteAlgo = async (id: number) => {
	await fetch(`${API_BASE_URL}/${id}`, {
		method: "DELETE",
	});
	algoStore.update((current) => current.filter((a) => a.id !== id));
};

// Fonctions pour récupérer les algorithmes
export function getAlgos() {
	return get(algoStore);
}

export function getLastAlgo() {
	return get(algoStore)[get(algoStore).length - 1];
}

export default algoStore;
