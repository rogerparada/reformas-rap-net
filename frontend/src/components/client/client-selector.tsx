"use client";
import { useAppStore } from "@/store/useAppStore";
import { ClienteResponse } from "@/types";
import NewClientModal from "../modal/new-client-modal";

type ClientSelectorProps = {
	options?: ClienteResponse[];
};

export default function ClientSelector({ options }: ClientSelectorProps) {
	const setClient = useAppStore((state) => state.setClient);
	const client = useAppStore((state) => state.client);
	const handleChangeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		const client = options?.find((c) => c.id === value);
		setClient(client ?? { name: "" });
	};

	if (!options) {
		return (
			<div className="form-control">
				<label htmlFor="cliente">Cliente:</label>
				<span>{client.name}</span>
			</div>
		);
	}

	return (
		<div className="form-control">
			<label htmlFor="cliente">Cliente:</label>
			<div className="gap-2">
				<select id="cliente" name="cliente" value={client?.id || ""} onChange={handleChangeSelection}>
					<option value="">Seleccione un cliente</option>
					{options &&
						options.map((option) => (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
						))}
				</select>
				<NewClientModal />
			</div>
		</div>
	);
}
