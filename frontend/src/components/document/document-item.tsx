"use client";

import { DocumentInfoResponse } from "@/types/description";
import { formatCurrency, toLocalDate } from "@/shared/utils";
import Link from "next/link";

export default function DocumentItem({ item }: { item: DocumentInfoResponse }) {
	const { fecha, idDocumento: id, numeroDocumento: numero, iva, cliente, total } = item;

	return (
		<tr className="fila_cliente colored_row">
			<td className="">
				<Link href={`/gestion/documentos/${id}`} className="hover:underline">
					{numero}
				</Link>
			</td>
			<td>{toLocalDate(fecha)}</td>
			<td>{cliente}</td>
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
