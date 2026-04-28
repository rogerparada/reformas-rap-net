"use client";
import { ClienteResponse } from "@/types";
import Link from "next/link";

export default function ClientItem({ item }: { item: ClienteResponse }) {
	const { name, email, phone, id, documentos } = item;
	return (
		<tr className="fila_cliente colored_row">
			<td className="">
				<Link href={`/gestion/clientes/${id}`} className="hover:underline hover:text-primary">
					<span className="flex-1 pt-1">{name}</span>
				</Link>
			</td>
			<td>{email ?? ""}</td>
			<td>{phone ?? ""}</td>
			<td>{documentos ?? 0}</td>
		</tr>
	);
}
