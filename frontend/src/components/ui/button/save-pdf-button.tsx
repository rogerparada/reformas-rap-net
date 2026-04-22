"use client";

import { useAppStore } from "@/store/useAppStore";
import ActionButton from "./action-button";
import jsPDF from "jspdf";

type SavePdfButtonProps = {
	state?: boolean;
	pdf: jsPDF;
};

export default function SavePdfButton({ pdf }: SavePdfButtonProps) {
	const { numeroDocumento } = useAppStore((state) => state.document);

	return <ActionButton icon="doc_pdf" action={() => pdf.save(numeroDocumento)} text="Descargar PDF" />;
}
