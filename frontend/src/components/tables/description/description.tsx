"use client";
import { ClienteResponse, CompanyInfo } from "@/types/description";
import InfoFactura from "../info-factura";
import ClientDetails from "../client/client-details";

type DescriptionProps = {
	data: CompanyInfo;
	client?: ClienteResponse;
};

export default function Description({ data, client }: DescriptionProps) {
	const { name, phone, email, address, city, web, nif } = data;

	return (
		<>
			<div className="w-full mb-10">
				<div className="w-full h-10 bg-primary mb-5 flex items-center pl-4 pb-2">
					<span className="text-white font-bold">{""}</span>
				</div>
				<div className="flex flex-row justify-between px-14">
					<div className="pl-4 max-w-72">
						<div className="italic">
							<p className="font-bold">{name}</p>
							<p>
								<b>Teléfono:</b> {phone}
							</p>
							<p>
								<b>Email:</b> {email}
							</p>
							<p>
								<b>Dirección:</b> {address} <b>{city}</b>
							</p>
							<p>
								<b>Web:</b> {web}
							</p>
						</div>
					</div>
					{client && <ClientDetails client={client} />}
				</div>
			</div>
			<div>
				<div className="mt-10">
					<InfoFactura nif={nif} />
				</div>
			</div>
		</>
	);
}
