"use client";

import { useState } from "react";
import ViewButton from "../ui/view-button";
import SavePdfButton from "../ui/button/save-pdf-button";
import SenMailModal from "../modal/send-mail-modal";
import { useAppStore } from "@/store/useAppStore";
import ActionButton from "../ui/button/action-button";
import DeleteDocumentButton from "../ui/button/delete-document-button";
import { DocumentInfo } from "@/types";
import jsPDF from "jspdf";

type DocumentOptionsProps = {
	edit?: boolean;
	id?: DocumentInfo["documentId"];
	link: string;
	pdf?: jsPDF;
};

export default function DocumentOptions({ id, edit, link, pdf }: DocumentOptionsProps) {
	const [modal, setModal] = useState(false);
	const email = useAppStore((state) => state.client?.email);
	const blob = pdf?.output("blob");
	return (
		<>
			<SenMailModal pdfBlob={blob} showModal={modal} closeModal={setModal} />

			<div className="container mx-auto p-3 flex justify-between gap-5 max-w-5xl">
				<ViewButton edit link={link} />

				{email && <ActionButton icon="mail" action={() => setModal(true)} text="Enviar por mail" />}
				{pdf && <SavePdfButton pdf={pdf} />}
				{edit && <DeleteDocumentButton id={id ?? ""} />}
			</div>
		</>
	);
}
