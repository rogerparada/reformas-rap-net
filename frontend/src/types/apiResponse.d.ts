import { StrapiError } from "./forms";

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
