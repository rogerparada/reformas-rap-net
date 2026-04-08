import { StateCreator } from "zustand";
import { DocumentInfo } from "../types/description";

export type DocumentSlice = {
	document: DocumentInfo;
	setDocument: (document: DocumentInfo) => void;
	changeDocumentAttribute: (key: keyof DocumentInfo, value: string | boolean) => void;
	clearDocument: () => void;
};

const initialDocument: DocumentInfo = {
	id: "",
	documentId: "",
	tipoDocumento: "Factura",
	numeroDocumento: "",
	fecha: new Date().toISOString().substring(0, 10),
	iva: true,
	estado: "borrador",
};

export const createDocumentSlice: StateCreator<DocumentSlice> = (set, get) => ({
	document: initialDocument,
	setDocument: (document: DocumentInfo) => set({ document }),
	changeDocumentAttribute: (key, value) => set({ document: { ...get().document, [key]: value } }),
	clearDocument: () => set({ document: initialDocument }),
});
