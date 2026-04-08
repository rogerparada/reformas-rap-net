import DocumentEdit from "@/components/forms/document-edit";
import { Suspense } from "react";

export default async function Page({ searchParams }: { searchParams: Promise<{ id: string }> }) {
	return (
		<div className="space-y-3">
			<Suspense>
				<DocumentEdit params={searchParams} />
			</Suspense>
		</div>
	);
}
