"use client";

import LinkButton from "../ui/button/link-button";
import { useAppStore } from "@/store/useAppStore";
import SaveDocumentModal from "../modal/save-document-modal";

export default function DocumentEditOptions({ link }: { link: string }) {
	const id = useAppStore((state) => state.document.documentId);
	const document = useAppStore((state) => state.document);
	const cliente = useAppStore((state) => state.client?.documentId) || "";
	const items = useAppStore((state) => state.items);

	return (
		<div className="container mx-auto p-3 flex justify-between gap-5 ">
			<LinkButton icon="back" link={link} text="Volver" />
			<SaveDocumentModal route="/gestion/documentos" text="Guardar Cambios" edit document={{ id, document, cliente, items }} />
		</div>
	);
}
