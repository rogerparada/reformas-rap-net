"use client";

import ActionButton from "./action-button";
import { DocumentResponse } from "../../../types/description";
import { getPdf } from "@/actions/pdf.action";
import { useState } from "react";

type SavePdfButtonProps = {
	state?: boolean;
	id: DocumentResponse["idDocumento"];
	name: string;
};

export default function SavePdfButton({ id, name }: SavePdfButtonProps) {
	const [descargando, setDescargando] = useState(false);

	const descargarPdf = async () => {
		setDescargando(true);

		try {
			const blob = await getPdf(id);
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `${name}.pdf`);

			document.body.appendChild(link);
			link.click();

			link.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		} catch (error) {
			console.error("Error en la descarga:", error);
			alert("No se pudo descargar la factura");
		} finally {
			setDescargando(false);
		}
	};

	return (
		<ActionButton
			icon="doc_pdf"
			action={async () => {
				await descargarPdf();
			}}
			text={descargando ? "Generando PDF..." : "Descargar Factura"}
		/>
	);
}
