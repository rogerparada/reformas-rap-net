"use client";
import { ClienteResponse } from "@/types";
import Link from "next/link";

export default function ClientItem({ item }: { item: ClienteResponse }) {
	const { name, email, phone, id, documentos } = item;
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
			<td>{email ?? ""}</td>
			<td>{phone ?? ""}</td>
			<td>{documentos ?? 0}</td>
		</tr>
	);
}
