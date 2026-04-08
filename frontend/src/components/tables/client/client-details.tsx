import Image from "next/image";
import { ClientInfo } from "@/types";

export default function ClientDetails({ client }: { client: ClientInfo }) {
	if (!client) return;
	const { name, phone, email, address, city, nif } = client;
	return (
		<div className="flex flex-row justify-between">
			<div className="pl-4 max-w-72">
				<p className="font-bold">{name}</p>
				<div className="relative flex gap-2 h-6">
					<Image src="/icons/phone.png" alt="teléfono" width={16} height={6} style={{ objectFit: "contain" }} /> {phone}
				</div>
				<div className="relative flex gap-2 h-6">
					<Image src="/icons/mail.png" alt="teléfono" width={16} height={6} style={{ objectFit: "contain" }} /> {email}
				</div>
				<div className="relative flex gap-2 h-6">
					<Image src="/icons/address.png" alt="teléfono" width={16} height={6} style={{ objectFit: "contain" }} /> {address}
				</div>
				<div className="ml-6">{city}</div>
				{nif && (
					<div className="relative flex gap-2 h-6">
						<Image src="/icons/id.png" alt="teléfono" width={16} height={6} style={{ objectFit: "contain" }} /> {nif}
					</div>
				)}
			</div>
		</div>
	);
}
