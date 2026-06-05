import DocumentForm from "../forms/document-form";
import { api, auth } from "@/lib";

export default async function DocumentNew({ params }: { params: Promise<{ clear: boolean }> }) {
	const { clear } = await params;
	const token = await auth.isAuthenticated();

	if (!token) return;
	const clients = await api.client.getClientsInfo(token);
	const nextNumber = await api.documents.getNextDocumentNumber(token, "Factura");

	if (!clear) {
		return <DocumentForm nextNumber={nextNumber} clients={clients} />;
	}

	return <DocumentForm clear={clear} nextNumber={nextNumber} clients={clients} />;
}
