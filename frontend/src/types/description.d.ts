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
	items: ItemResponse[];
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
