"use client";
import { useAppStore } from "@/store/useAppStore";
import { formatCurrency } from "@/utils";

export default function DocumentResume() {
	const subtotal = useAppStore((state) => state.subtotal);
	const iva = useAppStore((state) => state.iva);
	const total = useAppStore((state) => state.total);
	return (
		<div className="card flex-1">
			<div className="title">Resumen del documento</div>
			<hr className="separator" />
			<div className="space-y-4 mt-5">
				<p className="infoLabel">
					<span>Subtotal:</span>
					<span>{formatCurrency(subtotal)}</span>
				</p>
				<p className="infoLabel">
					<span>IVA:</span>
					<span>{formatCurrency(iva)}</span>
				</p>
				<p className="infoLabel">
					<span>Total:</span>
					<span>{formatCurrency(total)}</span>
				</p>
			</div>
		</div>
	);
}
