"use client";

import { formatCurrency } from "@/shared/utils";

type TablaTotalesProps = {
	subtotal: number;
	iva: number;
	total: number;
	showIva?: boolean;
};

export default function TablaTotales({ showIva, subtotal, total, iva }: TablaTotalesProps) {
	return (
		<>
			{showIva && (
				<>
					<div className="fila_totales">
						<div>BASE IMPONIBLE</div>
						<div>{formatCurrency(subtotal)}</div>
					</div>

					<div className="fila_totales">
						<div>21% IVA</div>
						<div>{formatCurrency(iva)}</div>
					</div>
				</>
			)}
			<div className="fila_totales">
				<div>TOTAL</div>
				<div>{showIva ? formatCurrency(total) : formatCurrency(subtotal)}</div>
			</div>
			<div className="p-2">
				<b>Condiciones de pago:</b> <span className="font-light">Se abonara el 40% al inicio de la obra y el resto al final de la misma.</span>
			</div>
		</>
	);
}
