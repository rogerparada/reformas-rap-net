"use client";

import { DocumentInfoResponse } from "@/types/description";
import { formatCurrency, toLocalDate } from "@/utils";
import Link from "next/link";

export default function DocumentItem({ item }: { item: DocumentInfoResponse }) {
	const { fecha, idDocumento: id, numeroDocumento: numero, iva, cliente, total } = item;

	return (
		<tr className="fila_cliente">
			<td>
				<div className="flex w-full items-center">
					<Link className="link" href={`/gestion/documentos/${id}`}>
						<span className="icon-[topcoat--view]" />
					</Link>
					<span className="flex-1">{numero}</span>
				</div>
			</td>
			<td>{toLocalDate(fecha)}</td>
			<td>{cliente}</td>
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
