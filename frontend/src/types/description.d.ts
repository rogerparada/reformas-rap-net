import { ItemTable } from "./items";

type Estado = "Borrador" | "Editado" | "Enviado";
type TipoDocumento = "Factura" | "Presupuesto" | "CuentaCobro";

export type DocumentResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: TipoDocumento;
	fecha: string;
	estado: Estado;
	iva: boolean;
	idCliente: string;
};
export type DocumentInfoResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: TipoDocumento;
	fecha: string;
	estado: Estado;
	iva: boolean;
	cliente: string;
	total: number;
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
	tipoDocumento: TipoDocumento;
	numeroDocumento: string;
	fecha: string;
	iva: boolean;
	estado: Estado;
};

export type EmailResponse = {
	id: string;
	destination: string;
	subject: string;
	message: string;
	status: Estado;
	attachment: string | null;
	cc: string | null;
	cco: string | null;
	date: string;
	cliente: {
		id: string;
		name: string;
	};
};
