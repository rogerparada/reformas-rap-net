import Navbar from "@/components/ui/navbar/navbar";
import React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar title="Gestión de facturación" />
			<div className="container mx-auto mt-16 p-2">{children}</div>
		</>
	);
}
