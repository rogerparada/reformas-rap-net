"use client";

import { DocumentInfoResponse } from "@/types/description";
import { formatCurrency, toLocalDate } from "@/shared/utils";
import Link from "next/link";

export default function DocumentItem({ item }: { item: DocumentInfoResponse }) {
	const { fecha, idDocumento: id, numeroDocumento: numero, iva, cliente, total } = item;

	return (
		<tr className="fila_cliente">
			<td>
				<div className="flex w-full items-center">
					<Link
						href={`/gestion/documentos/edit?id=${id}`}
						className="flex-1 hover:text-primary hover:underline transition-colors duration-300 ease-in-out"
					>
						{numero}
					</Link>
				</div>
			</td>
			<td>{toLocalDate(fecha)}</td>
			<td>{cliente}</td>
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
