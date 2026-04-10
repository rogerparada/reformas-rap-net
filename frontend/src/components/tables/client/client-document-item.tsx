"use client";

import { DocumentInfoResponse } from "@/types";
import { formatCurrency } from "@/utils";
import Link from "next/link";

export default function ClientDocumentItem({ item }: { item: DocumentInfoResponse }) {
	const { tipoDocumento: tipo, fecha, idDocumento: id, numeroDocumento: numero, iva, valor } = item;

	return (
		<tr className="fila_cliente">
			<td>
				<div className="flex w-full">
					<Link className="link" href={`/gestion/documentos/${id}`}>
						<span className="icon-[topcoat--view]" />
					</Link>
					<span className="flex-1 pt-1">{tipo}</span>
				</div>
			</td>
			<td>{numero}</td>
			<td>{fecha}</td>
			<td>{iva ? formatCurrency(valor + valor * 0.21) : formatCurrency(valor)}</td>
		</tr>
	);
}
