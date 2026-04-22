"use client";

import { MenuItem } from "@/types";
import { CompanyIcon } from "@/components/svg/company-icon";
import NavbarItem from "./navbar-item";
import Link from "next/link";
import { useState } from "react";

export default function Navbar({ title }: { title?: string }) {
	const [openMenu, setOpenMenu] = useState(false);
	const menuItems: MenuItem[] = [
		{ icon: "icon-[mdi--home]", text: "Inicio", link: "/gestion" },
		{ icon: "icon-[ion--document]", text: "Documentos", link: "/gestion/documentos" },
		{ icon: "icon-[solar--users-group-rounded-bold]", text: "Clientes", link: "/gestion/clientes" },
	];

	return (
		<nav className="navbar">
			<div className="nav_container">
				<button
					aria-expanded={openMenu}
					aria-controls="mobile-menu"
					className="text-4xl flex items-center h-full px-2 bg-primary-dark md:hidden text-white"
					onClick={() => {
						setOpenMenu((prev) => !prev);
					}}
				>
					<span className="icon-[quill--hamburger-sidebar]" />
				</button>
				<div className="logo ml-4">
					<Link href={"/gestion"}>
						<CompanyIcon className="w-10" />
					</Link>
					<span className="hidden md:block">{`eformas RAP | ${title || ""}`}</span>
				</div>

				<div id="menu" className="hidden md:flex h-full">
					{menuItems.map((item) => (
						<div key={item.link} className="h-full hover:bg-primary-light flex items-center px-4 transition-colors duration-500">
							<NavbarItem item={item} />
						</div>
					))}
				</div>
			</div>

			<div className={`navbar_dropdown ${openMenu ? "max-h-screen" : "max-h-0 h-0"}`}>
				{menuItems.map((item) => (
					<div key={item.link} className={`${openMenu ? "h-30" : "h-0 "}`}>
						<NavbarItem item={item} click={() => setOpenMenu(false)} />
					</div>
				))}
			</div>
		</nav>
	);
}
