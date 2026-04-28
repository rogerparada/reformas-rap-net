import { Suspense } from "react";
import Clients from "@/components/client/clients";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { ClientFilters } from "@/types";

export default function ClientsPage({ searchParams }: { searchParams: Promise<{ add: boolean } & ClientFilters> }) {
	return (
		<div className="mt-5">
			<Suspense fallback={<SkeletonLoading />}>
				<Clients params={searchParams} />
			</Suspense>
		</div>
	);
}
