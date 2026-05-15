import Dashboard from "@/components/admin/dashboard";
import SkeletonLoading from "@/components/ui/skeleton-loading";
import { Suspense } from "react";

type Props = {};

export default function AdminDashboardPage({}: Props) {
	return (
		<div className="w-full h-screen">
			<h1 className="title">Administración</h1>
			<hr className="separator mb-5" />
			<Suspense fallback={<SkeletonLoading />}>
				<Dashboard />
			</Suspense>
		</div>
	);
}
