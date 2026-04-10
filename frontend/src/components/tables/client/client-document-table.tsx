import { DocumentInfoResponse } from "@/types";
import ClientDocumentItem from "./client-document-item";

type Props = {
	data: DocumentInfoResponse[];
	title: string;
};

export default function ClientDocumentTable({ data, title }: Props) {
	if (data.length > 0) {
		return (
			<div>
				<h1 className="title">{title}</h1>
				<hr className="separator" />
				<div className="w-full mt-5">
					<table className="table_cliente">
						<thead className="table_header">
							<tr className="h-10">
								<th className="">Tipo</th>
								<th className="">Numero</th>
								<th className="">Fecha</th>
								<th className="">Valor</th>
							</tr>
						</thead>
						<tbody className="">
							{data.map((item) => (
								<ClientDocumentItem key={item.idDocumento} item={item} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
