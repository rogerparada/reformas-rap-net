import { api, auth } from "@/lib";
import DocumentTable from "./document-table";
import AddData from "../ui/add-data";
import LinkButton from "../ui/button/link-button";

export default async function Documents() {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const facturas = await api.documents.getDocumentsInfoByType(jwt, "Factura");
	const presupuestos = await api.documents.getDocumentsInfoByType(jwt, "Presupuesto");
	if ((!facturas.isSuccess && !presupuestos.isSuccess) || (facturas.getValue().length === 0 && presupuestos.getValue().length === 0)) {
		return <AddData tipo="documentos" url="/gestion/documentos/new?clear=true" />;
	}

	return (
		<div className="mt-5">
			<div className="w-full flex justify-end">
				<LinkButton icon="doc_add" link="/gestion/documentos/new?clear=true" text="Nuevo documento" />
			</div>
			<div className="space-y-10">
				{facturas.isSuccess && <DocumentTable data={facturas.getValue()} title="Facturas" />}
				{presupuestos.isSuccess && <DocumentTable data={presupuestos.getValue()} title="Presupuestos" />}
			</div>
		</div>
	);
}
