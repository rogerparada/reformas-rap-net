import AdminMenuBar from "@/components/admin/menu-bar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex">
			<AdminMenuBar />
			<div className="flex-1 p-4">{children}</div>
		</div>
	);
}
