import { api, auth } from "@/lib";
import DocumentTable from "./document-table";
import AddData from "../ui/add-data";
import DocumentSelector from "./document-selector";
import { DocumentFilters } from "@/types/filters";

type Props = {
	params: Promise<DocumentFilters>;
};

export default async function Documents({ params }: Props) {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;
	const filters = await params;

	const response = await api.documents.getDocumentsInfo(jwt, filters);
	const { data: documentos, count } = response;

	const title = filters.tipo === "Factura" ? "Facturas" : filters.tipo === "Presupuesto" ? "Presupuestos" : "Documentos";

	if (documentos.length === 0) {
		return <AddData tipo="documentos" url="/gestion/documentos/new?clear=true" />;
	}

	return (
		<div className="mt-5">
			<DocumentSelector />
			<div className="space-y-10 mt-5">
				<DocumentTable data={documentos} title={title} maxItems={count} />
			</div>
		</div>
	);
}
