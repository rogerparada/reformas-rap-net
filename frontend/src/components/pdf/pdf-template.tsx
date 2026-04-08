"use client";
import TablaDescripcion from "../tables/tabla-descripcion";
import { useEffect } from "react";
import DocumentOptions from "./document-options";
import { FullDocument } from "@/types/document";
import DocumentHeader from "../document/document-header";
import { setDocumentState } from "@/utils/editDocument";
import { generarPDF } from "@/lib/pdf";

export default function PdfTemplate({ doc }: { doc: FullDocument }) {
	const { client, company, data, document } = doc;
	const pdf = generarPDF({ document, company, client, items: data.items });

	useEffect(() => {
		setDocumentState(doc);
	}, [doc]);

	return (
		<>
			<DocumentOptions edit pdf={pdf} link={`/gestion/documentos/edit?id=${document.documentId}`} id={document.documentId} />
			<div className="preview_document">
				<div className="container mx-auto md:p-10">
					<DocumentHeader client={client} company={company} document={document} />
					<TablaDescripcion data={data} />
				</div>
			</div>
		</>
	);
}
