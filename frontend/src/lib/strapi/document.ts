import { ApiDocumentResponse, DocumentInfoResponse, DocumentResponse, FullDocumentResponse } from "@/types";
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

export const getFullDocuments = async (jwt: string): Promise<FullDocumentResponse[]> => {
	if (!jwt) {
		throw new Error("No autorizado");
	}

	try {
		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	} catch (error) {
		console.error("Get Documents error: ", error);
		throw new Error("Error al obtener los documentos");
	}
};

export const getDocumentsInfoByType = async (jwt: string, tipo: DocumentInfoResponse["tipoDocumento"]): Promise<DocumentInfoResponse[]> => {
	if (!jwt) {
		throw new Error("No autorizado");
	}

	const queryString = `${API_URL}/info?tipo=${tipo}`;

	try {
		const response = await fetch(queryString, {
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

export const getFullDocumentsByType = async (jwt: string, tipo: DocumentResponse["tipoDocumento"]): Promise<DocumentResponse[]> => {
	if (!jwt) {
		throw new Error("No autorizado");
	}

	const queryString = `${API_URL}?tipo=${tipo}`;

	try {
		const response = await fetch(queryString, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	} catch (error) {
		console.error("Get Documents error: ", error);
		throw new Error("Error al obtener los documentos");
	}
};

export const getDocumentById = async (jwt: string, id: string): Promise<FullDocumentResponse> => {
	const url = `${API_URL}/${id}`;

	try {
		const resp = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		const result = await resp.json();
		return result;
	} catch (error) {
		console.error(`Error getting Document`, error);
		throw new Error("Error al obtener el documento");
	}
};

export const createDocument = async (jwt: string, data: DocumentInput): Promise<ApiDocumentResponse> => {
	try {
		const resp = await fetch(API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await resp.json();

		return {
			success: resp.ok,
			status: resp.status,
			data: !resp.ok ? null : result,
			errors: !resp.ok ? [result.errors.message] : null,
		};
	} catch (error) {
		console.error(`Error getting Document`, error);
		throw new Error("Error al obtener el documento");
	}
};

export const editDocument = async (jwt: string, id: string, data: DocumentInput): Promise<ApiDocumentResponse> => {
	const url = `${API_URL}/${id}`;

	try {
		const resp = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const result = await resp.json();

		return {
			success: resp.ok,
			status: resp.status,
			data: !resp.ok ? null : result,
			errors: !resp.ok ? [result.errors.message] : null,
		};
	} catch (error) {
		console.error(`Error edit Document`, error);
		throw new Error("Error al editar el documento");
	}
};

export const deleteDocument = async (jwt: string, id: string): Promise<ApiDocumentResponse> => {
	const url = `${API_URL}/${id}`;

	try {
		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		console.log(result);
		return {
			success: response.ok,
			status: response.status,
			data: !response.ok ? null : result,
			errors: !response.ok ? [result.errors.message] : null,
		};
	} catch (error) {
		console.error(`Error delete Document`, error);
		throw new Error("Error al eliminar el documento");
	}
};
