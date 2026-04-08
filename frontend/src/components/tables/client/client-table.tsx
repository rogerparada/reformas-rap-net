import ClientItem from "./client-item";
import { ClientResponse } from "@/types";

export default function ClientTable({ data }: { data: ClientResponse[] }) {
	return (
		<>
			<div className="w-full">
				<table className="table_cliente">
					<thead className="table_header">
						<tr className="h-10">
							<th className="">Nombre</th>
							<th className="">Email</th>
							<th className="">Teléfono</th>
							<th className="">Documentos</th>
						</tr>
					</thead>
					<tbody className="">
						{data.map((item) => (
							<ClientItem key={item.id} item={item} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
