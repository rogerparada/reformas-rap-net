import { CompanyInfo } from "@/types";

const API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";

export const getHomePage = async () => {
	"use cache";
	const url = `${API_URL}/api/home-page`;
	try {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	} catch (error) {
		console.error("Home page generation error: ", error);
	}
};

export const getCompanyInfo = async (jwt: string): Promise<CompanyInfo | undefined> => {
	"use cache";
	if (!jwt) return;

	const url = `${API_URL}/api/Document/company`;

	try {
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});
		return await response.json();
	} catch (error) {
		console.error("Home page generation error: ", error);
	}
};
