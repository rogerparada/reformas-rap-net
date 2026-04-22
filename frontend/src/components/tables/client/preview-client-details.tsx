import { ClienteResponse } from "@/types/description";

export default function PreviewClientDetails({ client }: { client: ClienteResponse }) {
	if (!client) return;
	const { name, phone, email, address, city, nif } = client;
	return (
		<div className="grid grid-cols-2 p-4 gap-2 mb-10">
			<span className="font-bold col-span-2">{name}</span>
			<span>
				<b>Email:</b> {email}
			</span>
			<span>
				<b>Teléfono:</b> {phone}
			</span>
			<span className="col-span-2">
				<b>Dirección:</b> {address} <b>{city}</b>
			</span>
			{nif && <span>NIF: {nif}</span>}
		</div>
	);
}
