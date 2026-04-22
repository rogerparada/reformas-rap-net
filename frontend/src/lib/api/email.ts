"use server";

import { Result } from "@/shared/core/Result";
import { EmailResponse } from "@/types";
import { EmailInput } from "@/validations/email-validator";

const BASE_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api/Email`;

export const getAllEmails = async (jwt: string): Promise<Result<EmailResponse[], Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));
	const response = await fetch(API_URL, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
	if (!response.ok) {
		const error = await response.json();
		return Result.fail(new Error(error.errors));
	}
	const result = await response.json();
	return Result.ok(result.data);
};

export const sendEmail = async (jwt: string, email: EmailInput): Promise<Result<string, Error>> => {
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

			return error.errors.message
				? Result.fail(new Error(error.errors.message))
				: Result.fail(new Error(`Error al enviar el correo: ${response.status}`));
		}
		const data = await response.json();
		return Result.ok(data.idEmail);
	} catch (error) {
		return Result.fail(error as Error);
	}
};

export const editEmail = async (jwt: string, id: string, email: EmailInput): Promise<Result<string, Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));

	try {
		const response = await fetch(`${API_URL}/${id}/edit`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		});

		if (!response.ok) {
			const error = await response.json();

			return error.errors.message
				? Result.fail(new Error(error.errors.message))
				: Result.fail(new Error(`Error al guardar el correo: ${response.status}`));
		}
		const data = await response.json();
		return Result.ok(data.idEmail);
	} catch (error) {
		return Result.fail(error as Error);
	}
};
export const editSendEmail = async (jwt: string, id: string, email: EmailInput): Promise<Result<string, Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));

	try {
		const response = await fetch(`${API_URL}/${id}/send`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		});

		if (!response.ok) {
			const error = await response.json();

			return error.errors.message
				? Result.fail(new Error(error.errors.message))
				: Result.fail(new Error(`Error al enviar el correo: ${response.status}`));
		}
		const data = await response.json();
		return Result.ok(data.idEmail);
	} catch (error) {
		return Result.fail(error as Error);
	}
};

export const forwardEmail = async (jwt: string, id: string): Promise<Result<string, Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));

	try {
		const response = await fetch(`${API_URL}/${id}/forward`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const error = await response.json();

			return error.errors.message
				? Result.fail(new Error(error.errors.message))
				: Result.fail(new Error(`Error al enviar el correo: ${response.status}`));
		}
		const data = await response.json();
		return Result.ok(data.idEmail);
	} catch (error) {
		return Result.fail(error as Error);
	}
};

export const getEmailById = async (jwt: string, id: string): Promise<Result<EmailResponse, Error>> => {
	if (!jwt) return Result.fail(new Error("No Autenticado"));
	const response = await fetch(`${API_URL}/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	if (!response.ok) {
		const error = await response.json();
		return Result.fail(new Error(error.errors));
	}

	const result = await response.json();
	return Result.ok(result.data);
};
