"use server";

import z from "zod";
import { auth } from "@/lib";
import { api } from "@/lib";

import { ApiResponse, EmailFormState } from "@/types";
import { EmailInput, emailSchema } from "@/validations/email-validator";

export async function sendPdfByEmail(formData: FormData): Promise<ApiResponse> {
	const message: EmailInput = {
		to: formData.get("to")?.toString() ?? "",
		cc: formData.get("cc")?.toString() ?? "",
		cco: formData.get("cco")?.toString() ?? "",
		subject: formData.get("subject")?.toString() ?? "",
		message: formData.get("message")?.toString() ?? "",
		attachment: formData.get("attachment")?.toString() ?? "",
		idCliente: formData.get("idCliente")?.toString() ?? "",
	};

	const validate = emailSchema.safeParse(message);
	if (!validate.success) {
		const errors = validate.error.issues.map((issue) => issue.message).join(", ");
		return { message: "Error al enviar el correo", status: 404, success: false, error: errors };
	}
	const token = (await auth.isAuthenticated()) ?? "";
	const resp = await api.email.sendEmail(token, validate.data);

	if (!resp.isSuccess) {
		return { message: resp.getError().message ?? "Error al enviar el correo", status: 404, success: false };
	}

	return { message: "Se ha enviado correctamente", status: 200, success: true };
}

export async function forwardEmail(id: string): Promise<ApiResponse> {
	const token = (await auth.isAuthenticated()) ?? "";
	const resp = await api.email.forwardEmail(token, id);

	if (!resp.isSuccess) {
		return { message: resp.getError().message ?? "Error al enviar el correo", status: 404, success: false };
	}

	return { message: "Se ha enviado correctamente", status: 200, success: true };
}

export async function editEmail(prevState: EmailFormState, formData: FormData): Promise<EmailFormState> {
	const id = formData.get("id") as string;
	const action = formData.get("action") as string;

	if (action !== "save" && action !== "send") {
		return {
			success: false,
			message: "Error de validación",
			serverErrors: null,
			errors: null,
			data: prevState.data,
		};
	}

	const message: EmailInput = {
		id,
		to: formData.get("to")?.toString() ?? "",
		cc: formData.get("cc")?.toString() ?? "",
		cco: formData.get("cco")?.toString() ?? "",
		subject: formData.get("subject")?.toString() ?? "",
		message: formData.get("message")?.toString() ?? "",
		attachment: formData.get("attachment")?.toString() ?? "",
		idCliente: formData.get("idCliente")?.toString() ?? "",
	};

	const validate = emailSchema.safeParse(message);
	if (!validate.success) {
		const errors = z.flattenError(validate.error).fieldErrors;
		return {
			success: false,
			message: "Error de validación",
			serverErrors: null,
			errors,
			data: prevState.data,
		};
	}
	const token = (await auth.isAuthenticated()) ?? "";
	const resp = action === "save" ? await api.email.editEmail(token, id, validate.data) : await api.email.editSendEmail(token, id, validate.data);

	if (!resp.isSuccess) {
		return {
			success: false,
			message: "Error al guardar el correo",
			serverErrors: resp.getError().message ?? "Error del servidor",
			errors: null,
			data: message,
		};
	}

	return {
		success: true,
		message: action === "save" ? "Se ha editado correctamente" : "Se ha enviado correctamente",
		serverErrors: null,
		errors: null,
		data: message,
	};
}
