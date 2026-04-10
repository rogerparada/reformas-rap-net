"use client";
import { useAppStore } from "@/store/useAppStore";
import { ClienteResponse, FullDocumentResponse } from "@/types";
import ActionButton from "../ui/button/action-button";
import DocumentNumberCreator from "../forms/document-number-creator";
import ClientSelector from "../client/client-selector";

type InfoDocumentoProps = {
	options?: ClienteResponse[];
};

export default function InfoDocumento({ options }: InfoDocumentoProps) {
	const documento = useAppStore((state) => state.document);
	const clear = useAppStore((state) => state.clearDocument);
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);

	const handleChangeDocumentAttribute = (key: keyof FullDocumentResponse, value: string | boolean) => {
		changeDocumentAttribute(key, value);
	};

	return (
		<div className="card">
			<div className="flex gap-2 justify-between">
				<h3 className="title">Información del documento</h3>
				<ActionButton icon="delete" color="red" action={clear} />
			</div>
			<hr className="separator" />
			<div className="space-y-4 mt-5">
				<ClientSelector options={options} />
				<div className="form-control">
					<label htmlFor="tipoDocumento"> Tipo: </label>
					<select id="tipoDocumento" value={documento.tipoDocumento} onChange={(e) => handleChangeDocumentAttribute("tipoDocumento", e.target.value)}>
						<option value="Factura">Factura</option>
						<option value="Presupuesto">Presupuesto</option>
					</select>
				</div>
				<div className="form-control">
					<label htmlFor="date">Fecha:</label>
					<input id="date" type="date" value={documento.fecha} onChange={(e) => handleChangeDocumentAttribute("fecha", e.target.value)} />
				</div>
				<DocumentNumberCreator />
				<div className="form-control">
					<label htmlFor="iva">IVA:</label>
					<input
						id="iva"
						type="checkbox"
						checked={documento?.iva ?? false}
						onChange={(e) => handleChangeDocumentAttribute("iva", e.target.checked)}
					/>
				</div>
			</div>
		</div>
	);
}
