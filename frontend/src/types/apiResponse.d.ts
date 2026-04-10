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
	error: string | null;
};
