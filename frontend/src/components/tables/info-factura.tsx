"use client";
import { DocumentInfo } from "@/types";

type InfoFacturaProps = {
	nif?: string;
	data?: DocumentInfo;
};

export default function InfoFactura({ nif, data }: InfoFacturaProps) {
	if (!data) return;
	const { numeroDocumento, fecha, iva, tipoDocumento } = data;

	return (
		<div className="md:px-10 mb-10">
			<table className="table">
				<thead className="table_header">
					<tr>
						<th>N° {tipoDocumento}</th>
						<th>Fecha</th>
						{iva && <th>DNI</th>}
					</tr>
				</thead>
				<tbody>
					<tr className="fila">
						<td>
							<span className="w-full text-center">{numeroDocumento}</span>
						</td>
						<td>{fecha}</td>
						{iva && <td>{nif}</td>}
					</tr>
				</tbody>
			</table>
		</div>
	);
}
