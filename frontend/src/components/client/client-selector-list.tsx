"use client";

import { useAppStore } from "@/store/useAppStore";
import { ClienteResponse } from "@/types";
import { useState } from "react";

type Props = {
	clients: ClienteResponse[];
	close: () => void;
};

export default function ClientSelectorList({ clients, close }: Props) {
	const [selectedClient, setSelectedClient] = useState<ClienteResponse | null>(null);
	const [search, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const setClient = useAppStore((state) => state.setClient);

	const filteredClients = search.length > 0 ? clients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())) : clients;
	const total = filteredClients.length;
	const effectivePage = total < 10 ? 1 : page;
	const list = filteredClients.slice((effectivePage - 1) * 10, effectivePage * 10);

	const handleSelectClient = () => {
		if (!selectedClient) return;
		setClient(selectedClient);
		close();
	};

	return (
		<div className="h-[500px]">
			<div className="flex justify-between">
				<h2 className="text-lg font-bold text-primary">Clientes</h2>
				<div className="flex items-center gap-2">
					<input
						type="text"
						className="border border-primary rounded-lg p-2 h-10"
						placeholder="Buscar cliente"
						onChange={(e) => {
							setSearch(e.target.value);
							setPage(1);
						}}
					/>
					{selectedClient && (
						<button onClick={handleSelectClient} className="bg-primary text-white py-2 px-4 rounded-lg">
							Confirmar
						</button>
					)}
				</div>
			</div>

			{list.length > 0 ? (
				<>
					{total > 10 && (
						<div className="flex justify-end items-center mt-5 text-primary text-sm gap-3">
							{effectivePage > 1 && <span onClick={() => setPage(effectivePage - 1)} className="icon-[topcoat--back-light]"></span>}
							<span className="">
								Mostrando {(effectivePage - 1) * 10 + 1} - {(effectivePage - 1) * 10 + list.length}
							</span>
							{effectivePage * 10 < total && <span onClick={() => setPage(effectivePage + 1)} className="icon-[topcoat--next-light]"></span>}
						</div>
					)}
					<div className="border border-primary rounded-lg mt-2">
						{list.map((client) => (
							<div key={client.id} className="border-b border-primary-light last-of-type:border-0 p-2">
								<div className="flex justify-between items-center">
									<span>{client.name}</span>
									<button onClick={() => setSelectedClient(client)} className="text-primary flex items-center">
										<span className={`${client.id === selectedClient?.id ? "icon-[si--check-circle-fill]" : "icon-[si--check-circle-line]"}`}></span>
									</button>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<div className="border border-primary rounded-lg mt-5 p-5 text-center text-primary">No se encontraron clientes</div>
			)}
		</div>
	);
}
