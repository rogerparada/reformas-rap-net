export type FormState = {
	success?: boolean;
	message?: string;
	data?: {
		username?: string;
		password?: string;
	};
	serverErrors?: string | string[] | null;
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
	serverErrors?: string | string[] | null;
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

export type EmailFormState = {
	success?: boolean;
	message?: string;
	data?: {
		to?: string;
		cc?: string;
		cco?: string;
		subject?: string;
		message?: string;
		attachment?: string;
		attachmentName?: string;
		idCliente?: string;
	};
	serverErrors?: string | string[] | null;
	errors?: {
		to?: string[];
		cc?: string[];
		cco?: string[];
		subject?: string[];
		message?: string[];
		attachment?: string[];
		idCliente?: string[];
	} | null;
};
