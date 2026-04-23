import { DocumentResponse } from "./description";

export type ApiResponse = {
	success?: boolean;
	message?: string;
	status: number;
	error?: string;
	data?: unknown;
};

export type ApiMeta = {
	pagination?: {
		page: number;
		pageSize: number;
		pageCount: number;
		total: 0;
	};
};

export type ApiError = {
	status: number;
	error: string | null;
};

export type ApiDocumentResponse = {
	success: boolean;
	status: number;
	data: { idDocumento: string } | DocumentResponse | null;
	errors: string[] | null;
};

export type AuthSuccess = {
	token: string;
	expiration: string;
};
