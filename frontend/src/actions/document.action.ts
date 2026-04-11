"use server";

import { api, auth } from "../lib";
import { ApiDocumentResponse, DocumentResponse, SaveDocumentInput } from "../types";
import { processDetails } from "../utils";
import { documentSchema } from "../validations/document-validator";

export async function createDocumentAction(documentInput: SaveDocumentInput): Promise<ApiDocumentResponse> {
	const { document, idCliente, items } = documentInput;
	const doc = {
		...document,
		idCliente,
		items,
	};

	const result = documentSchema.safeParse(doc);
	if (!result.success) {
		console.log(result.error.issues);
		return {
			success: false,
			status: 400,
			data: null,
			errors: result.error.issues.map((issue) => `${issue.message}`),
		};
	}

	const token = (await auth.isAuthenticated()) ?? "";
	return await api.documents.createDocument(token, result.data);
}

export async function editDocumentAction(documentInput: SaveDocumentInput) {
	const doc = {
		...documentInput.document,
		idCliente: documentInput.idCliente,
		items: documentInput.items,
	};
	console.log(doc);

	const result = documentSchema.safeParse(doc);
	if (!result.success) {
		return {
			success: false,
			errors: result.error.issues.map((issue) => `${issue.message}`),
		};
	}

	const token = (await auth.isAuthenticated()) ?? "";

	const { data, error } = await api.documents.editDocument(token, documentInput.id, result.data);

	if (!data) {
		const errors = processDetails(error.details?.errors);
		return {
			success: false,
			errors,
		};
	}

	return {
		success: true,
		errors: [],
		data,
	};
}

export async function deleteDocumentAction(id: DocumentResponse["idDocumento"]) {
	if (id?.length !== 24) {
		return {
			success: false,
			errors: `Error(${id?.length}): La id del documento no es valida`,
		};
	}

	const token = (await auth.isAuthenticated()) ?? "";

	const response = await api.documents.deleteDocument(token, id);

	if (response?.status !== 204) {
		return {
			success: false,
			errors: "Error eliminando documento",
		};
	}

	return {
		success: true,
		errors: undefined,
	};
}
