import { api, auth } from "@/lib";
import { EditableDocument, TableDetails } from "@/types";
import { getItemsDetails } from "@/shared/utils";
import DocumentForm from "./document-form";
import NoData from "../ui/no-data";
import DocumentEditOptions from "../document/document-edit-options";

export default async function DocumentEdit({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const token = await auth.isAuthenticated();

	if (!token) return;

	const data = await api.documents.getDocumentById(token, id);
	const clientes = await api.client.getClientsInfo(token);

	if (!data) return <NoData tipo={"documento"} url="/gestion/documentos" />;

	const { cliente: client, items, ...document } = data;
	const taxes = document.iva;

	const details: TableDetails = { ...getItemsDetails(items, taxes / 100), items, showIva: document.tipoDocumento === "Factura", taxes };

	const fullData: EditableDocument = { document, client, data: details };

	const url = `/gestion/documentos/${id}`;

	return (
		<>
			<DocumentEditOptions link={url} />
			<DocumentForm doc={fullData} clients={clientes} />
		</>
	);
}
