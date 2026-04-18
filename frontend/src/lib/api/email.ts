"use server";

import { Result } from "@/shared/core/Result";
import { EmailRequest, EmailResponse } from "@/types";

const BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api/Email`;

export const getAllEmails = async (jwt: string): Promise<Result<EmailResponse[], Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));
	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	const result = await response.json();
	return Result.ok(result.data);
};

export const sendEmail = async (jwt: string, email: EmailRequest): Promise<Result<string, Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));

	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		});
		if (!response.ok) {
			const error = await response.json();
			return Result.fail(new Error(error.errors));
		}
		const data = await response.json();
		return Result.ok(data.idEmail);
	} catch (error) {
		return Result.fail(error as Error);
	}
};
