import { auth, api } from "@/lib";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function Dashboard({}: Props) {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const response = await api.history.getDashboardInfo(jwt);
	const { documentos, clientes, emails, historial } = response;

	const items = [
		{
			title: "Documentos",
			url: "/gestion/documentos",
			icon: "icon-[simple-line-icons--docs]",
			value: documentos,
		},
		{
			title: "Clientes",
			url: "/gestion/clientes",
			icon: "icon-[akar-icons--people-group]",
			value: clientes,
		},
		{
			title: "Emails",
			url: "/gestion/emails",
			icon: "icon-[lucide--mails]",
			value: emails,
		},
		{
			title: "Historial",
			url: "/admin/history",
			icon: "icon-[material-symbols--history-edu-outline]",
			value: historial,
		},
	];

	return (
		<div className="dashboard-items">
			{items.map((item) => (
				<Link key={item.title} href={item.url}>
					<span className={`icon ${item.icon}`}></span>
					<span className="label">{item.title}</span>
					<span className="value">{item.value}</span>
				</Link>
			))}
			{/* <Link href="/gestion/clientes">
				<span className="icon icon-[akar-icons--people-group]"></span>
				<span className="label">Clientes</span>
				<span className="value">{clientes}</span>
			</Link>
			<Link href="/gestion/emails">
				<span className="icon icon-[lucide--mails]"></span>
				<span className="label">Emails</span>
				<span className="value">{emails}</span>
			</Link>
			<Link href="/admin/history">
				<span className="icon icon-[material-symbols--history-edu-outline]"></span>
				<span className="label">Historial</span>
				<span className="value">{historial}</span>
			</Link> */}
		</div>
	);
}
