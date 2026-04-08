import { cacheLife, cacheTag } from "next/cache";
import { ClientInput, EditClientInput } from "@/validations/client-validator";
import { ClientInfo, ClientResponse } from "../../types";
import qs from "qs";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Client`;

export const getClients = async (jwt: string): Promise<ClientInfo[] | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");

	if (!jwt) return;
	const queryString = {
		sort: ["name:asc"],
	};
	const query = qs.stringify(queryString);

	const url = `${API_URL}?${query}`;
	console.log(url);

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
		console.error("Get Clients error: ", error);
	}
};

export const getClientsFullData = async (jwt: string): Promise<ClientResponse[] | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("clientes");

	const queryString = {
		sort: ["name:asc"],
		populate: {
			documentos: {
				fields: ["tipoDocumento"],
			},
		},
	};

	if (!jwt) return;
	const query = qs.stringify(queryString);

	const url = `${API_URL}?${query}`;

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
		console.error("Get Clients error: ", error);
	}
};

export const getClientById = async (jwt: string, clientId: string): Promise<ClientInfo | undefined> => {
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

export const getClientFullDataById = async (jwt: string, clientId: string): Promise<ClientResponse | undefined> => {
	"use cache";
	cacheLife("hours");
	cacheTag("cliente");

	if (!jwt) return;
	const queryString = {
		populate: {
			documentos: {
				fields: ["numeroDocumento", "tipoDocumento", "fecha", "estado", "iva"],
				populate: {
					items: {
						fields: ["total"],
					},
				},
			},
		},
	};

	if (!jwt) return;
	const query = qs.stringify(queryString);

	const url = `${API_URL}/${clientId}?${query}`;

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

export const createClient = async (jwt: string, data: ClientInput) => {
	if (!jwt) return;

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Create client error: ", error);
		throw error;
	}
};

export const editClient = async (jwt: string, values: EditClientInput) => {
	if (!jwt) return;

	const { id, ...data } = values;
	const url = `${API_URL}/${id}`;

	try {
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ data }),
		});

		const result = await response.json();

		return result;
	} catch (error) {
		console.error("Create client error: ", error);
		throw error;
	}
};

export const deleteClient = async (jwt: string, id: ClientInfo["documentId"]) => {
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
