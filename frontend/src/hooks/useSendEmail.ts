import { useState } from "react";
import { actions } from "@/actions";
import { usePDF } from "./usePdf";

type UseSendEmailProps = {
	email: string;
	pdfBlob?: Blob;
	pdf?: React.RefObject<null>;
};

export const useSendEmail = ({ email, pdfBlob, pdf }: UseSendEmailProps) => {
	const { createBlobPdf } = usePDF();
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const sendEmail = async (formData: FormData) => {
		setSending(true);
		setError(null);
		setSuccess(null);

		try {
			const blob = pdf ? await createBlobPdf(pdf) : pdfBlob;
			if (!blob) {
				setError("No se pudo generar el PDF.");
				return { success: false };
			}

			const resp = await actions.email.sendPdfByEmail(blob, email, formData);

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
