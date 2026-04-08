import { ItemTable } from "./items";
import InfoDocumento from "../components/cards/info-documento";

export type StrapiInfo = {
	id?: string;
	documentId?: string;
};

export type CompanyInfo = StrapiInfo & {
	name: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	web: string;
	nif: string;
};

export type ClientInfo = StrapiInfo & {
	name: string;
	email: string;
	phone?: string;
	email?: string;
	address?: string;
	city?: string;
	nif?: string;
};

export type DocumentInfo = StrapiInfo & {
	tipoDocumento: "Factura" | "Presupuesto";
	numeroDocumento: string;
	fecha: string;
	iva: boolean;
	estado: "borrador" | "enviada" | "editada";
};

export type DocumentResponse = DocumentInfo & {
	cliente: InfoDocumento & {
		name: string;
	};
	items: ItemTable[];
};

export type ClientResponse = ClientInfo & {
	documentos: ClientDocument[];
};

export type ClientDocument = DocumentInfo & {
	items: ItemTable[];
};
