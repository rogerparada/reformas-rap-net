import { cacheLife, cacheTag } from "next/cache";
import { ClientInput, EditClientInput } from "@/validations/client-validator";
import { ApiError, ClienteResponse, FullClienteResponse } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Client`;

export const getClients = async (jwt: string): Promise<ClienteResponse[] | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");

	if (!jwt) return;

	const url = `${API_URL}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (error) {
		console.error("Get Clients error: ", error);
	}
};

export const getClientsFullData = async (jwt: string): Promise<ClienteResponse[] | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");

	if (!jwt) return;

	try {
		const response = await fetch(API_URL, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Get Clients error: ", error);
	}
};

export const getClientById = async (jwt: string, clientId: string): Promise<ClienteResponse | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("cliente");

	if (!jwt) return;

	const url = `${API_URL}/${clientId}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();

		return result.data;
	} catch (error) {
		console.error("Get Client By ID error: ", error);
	}
};

export const getFullClientById = async (jwt: string, clientId: string): Promise<FullClienteResponse> => {
	"use cache";
	cacheLife("hours");
	cacheTag("cliente");

	if (!jwt) throw new Error("No autenticado");

	const url = `${API_URL}/${clientId}`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		return await response.json();
	} catch (error) {
		console.error("Get Client By ID error: ", error);
		throw new Error("Error al obtener el cliente");
	}
};

export const createClient = async (jwt: string, data: ClientInput) => {
	if (!jwt) return;

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const data = await response.json();
			return {
				status: data.status,
				error: data.errors,
			};
		}

		return {
			status: response.status,
			message: "Cliente creado correctamente",
			error: null,
		};
	} catch (error) {
		console.error("Create client error: ", error);
		throw error;
	}
};

export const editClient = async (jwt: string, values: EditClientInput): Promise<ApiError> => {
	if (!jwt) throw new Error("No autenticado");

	const { id, ...data } = values;
	const url = `${API_URL}/${id}`;

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.status === 200) {
			return {
				status: response.status,
				error: null,
			};
		}

		const responseData = await response.json();

		return {
			status: responseData.status,
			error: responseData.errors.message,
		};
	} catch (error) {
		console.error("Create client error: ", error);
		throw error;
	}
};

export const deleteClient = async (jwt: string, id: ClienteResponse["id"]) => {
	if (!jwt) return;

	const url = `${API_URL}/${id}`;

	try {
		return await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error(`Error delete Client`, error);
	}
};
