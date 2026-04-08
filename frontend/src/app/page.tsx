import { CompanyLogo } from "@/components/svg/company-logo";

export default async function Home() {
	// const { data } = await api.company.getHomePage();
	// const { description, subtitle, phone } = data;
	const subtitle = "Empresa de reformas integrales de Majadahonda";
	const description = "Especialistas en pintura, carpintería, electricidad, fontanería y todo tipo de reformas.";
	const phone = "627798621";

	return (
		<div className="container mx-auto flex flex-col gap-2 min-h-screen text-black dark:text-white  mt-10 justify-center items-center p-3">
			<div className="w-full md:w-3xl">
				<CompanyLogo />
				<h2 className="text-lg lg:text-2xl md:text-xl md:-mt-16 md:ml-10">{subtitle}</h2>
			</div>

			{description && <p className="mt-5 md:mt-20 text-center">{description}</p>}

			<div className="icons flex gap-3 text-5xl lg:text-8xl md:text-6xl mt-10 justify-center">
				<span className="icon-[vaadin--tools]" />
				<span className="icon-[material-symbols--tools-ladder]" />
				<span className="icon-[whh--tools]" />
				<span className="icon-[raphael--hammerandscrewdriver]" />
				<span className="icon-[material-symbols--tools-power-drill-sharp]" />
				<span className="icon-[mdi--hand-saw]" />
			</div>
			{phone && (
				<div className="mt-10">
					<p>Contacto: {phone}</p>
				</div>
			)}
		</div>
	);
}
