import DocumentNew from "@/components/document/document-new";
import NewDocumentOptions from "@/components/pdf/new-document-options";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default function DocumentPage({ searchParams }: { searchParams: Promise<{ clear: boolean }> }) {
	return (
		<div className="space-y-3">
			<NewDocumentOptions />
			<Suspense fallback={<SkeletonLoading />}>
				<DocumentNew params={searchParams} />
			</Suspense>
		</div>
	);
}
