"use server";

import { z } from "zod";

import { clientSchema, editClientSchema } from "../validations/client-validator";
import { ClientFormState, EditClientFormState } from "../types/forms";
import { api, auth } from "../lib";
import { ClienteResponse } from "../types";
import { updateTag } from "next/cache";

export const createClientAction = async (prevState: ClientFormState, formData: FormData): Promise<ClientFormState> => {
	const fields = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		phone: formData.get("phone") as string,
		address: formData.get("address") as string,
		city: formData.get("city") as string,
		nif: formData.get("nif") as string,
	};

	const result = clientSchema.safeParse(fields);

	if (!result.success) {
		return {
			...prevState,
			success: false,
			message: "Validation Error",
			serverErrors: null,
			errors: z.flattenError(result.error).fieldErrors,
			data: fields,
		};
	}

	const jwt = await auth.isAuthenticated();
	const response = await api.client.createClient(jwt!, result.data);

	if (!response.success) {
		return {
			...prevState,
			success: false,
			message: "Create client error",
			errors: null,
			serverErrors: response.errors,
			data: fields,
		};
	}

	updateTag("clientes");

	return {
		...prevState,
		success: true,
		message: "Create client successful",
		errors: null,
		serverErrors: null,
		data: fields,
	};
};

export const editClientAction = async (prevState: EditClientFormState, formData: FormData): Promise<EditClientFormState> => {
	const fields = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		phone: formData.get("phone") as string,
		address: formData.get("address") as string,
		city: formData.get("city") as string,
		nif: formData.get("nif") as string,
		id: formData.get("id") as string,
	};

	const result = editClientSchema.safeParse(fields);

	if (!result.success) {
		return {
			...prevState,
			success: false,
			message: "Validation Error",
			serverErrors: null,
			errors: z.flattenError(result.error).fieldErrors,
			data: fields,
		};
	}

	const jwt = await auth.isAuthenticated();

	const response = await api.client.editClient(jwt!, result.data);

	if (!response.success) {
		return {
			...prevState,
			success: false,
			message: "Validation Error",
			serverErrors: response.errors,
			errors: null,
			data: fields,
		};
	}

	updateTag("clientes");
	updateTag("cliente");

	return {
		...prevState,
		success: true,
		message: "Edit client successful",
		errors: null,
		serverErrors: null,
		data: fields,
	};
};

export const deleteClientAction = async (id: ClienteResponse["id"]) => {
	const jwt = await auth.isAuthenticated();

	const response = await api.client.deleteClient(jwt!, id);

	if (!response.success) {
		return {
			success: false,
			errors: "Error eliminando documento",
		};
	}
	updateTag("clientes");

	return {
		success: true,
		errors: undefined,
	};
};
