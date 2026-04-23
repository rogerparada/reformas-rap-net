import { api, auth } from "@/lib";
import { EditableDocument, TableDetails } from "@/types";
import { getItemsDetails } from "@/utils";
import DocumentForm from "./document-form";
import NoData from "../ui/no-data";
import DocumentEditOptions from "../document/document-edit-options";

export default async function DocumentEdit({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const token = await auth.isAuthenticated();

	if (!token) return;

	const data = await api.documents.getDocumentById(token, id);
	const clientes = await api.client.getClients(token);

	if (!data) return <NoData tipo={"documento"} url="/gestion/documentos" />;

	const { cliente: client, items, ...document } = data;

	const details: TableDetails = { ...getItemsDetails(items), items, showIva: document.tipoDocumento === "Factura" };

	const fullData: EditableDocument = { document, client, data: details };

	const url = `/gestion/documentos/${id}`;

	if (!clientes.isSuccess) {
		return;
	}

	return (
		<>
			<DocumentEditOptions link={url} />
			<DocumentForm doc={fullData} clients={clientes.getValue()} />
		</>
	);
}
