import { DocumentResponse } from "@/types";
import DocumentItem from "./document-item";

type Props = {
	data: DocumentResponse[];
	title: string;
};

export default function DocumentTable({ data, title }: Props) {
	if (data.length > 0) {
		return (
			<div>
				<h1 className="title">{title}</h1>
				<hr className="separator" />
				<div className="w-full mt-5">
					<table className="table_cliente">
						<thead className="table_header">
							<tr className="h-10">
								<th className="">Numero</th>
								<th className="">Fecha</th>
								<th className="">Cliente</th>
								<th className="">Valor</th>
							</tr>
						</thead>
						<tbody className="">
							{data.map((item) => (
								<DocumentItem key={item.id} item={item} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
