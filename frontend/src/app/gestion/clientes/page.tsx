import { Suspense } from "react";
import Clients from "@/components/client/clients";
import SkeletonLoading from "@/components/ui/skeleton-loading";

export default function ClientsPage({ searchParams }: { searchParams: Promise<{ add: boolean }> }) {
	return (
		<div className="mt-5">
			<Suspense fallback={<SkeletonLoading />}>
				<Clients params={searchParams} />
			</Suspense>
		</div>
	);
}
