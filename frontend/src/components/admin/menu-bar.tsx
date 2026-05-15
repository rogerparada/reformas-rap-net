import Link from "next/link";
import { CompanyLogo } from "../svg/company-logo";

type Props = {};

export default function AdminMenuBar({}: Props) {
	const menu = [
		{
			title: "Inicio",
			icon: "icon-[carbon--dashboard]",
			url: "/admin",
		},
		{
			title: "Historial",
			icon: "icon-[streamline--interface-signal-square-heart-line-stats-beat-square-graph]",
			url: "/admin/history",
		},
	];

	return (
		<div className="flex min-h-screen w-64 flex-col bg-primary text-white">
			<div className="p-6">
				<CompanyLogo variant="white" />
			</div>
			{menu.map((item) => (
				<Link
					key={item.title}
					href={item.url}
					className="cursor-pointer border-y border-primary-light p-4 font-bold hover:bg-primary-dark flex items-center gap-4"
				>
					<span className={`${item.icon} text-xl`}></span>
					<span>{item.title}</span>
				</Link>
			))}
		</div>
	);
}
