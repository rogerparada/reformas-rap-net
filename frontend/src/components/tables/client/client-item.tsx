"use client";
import { ClientResponse } from "@/types";
import Link from "next/link";

export default function ClientItem({ item }: { item: ClientResponse }) {
	const { name, email, phone, documentId: id, documentos } = item;
	return (
		<tr className="fila_cliente">
			<td>
				<div className="flex w-full">
					<Link className="link" href={`/gestion/clientes/${id}`}>
						<span className="icon-[topcoat--view]" />
					</Link>
					<span className="flex-1 pt-1">{name}</span>
				</div>
			</td>
			<td>{email}</td>
			<td>{phone}</td>
			<td>{documentos.length}</td>
		</tr>
	);
}
