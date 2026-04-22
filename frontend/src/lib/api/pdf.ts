"use server";

const BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api/Pdf`;

export const getPdf = async (id: string, jwt: string) => {
	const response = await fetch(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return response.blob();
};
