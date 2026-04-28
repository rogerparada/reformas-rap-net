import DocumentEdit from "@/components/forms/document-edit";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
	return (
		<div className="space-y-3">
			<Suspense fallback={<SkeletonLoading />}>
				<DocumentEdit params={searchParams} />
			</Suspense>
		</div>
	);
}
