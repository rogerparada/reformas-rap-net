import DocumentView from "@/components/document/document-view";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<DocumentView params={params} />
		</Suspense>
	);
}
