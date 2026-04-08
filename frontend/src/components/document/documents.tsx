import { api, auth } from "@/lib";
import DocumentTable from "./document-table";
import AddData from "../ui/add-data";
import LinkButton from "../ui/button/link-button";

export default async function Documents() {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	// const { data } = await api.documents.getFullDocuments(jwt);
	const facturas = await api.documents.getFullDocumentsByType(jwt, "Factura");
	const presupuestos = await api.documents.getFullDocumentsByType(jwt, "Presupuesto");

	if ((!facturas.data && !presupuestos.data) || (facturas.data?.length === 0 && presupuestos.data?.length === 0)) {
		return <AddData tipo="documentos" url="/gestion/documentos/new?clear=true" />;
	}

	return (
		<div className="mt-5">
			<div className="w-full flex justify-end">
				<LinkButton icon="doc_add" link="/gestion/documentos/new?clear=true" text="Nuevo documento" />
			</div>
			<div className="space-y-10">
				{facturas.data && <DocumentTable data={facturas.data} title="Facturas" />}
				{presupuestos.data && <DocumentTable data={presupuestos.data} title="Presupuestos" />}
			</div>
		</div>
	);
}
