import { StateCreator } from "zustand";
import { DocumentInfo } from "../types/description";

export type DocumentSlice = {
	document: DocumentInfo;
	setDocument: (document: DocumentInfo) => void;
	changeDocumentAttribute: (key: keyof DocumentInfo, value: string | boolean) => void;
	clearDocument: () => void;
};

const initialDocument: DocumentInfo = {
	idDocumento: "",
	tipoDocumento: "Factura",
	numeroDocumento: "",
	fecha: new Date().toISOString().substring(0, 10),
	iva: true,
	estado: "Borrador",
};

export const createDocumentSlice: StateCreator<DocumentSlice> = (set, get) => ({
	document: initialDocument,
	setDocument: (document: DocumentInfo) => {
		const { fecha } = document;
		if (fecha && fecha.includes("T")) {
			document.fecha = fecha.split("T")[0];
		}
		set({ document });
	},
	changeDocumentAttribute: (key, value) => set({ document: { ...get().document, [key]: value } }),
	clearDocument: () => set({ document: initialDocument }),
});
