import { api, auth } from "@/lib";
import DocumentTable from "./document-table";
import AddData from "../ui/add-data";
import DocumentSelector from "./document-selector";
import { DocumentSortBy, TipoDocumento } from "@/types";

type Props = {
	params: Promise<{
		tipo: TipoDocumento;
		sortBy: DocumentSortBy;
		desc: boolean;
	}>;
};

export default async function Documents({ params }: Props) {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;
	const { tipo, sortBy, desc } = await params;

	const documentos = await api.documents.getDocumentsInfo(jwt, tipo, sortBy, desc);
	const title = tipo === "Factura" ? "Facturas" : tipo === "Presupuesto" ? "Presupuestos" : "Documentos";

	if (!documentos.isSuccess) {
		return <AddData tipo="documentos" url="/gestion/documentos/new?clear=true" />;
	}

	return (
		<div className="mt-5">
			<DocumentSelector />
			<div className="space-y-10 mt-5">
				<DocumentTable data={documentos.getValue()} title={title} />
			</div>
		</div>
	);
}
