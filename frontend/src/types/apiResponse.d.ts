import { StrapiError } from "./forms";
import { DocumentResponse } from "./description";

export type ApiResponse = {
	success?: boolean;
	message?: string;
	status: number;
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
	name: string;
	message: string;
	details?: Record<string, StrapiError[]>;
};

export type DocumentFullResponse = {
	data?: DocumentResponse[] | null;
	error?: ApiError;
	meta?: ApiMeta;
};
