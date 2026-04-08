"use client";

import { DocumentResponse } from "@/types/description";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import { useMemo } from "react";

export default function DocumentItem({ item }: { item: DocumentResponse }) {
	const { fecha, documentId: id, numeroDocumento: numero, cliente, items, iva } = item;
	const total = useMemo(() => items.reduce((acc, item) => (acc += item.total), 0), [items]);

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
			<td>{fecha}</td>
			<td>{cliente?.name}</td>
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
