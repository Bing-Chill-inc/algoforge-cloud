// Définition du type notification
export type notification = "error" | "success" | "warning";

// Définition du type User
export type User = {
	id: number;
	adresseMail: string;
	pseudo: string;
	dateInscription: string;
	theme: number;
	urlPfp: string | null;
	isVerified: boolean;
	tokens?: {
		dateCreation: number;
		dateExpiration: number;
		token: string;
	}[];
};
