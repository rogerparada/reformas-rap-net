import { StateCreator } from "zustand";
import { DocumentInfo } from "../types/description";

export type DocumentSlice = {
	document: DocumentInfo;
	originalTipoDocumento: string;
	originalNumeroDocumento: string;
	setDocument: (document: DocumentInfo) => void;
	setOriginalDocumentInfo: (tipo: string, numero: string) => void;
	changeDocumentAttribute: (key: keyof DocumentInfo, value: string | number) => void;
	clearDocument: () => void;
};

const initialDocument: DocumentInfo = {
	idDocumento: "",
	tipoDocumento: "Factura",
	numeroDocumento: "",
	fecha: new Date().toISOString().substring(0, 10),
	iva: 0,
	estado: "Borrador",
};

export const createDocumentSlice: StateCreator<DocumentSlice> = (set, get) => ({
	document: initialDocument,
	originalTipoDocumento: "",
	originalNumeroDocumento: "",
	setDocument: (document: DocumentInfo) => {
		const { fecha } = document;
		if (fecha && fecha.includes("T")) {
			document.fecha = fecha.split("T")[0];
		}
		set({ document });
	},
	setOriginalDocumentInfo: (tipo, numero) => set({ originalTipoDocumento: tipo, originalNumeroDocumento: numero }),
	changeDocumentAttribute: (key, value) => set({ document: { ...get().document, [key]: value } }),
	clearDocument: () => set({ document: initialDocument, originalTipoDocumento: "", originalNumeroDocumento: "" }),
});
