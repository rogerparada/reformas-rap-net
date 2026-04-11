"use client";

import SaveDocumentModal from "../modal/save-document-modal";
import { useAppStore } from "@/store/useAppStore";

export default function NewDocumentOptions() {
	const document = useAppStore((state) => state.document);
	const idCliente = useAppStore((state) => state.client.id);
	const items = useAppStore((state) => state.items);
	return (
		<>
			<div className="container mx-auto p-3 flex justify-between gap-5 max-w-5xl">
				<SaveDocumentModal
					route="/gestion/documentos"
					text={`Crear ${document.tipoDocumento}`}
					icon="doc_add"
					document={{ document, idCliente, items }}
				/>
				<SaveDocumentModal route="/gestion/documentos" text="Guardar Borrador" draw document={{ document, idCliente, items }} />
			</div>
		</>
	);
}
