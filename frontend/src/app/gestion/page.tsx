import { Metadata } from "next";
import ItemData from "@/components/ui/item-data";
import BentoItem from "@/components/items/bento-item";
import { Suspense } from "react";
import SkeletonLoading from "@/components/ui/skeleton-loading";

export const metadata: Metadata = {
	title: "Reformas RAP | Gestión de facturación",
	description: "Gestor de facturas y presupuestos",
};

export default function page() {
	return (
		<>
			<div className="bento">
				<div className="bento_1">
					<ItemData icon="icon-[hugeicons--file-add]" url="/gestion/documentos/new?clear=true" text="Nuevo documento" />
					<ItemData icon="icon-[wpf--add-user]" url="/gestion/clientes?add=true" text="Nuevo Cliente" />
					<ItemData icon="icon-[mdi--file-eye-outline]" url="/gestion/documentos" text="Ver documentos" />
					<ItemData icon="icon-[mdi--account-eye]" url="/gestion/clientes" text="Ver clientes" />
				</div>
				<Suspense fallback={<SkeletonLoading />}>
					<BentoItem />
				</Suspense>
			</div>
		</>
	);
}
