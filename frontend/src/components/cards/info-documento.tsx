"use client";
import { useAppStore } from "@/store/useAppStore";
import { ClienteResponse, DocumentInfo } from "@/types";
import ActionButton from "../ui/button/action-button";
import DocumentNumberCreator from "../forms/document-number-creator";
import ClientSelector from "../client/client-selector";
import ClientSelectorModal from "../client/clent-selector-modal";

type InfoDocumentoProps = {
	options?: ClienteResponse[];
};

export default function InfoDocumento({ options }: InfoDocumentoProps) {
	const documento = useAppStore((state) => state.document);
	const clear = useAppStore((state) => state.clearDocument);
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);
	const setTaxes = useAppStore((state) => state.setTaxes);

	const handleChangeDocumentAttribute = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
		const { id: key, value } = e.target;
		changeDocumentAttribute(key as keyof DocumentInfo, value);
	};

	const handleChangeIva = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const taxes = Number(e.target.value);
		changeDocumentAttribute("iva", taxes);
		setTaxes(taxes);
	};

	return (
		<div className="card">
			<div className="flex gap-2 justify-between">
				<h3 className="title">Información del documento</h3>
				<ActionButton icon="delete" color="red" action={clear} />
			</div>
			<hr className="separator" />
			<div className="space-y-4 mt-5">
				{options && <ClientSelectorModal clients={options} />}
				<div className="form-control">
					<label htmlFor="tipoDocumento"> Tipo: </label>
					<select id="tipoDocumento" value={documento.tipoDocumento} onChange={handleChangeDocumentAttribute}>
						<option value="Factura">Factura</option>
						<option value="Presupuesto">Presupuesto</option>
					</select>
				</div>
				<div className="form-control">
					<label htmlFor="fecha">Fecha:</label>
					<input id="fecha" type="date" value={documento.fecha} onChange={handleChangeDocumentAttribute} />
				</div>
				<DocumentNumberCreator />
				<div className="form-control">
					<label htmlFor="iva">IVA:</label>
					<select name="iva" id="iva" value={documento.iva} onChange={handleChangeIva}>
						<option value={0}>Sin Iva</option>
						<option value={10}>Reducido 10%</option>
						<option value={21}>Iva 21%</option>
					</select>
				</div>
			</div>
		</div>
	);
}
