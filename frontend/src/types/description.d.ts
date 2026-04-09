export type DocumentResponse = {
	idDocumento: string;
	numeroDocumento: string;
	tipoDocumento: "Factura" | "Presupuesto" | "CuentaCobro";
	fecha: string;
	estado: "borrador" | "enviada" | "editada";
	iva: boolean;
	idCliente: number;
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
