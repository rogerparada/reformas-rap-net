import { useState } from "react";
import { actions } from "@/actions";
//import { DocumentInfo } from "@/types";

// type UseSendEmailProps = {
// 	email: string;
// 	id: DocumentInfo["idDocumento"];
// 	fileId: string;
// 	clientId: string;
// };

export const useSendEmail = () => {
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const sendEmail = async (formData: FormData) => {
		setSending(true);
		setError(null);
		setSuccess(null);

		try {
			const resp = await actions.email.sendPdfByEmail(formData);

			if (resp.success) {
				setSuccess(resp.message || "Correo enviado correctamente.");
				return { success: true };
			} else {
				setError(resp.message || "Error al enviar el correo.");
				return { success: false };
			}
		} catch (err) {
			console.error(err);
			setError("Ocurrió un error inesperado al enviar el correo.");
			return { success: false };
		} finally {
			setSending(false);
		}
	};

	const reset = () => {
		setSending(false);
		setError(null);
		setSuccess(null);
	};

	return { sending, error, success, sendEmail, reset };
};
