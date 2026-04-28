"use server";

import { updateTag } from "next/cache";
import { api, auth } from "../lib";
import { ApiDocumentResponse, ApiResponse, DocumentResponse, SaveDocumentInput } from "../types";
import { documentSchema } from "../validations/document-validator";

export async function createDocumentAction(documentInput: SaveDocumentInput): Promise<ApiResponse<string>> {
	const { document, idCliente, items } = documentInput;
	const doc = {
		...document,
		idCliente,
		items,
	};

	const result = documentSchema.safeParse(doc);
	if (!result.success) {
		return {
			success: false,
			status: 400,
			errors: result.error.issues.map((issue) => `${issue.message}`),
		};
	}

	try {
		const token = (await auth.isAuthenticated()) ?? "";
		const response = await api.documents.createDocument(token, result.data);

		updateTag("documentos");

		return response;
	} catch {
		return {
			status: 400,
			success: false,
			errors: ["Error: No se pudo crear el documento"],
		};
	}
}

export async function editDocumentAction(documentInput: SaveDocumentInput): Promise<ApiResponse<string>> {
	const doc = {
		...documentInput.document,
		idCliente: documentInput.idCliente,
		items: documentInput.items,
	};

	const id = doc.idDocumento;

	const result = documentSchema.safeParse(doc);
	if (!result.success) {
		return {
			success: false,
			status: 400,
			errors: result.error.issues.map((issue) => `${issue.message}`),
		};
	}

	const token = (await auth.isAuthenticated()) ?? "";

	const response = await api.documents.editDocument(token, doc.idDocumento, result.data);
	if (!response.status) {
		return {
			status: 400,
			success: false,
			errors: response.errors,
		};
	}

	updateTag("documentos");
	updateTag(`document-${id}`);
	return {
		success: true,
		data: doc.idDocumento,
		status: response.status,
	};
}

export async function deleteDocumentAction(id: DocumentResponse["idDocumento"]): Promise<ApiDocumentResponse> {
	if (id?.length !== 36) {
		return {
			status: 400,
			success: false,
			data: null,
			errors: [`Error(${id?.length}): La id del documento no es valida`],
		};
	}

	const token = (await auth.isAuthenticated()) ?? "";

	const response = await api.documents.deleteDocument(token, id);
	if (!response.isSuccess) {
		return {
			status: 400,
			success: false,
			data: null,
			errors: [response.getError().message],
		};
	}

	return response.getValue();
}
