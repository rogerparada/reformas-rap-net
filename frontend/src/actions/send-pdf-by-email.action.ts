"use server";

import { auth } from "@/lib";
import { sendEmail } from "@/lib/api/email";
import { ApiResponse } from "@/types";
import { EmailInput, emailSchema } from "@/validations/email-validator";

export async function sendPdfByEmail(formData: FormData): Promise<ApiResponse> {
	//TODO: Implementar el envío de PDF por email
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
	const resp = await sendEmail(token, validate.data);

	if (!resp.isSuccess) {
		return { message: resp.getError().message ?? "Error al enviar el correo", status: 404, success: false };
	}

	return { message: "Se ha enviado correctamente", status: 200, success: true };
}
