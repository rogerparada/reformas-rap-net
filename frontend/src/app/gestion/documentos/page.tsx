import Documents from "@/components/document/documents";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default function DocumentsPage() {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<Documents />
		</Suspense>
	);
}
