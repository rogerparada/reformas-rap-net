import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Reformas RAP | Reformas integrales en Majadahonda",
	description:
		"Reformas RAP es una empresa de reformas integrales en Majadahonda. Especialistas en pintura, carpintería, electricidad, fontanería y todo tipo de reformas para viviendas y locales.",
	keywords: [
		"reformas Majadahonda",
		"reformas integrales",
		"pintura",
		"carpintería",
		"electricidad",
		"fontanería",
		"reformas de viviendas",
		"reformas de locales",
		"empresa de reformas",
		"Reformas RAP",
	],
	authors: [{ name: "Reformas RAP" }],
	creator: "Reformas RAP",
	publisher: "Reformas RAP",
	metadataBase: new URL("https://reformasrap.com"),
	alternates: {
		canonical: "/",
	},

	openGraph: {
		title: "Reformas RAP | Empresa de reformas integrales en Majadahonda",
		description:
			"Profesionales en pintura, carpintería, electricidad y fontanería. Reformas RAP ofrece soluciones completas para tu hogar o negocio en Majadahonda y alrededores.",
		url: "https://reformasrap.com",
		siteName: "Reformas RAP",
		locale: "es_ES",
		type: "website",
		images: [
			{
				url: "/images/og-reformasrap.png",
				width: 1200,
				height: 630,
				alt: "Reformas RAP - Empresa de reformas integrales en Majadahonda",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "Reformas RAP | Reformas integrales en Majadahonda",
		description:
			"Empresa especializada en reformas integrales de viviendas y locales en Majadahonda. Pintura, carpintería, electricidad y fontanería.",
		images: ["/images/og-reformasrap.png"],
	},

	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
