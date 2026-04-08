"use client";

import { ClientDocument } from "@/types/description";
import { formatCurrency } from "@/utils";
import Link from "next/link";
import { useMemo } from "react";

export default function ClientDocumentItem({ item }: { item: ClientDocument }) {
	const { tipoDocumento: tipo, fecha, documentId: id, numeroDocumento: numero, items, iva } = item;
	const total = useMemo(() => items.reduce((acc, item) => (acc += item.total), 0), [items]);

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
			<td>{iva ? formatCurrency(total + total * 0.21) : formatCurrency(total)}</td>
		</tr>
	);
}
