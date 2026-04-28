import { getQueryString } from "@/shared/api/querys";
import { Result } from "@/shared/core/Result";
import { ApiDocumentResponse, DocumentInfoResponse, DocumentResponse, DocumentSortBy, FullDocumentResponse, TipoDocumento } from "@/types";
import { DocumentInput } from "@/validations/document-validator";
import { cacheTag } from "next/cache";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Document`;

export const getDocuments = async (jwt: string): Promise<Result<DocumentResponse[], Error>> => {
	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();

	if (!response.ok) {
		return Result.fail<DocumentResponse[], Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}

	return Result.ok<DocumentResponse[], Error>(result.data as DocumentResponse[]);
};

export const getFullDocuments = async (jwt: string): Promise<Result<FullDocumentResponse[], Error>> => {
	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();
	if (!response.ok) {
		return Result.fail<FullDocumentResponse[], Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}
	return Result.ok<FullDocumentResponse[], Error>(result.data as FullDocumentResponse[]);
};

export const getDocumentsInfoByType = async (
	jwt: string,
	tipo: DocumentInfoResponse["tipoDocumento"],
): Promise<Result<DocumentInfoResponse[], Error>> => {
	const queryString = `${API_URL}/info?tipo=${tipo}`;

	const response = await fetch(queryString, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();

	if (!response.ok) {
		return Result.fail<DocumentInfoResponse[], Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}

	return Result.ok<DocumentInfoResponse[], Error>(result.data as DocumentInfoResponse[]);
};

export const getDocumentsInfo = async (
	jwt: string,
	tipo?: TipoDocumento,
	sortBy?: DocumentSortBy,
	desc?: boolean,
): Promise<Result<DocumentInfoResponse[], Error>> => {
	const queryString = `${API_URL}/info?${getQueryString({ tipo, sortBy, desc })}`;
	console.log(queryString);

	const response = await fetch(queryString, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	const result = await response.json();

	if (!response.ok) {
		return Result.fail<DocumentInfoResponse[], Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}

	return Result.ok<DocumentInfoResponse[], Error>(result.data as DocumentInfoResponse[]);
};

export const getFullDocumentsByType = async (jwt: string, tipo: DocumentResponse["tipoDocumento"]): Promise<DocumentResponse[]> => {
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
	"use cache";
	cacheTag("document", id);
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
		throw new Error("Error al obtener el documento");
	}
};

export const createDocument = async (jwt: string, data: DocumentInput): Promise<Result<ApiDocumentResponse, Error>> => {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const result = await response.json();
	if (!response.ok) {
		return Result.fail<ApiDocumentResponse, Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}

	return Result.ok<ApiDocumentResponse, Error>({
		success: true,
		status: response.status,
		data: result,
		errors: null,
	});
};

export const editDocument = async (jwt: string, id: string, data: DocumentInput): Promise<Result<ApiDocumentResponse, Error>> => {
	const url = `${API_URL}/${id}`;

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const result = await response.json();
	if (!response.ok) {
		return Result.fail<ApiDocumentResponse, Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
	}

	return Result.ok<ApiDocumentResponse, Error>({
		success: true,
		status: response.status,
		data: result,
		errors: null,
	});
};

export const deleteDocument = async (jwt: string, id: string): Promise<Result<ApiDocumentResponse, Error>> => {
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

		if (!response.ok) {
			return Result.fail<ApiDocumentResponse, Error>(new Error(`Error: ${response.status} ${result.errors.message}`));
		}

		return Result.ok<ApiDocumentResponse, Error>({
			success: response.ok,
			status: response.status,
			data: result,
			errors: null,
		});
	} catch (error) {
		console.error(`Error delete Document`, error);
		throw new Error("Error al eliminar el documento");
	}
};
