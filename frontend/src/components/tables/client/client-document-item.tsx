"use client";

import { DocumentInfoResponse } from "@/types";
import { formatCurrency, toLocalDate } from "@/shared/utils";
import Link from "next/link";

export default function ClientDocumentItem({ item }: { item: DocumentInfoResponse }) {
	const { tipoDocumento: tipo, fecha, idDocumento: id, numeroDocumento: numero, iva, total } = item;

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
			<td>{toLocalDate(fecha)}</td>
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
