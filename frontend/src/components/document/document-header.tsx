import { ClientInfo, CompanyInfo, DocumentInfo } from "@/types";
import DocumentCompanyInfo from "./document-company-info";
import ClientDetails from "../tables/client/client-details";
import InfoFactura from "../tables/info-factura";
import Image from "next/image";

type DocumentHeaderProps = {
	client: ClientInfo;
	company: CompanyInfo;
	document: DocumentInfo;
};

export default function DocumentHeader({ client, company, document }: DocumentHeaderProps) {
	return (
		<>
			<div className="">
				<div className="w-full h-14 bg-primary mb-5 flex items-baseline pl-4 p-2">
					<Image src="/images/LogoB.png" alt="logo" width={40} height={40} style={{ objectFit: "contain" }} />
					<span className="text-white font-bold">{`eformas RAP | ${document.tipoDocumento}`}</span>
				</div>
				<div className="flex flex-col md:flex-row w-full justify-around px-4">
					<DocumentCompanyInfo company={company} />
					<ClientDetails client={client} />
				</div>
			</div>
			<div>
				<div className="mt-10">
					<InfoFactura nif={company.nif} data={document} />
				</div>
			</div>
		</>
	);
}
