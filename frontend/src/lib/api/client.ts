import { cacheLife, cacheTag, updateTag } from "next/cache";
import { ClientInput, EditClientInput } from "@/validations/client-validator";
import { ApiResponse, ClienteResponse, FullClienteResponse } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Client`;

export const getClients = async (jwt: string) => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");
	const url = `${API_URL}`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Error al obtener clientes");
	}

	const result = await response.json();
	return result as ClienteResponse[];
};

export const getClientsFullData = async (jwt: string): Promise<ClienteResponse[]> => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");

	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Error al obtener clientes");
	}
	const result = await response.json();

	return result as ClienteResponse[];
};

export const getClientById = async (jwt: string, clientId: string): Promise<ClienteResponse> => {
	"use cache";
	cacheLife("hours");
	cacheTag("cliente");

	const url = `${API_URL}/${clientId}`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Error al obtener cliente");
	}

	const result = await response.json();

	return result.data as ClienteResponse;
};

export const getFullClientById = async (jwt: string, clientId: string): Promise<FullClienteResponse> => {
	"use cache";
	cacheLife("hours");
	cacheTag("cliente");

	const url = `${API_URL}/${clientId}`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Error al obtener cliente");
	}

	const result = await response.json();

	return result as FullClienteResponse;
};

export const createClient = async (jwt: string, data: ClientInput): Promise<ApiResponse<string>> => {
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
		throw new Error(`Error: ${data.errors.message}`);
	}

	updateTag("clientes");
	return {
		status: response.status,
		message: "Cliente creado correctamente",
	};
};

export const editClient = async (jwt: string, values: EditClientInput): Promise<ApiResponse<string>> => {
	const { id, ...data } = values;
	const url = `${API_URL}/${id}`;

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		const data = await response.json();
		throw new Error(`Error: ${data.errors.message}`);
	}

	updateTag("clientes");
	return {
		status: response.status,
		message: "Cliente editado correctamente",
	};
};

export const deleteClient = async (jwt: string, id: ClienteResponse["id"]): Promise<ApiResponse<string>> => {
	const url = `${API_URL}/${id}`;

	const response = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		const data = await response.json();
		throw new Error(`Error: ${data.errors.message}`);
	}
	updateTag("clientes");
	return {
		status: response.status,
		message: "Cliente eliminado correctamente",
	};
};
