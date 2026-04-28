import Documents from "@/components/document/documents";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { DocumentSortBy, TipoDocumento } from "@/types";
import { Suspense } from "react";

export default function DocumentsPage({ searchParams }: { searchParams: Promise<{ tipo: TipoDocumento; sortBy: DocumentSortBy; desc: boolean }> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<Documents params={searchParams} />
		</Suspense>
	);
}
