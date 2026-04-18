"use server";

import { api, auth } from "@/lib";

export async function getPdf(id: string) {
	const token = (await auth.isAuthenticated()) ?? "";
	return await api.pdf.getPdf(id, token);
}
