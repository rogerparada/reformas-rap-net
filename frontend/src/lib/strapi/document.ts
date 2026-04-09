import qs from "qs";
import { DocumentFullResponse, DocumentResponse } from "@/types";
import { DocumentInput } from "@/validations/document-validator";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Document`;

export const getDocuments = async (jwt: string): Promise<DocumentResponse[]> => {
	if (!jwt) return [];

	try {
		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			return [];
		}

		return await response.json();
	} catch (error) {
		console.error("Get Documents error: ", error);
		throw new Error("Error al obtener los documentos");
	}
};

export const getFullDocuments = async (jwt: string): Promise<DocumentFullResponse> => {
	const queryString = {
		populate: {
			items: {
				fields: ["total"],
			},
			cliente: {
				fields: ["name"],
			},
		},
	};
	if (!jwt) {
		return {
			data: null,
			error: { status: 403, name: "ForbiddenError", message: "forbidden" },
		};
	}

	const query = qs.stringify(queryString);

	const url = `${API_URL}?${query}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (!result.data) return result;

		return result;
	} catch (error) {
		console.error("Get Documents error: ", error);
		return {
			data: null,
			error: { status: 500, name: "ServerError", message: "Error de servidor" },
		};
	}
};

export const getFullDocumentsByType = async (jwt: string, tipo: "Factura" | "Presupuesto" | "CuentaCobro"): Promise<DocumentFullResponse> => {
	if (!jwt) {
		return {
			data: null,
			error: { status: 403, name: "ForbiddenError", message: "forbidden" },
		};
	}

	try {
		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const result = await response.json();
		if (!result.data) return result;

		return result;
	} catch (error) {
		console.error("Get Documents error: ", error);
		return {
			data: null,
			error: { status: 500, name: "ServerError", message: "Error de servidor" },
		};
	}
};

export const getDocumentById = async (jwt: string, id: string) => {
	const url = `${API_URL}/${id}`;

	try {
		const resp = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		const result = await resp.json();
		return result.data;
	} catch (error) {
		console.error(`Error getting Document`, error);
		return {
			data: null,
			error: { status: 500, name: "ForbiddenError", message: "forbidden" },
		};
	}
};

export const createDocument = async (jwt: string, data: DocumentInput) => {
	try {
		const resp = await fetch(API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});

		const result = await resp.json();
		console.log("API:", result);
		return result;
	} catch (error) {
		console.error(`Error getting Document`, error);
	}
};

export const editDocument = async (jwt: string, id: string, data: DocumentInput) => {
	const url = `${API_URL}/${id}`;

	try {
		const resp = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});

		const result = await resp.json();

		return result;
	} catch (error) {
		console.error(`Error edit Document`, error);
	}
};

export const deleteDocument = async (jwt: string, id: string) => {
	const url = `${API_URL}/${id}`;

	try {
		return await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error(`Error delete Document`, error);
	}
};
