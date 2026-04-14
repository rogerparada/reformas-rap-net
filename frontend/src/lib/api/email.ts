"use server";

import { EmailResponse } from "@/types";

const BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/Email`;

export const getAllEmails = async (jwt: string): Promise<EmailResponse[]> => {
	if (!jwt) throw new Error("No Autenticado");
	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	return await response.json();
};
