export type DocumentResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	fecha: string;
	estado: "borrador" | "enviada" | "editada";
	iva: boolean;
	idCliente: number;
};
export type DocumentInfoResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	fecha: string;
	estado: "borrador" | "enviada" | "editada";
	iva: boolean;
	cliente: string;
	valor: number;
};

export type ClienteResponse = {
	id: number;
	email: string;
	name: string;
	city: string;
	phone: string;
	address: string;
	nif: string | null;
	documentos: number;
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
