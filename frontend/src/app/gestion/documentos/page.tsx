import Documents from "@/components/document/documents";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { DocumentFilters } from "@/types/filters";
import { Suspense } from "react";

export default function DocumentsPage({ searchParams }: { searchParams: Promise<DocumentFilters> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<Documents params={searchParams} />
		</Suspense>
	);
}
