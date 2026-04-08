export type FormState = {
	success?: boolean;
	message?: string;
	data?: {
		username?: string;
		password?: string;
	};
	serverErrors?: {
		status: number;
		name: string;
		message: string;
		details?: Record<string, string[]>;
	} | null;
	errors?: {
		identifier?: string[];
		username?: string[];
		email?: string[];
		password?: string[];
	} | null;
};

export type ClientFormState = {
	success?: boolean;
	message?: string;
	data?: {
		name?: string;
		email?: string;
		phone?: string;
		address?: string;
		city?: string;
		nif?: string;
	};
	serverErrors?: {
		status: number;
		name: string;
		message: string;
		details?: Record<string, StrapiError[]>;
	} | null;
	errors?: {
		name?: string[];
		email?: string[];
		phone?: string[];
		address?: string[];
		city?: string[];
		nif?: string[];
	} | null;
};

export type EditClientFormState = Omit<ClientFormState, "data"> & {
	data?: ClientFormState["data"] & {
		id?: string;
	};
};

export type StrapiError = {
	path?: string[];
	message: string;
	name: string;
	value: string;
};
