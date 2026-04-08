import ViewClient from "@/components/client/view-client";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<ViewClient params={params} />
		</Suspense>
	);
}
