import { api, auth } from "@/lib";

export default async function BentoItem() {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const response = await api.documents.getDocuments(jwt);
	if (!response) return;

	const data = { Factura: 0, Presupuesto: 0, CuentaCobro: 0 };
	response.forEach(({ tipoDocumento }) => {
		data[tipoDocumento]++;
	});

	return (
		<div className="bento_2">
			<div className="wide_text_bold">
				<span>Facturas: </span>
				<span>{data.Factura}</span>
			</div>
			<div className="wide_text_bold">
				<span>Presupuestos:</span>
				<span>{data.Presupuesto}</span>
			</div>
		</div>
	);
}
