import { ItemTable } from "./items";

export type DocumentResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	fecha: string;
	estado: "Borrador" | "Editado" | "Enviado";
	iva: boolean;
	idCliente: string;
};
export type DocumentInfoResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	fecha: string;
	estado: "Borrador" | "Editado" | "Enviado";
	iva: boolean;
	cliente: string;
	valor: number;
};

export type ClienteResponse = {
	id: string;
	email: string;
	name: string;
	city: string;
	phone: string;
	address: string;
	nif: string | null;
	documentos: number;
};

export type ClienteInfo = {
	id: string;
	email: string;
	name: string;
	city: string;
	phone: string;
	address: string;
	nif: string | undefined;
};

export type ItemResponse = {
	id: number;
	descripcion: string;
	precio: number;
	importe: number;
	cantidad: number;
	total: number;
};

export type FullDocumentResponse = DocumentResponse & {
	cliente: ClienteResponse;
	items: ItemTable[];
};

export type FullClienteResponse = {
	id: string;
	email: string;
	name: string;
	city: string;
	phone: string;
	address: string;
	nif: string | undefined;
	documentos: DocumentInfoResponse[];
};

export type CompanyInfo = {
	name: string;
	phone: string;
	email: string;
	address: string;
	city: string;
	web: string;
	nif: string;
};

export type DocumentInfo = {
	idDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	numeroDocumento: string;
	fecha: string;
	iva: boolean;
	estado: "Borrador" | "Editado" | "Enviado";
};
