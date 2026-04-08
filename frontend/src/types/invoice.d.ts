import { ClientInfo, CompanyInfo } from "./description";
export type InvoiceData = {
	company: CompanyInfo;
	client: ClientInfo;
	document: DocumentDescription;
	items: Item[];
	subtotal: number;
	iva: number;
	total: number;
};
