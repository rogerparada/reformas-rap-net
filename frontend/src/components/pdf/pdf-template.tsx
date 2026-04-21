"use client";
import TablaDescripcion from "../tables/tabla-descripcion";
import { useEffect } from "react";
import DocumentOptions from "./document-options";
import { FullDocument } from "@/types/document";
import DocumentHeader from "../document/document-header";
import { setDocumentState } from "@/utils/editDocument";

export default function PdfTemplate({ doc }: { doc: FullDocument }) {
	const { client, company, data, document } = doc;

	useEffect(() => {
		setDocumentState(doc);
	}, [doc]);
	return (
		<>
			<DocumentOptions edit link={`/gestion/documentos/edit?id=${document.idDocumento}`} id={document.idDocumento} name={document.numeroDocumento} />
			<div className="preview_document">
				<div className="container mx-auto md:p-10">
					<DocumentHeader client={client} company={company} document={document} />
					<TablaDescripcion data={data} />
				</div>
			</div>
		</>
	);
}
