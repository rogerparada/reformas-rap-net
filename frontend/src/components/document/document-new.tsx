import DocumentForm from "../forms/document-form";
import { api, auth } from "@/lib";

export default async function DocumentNew({ params }: { params: Promise<{ clear: boolean }> }) {
	const { clear } = await params;
	const token = await auth.isAuthenticated();
	const clients = await api.client.getClients(token ?? "");

	if (!clear) {
		return <DocumentForm clients={clients} />;
	}

	return <DocumentForm clear={clear} clients={clients} />;
}
