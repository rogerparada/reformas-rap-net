import { CompanyInfo } from "@/types/description";
import Image from "next/image";

export default function DocumentCompanyInfo({ company }: { company: CompanyInfo }) {
	const { name, phone, email, address, city, web } = company;
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
				<div className="relative flex gap-2 h-6">
					<Image src="/icons/web.png" alt="teléfono" width={16} height={6} style={{ objectFit: "contain" }} /> {web}
				</div>
			</div>
		</div>
	);
}
