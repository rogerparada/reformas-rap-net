import EmailEdit from "@/components/email/email-edit";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

export default function EditEmailPage({ params }: { params: Promise<{ id: string }> }) {
	return (
		<Suspense fallback={<SkeletonLoading />}>
			<EmailEdit params={params} />
		</Suspense>
	);
}
