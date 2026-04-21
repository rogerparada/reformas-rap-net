import EmailView from "@/components/email/email-view";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default async function EmailByIdPage({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<EmailView params={params} />
		</Suspense>
	);
}
