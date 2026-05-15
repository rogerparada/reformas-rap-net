import { DashboardResponse } from "@/types";

const STRAPI_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${STRAPI_URL}/api/Dashboard`;

export const getDashboardInfo = async (jwt: string): Promise<DashboardResponse> => {
	const response = await fetch(`${API_URL}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${result.errors.message}`);
	}

	return result.data as DashboardResponse;
};
