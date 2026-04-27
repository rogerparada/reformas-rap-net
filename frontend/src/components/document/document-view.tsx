import { api, auth } from "@/lib";
import PdfTemplate from "../pdf/pdf-template";
import { FullDocument, TableDetails } from "@/types";
import { getItemsDetails } from "../../utils/items";

export default async function DocumentView({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const token = await auth.isAuthenticated();

	if (!token) return;

	const data = await api.documents.getDocumentById(token, id);
	const company = await api.company.getCompanyInfo(token);

	console.log({ data, company });

	if (!company || !data) return;

	const { cliente: client, items, ...document } = data;

	const details: TableDetails = { ...getItemsDetails(items), items, showIva: document.iva };

	const fullData: FullDocument = { company, document, client, data: details };

	return <PdfTemplate doc={fullData} />;
}
