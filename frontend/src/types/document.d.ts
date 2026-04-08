import { DocumentInfo, ClientInfo, CompanyInfo } from "./description";
import { ItemTable, TableDetails } from "./items";

export type FullDocument = {
	company: CompanyInfo;
	document: DocumentInfo;
	client: ClientInfo;
	data: TableDetails;
};

export type EditableDocument = Omit<FullDocument, "company">;

export type SaveDocumentInput = {
	id?: DocumentInfo["documentId"];
	document: DocumentInfo;
	cliente: ClientInfo["documentId"];
	items: ItemTable[];
};
