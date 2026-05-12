"use client";

import { useAppStore } from "@/store/useAppStore";
import { ClienteResponse } from "@/types";
import { useEffect, useState } from "react";

type Props = {
	clients: ClienteResponse[];
	close: () => void;
};

export default function ClientSelectorList({ clients, close }: Props) {
	const [data, setData] = useState({
		client: null as ClienteResponse | null,
		list: clients.slice(0, 10),
		total: clients.length,
		search: "",
		page: 1,
	});
	const setClient = useAppStore((state) => state.setClient);

	useEffect(() => {
		let filteredClients: ClienteResponse[] = [];
		let total = 0;
		let page = data.page;

		if (data.search.length > 0) {
			filteredClients = clients.filter((client) => client.name.toLowerCase().includes(data.search.toLowerCase()));
			total = filteredClients.length;
			page = filteredClients.length < 10 ? 1 : page;
		} else {
			filteredClients = clients;
			total = clients.length;
		}
		const list = filteredClients.slice((page - 1) * 10, page * 10);
		setData({ ...data, list, total, page });
	}, [data.search, data.page]);

	const handleSelectClient = () => {
		setClient(data.client!);
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
						onChange={(e) => setData({ ...data, search: e.target.value })}
					/>
					{data.client && (
						<button onClick={handleSelectClient} className="bg-primary text-white py-2 px-4 rounded-lg">
							Confirmar
						</button>
					)}
				</div>
			</div>

			{data.list.length > 0 ? (
				<>
					{data.total > 10 && (
						<div className="flex justify-end items-center mt-5 text-primary text-sm gap-3">
							{data.page > 1 && <span onClick={() => setData({ ...data, page: data.page - 1 })} className="icon-[topcoat--back-light]"></span>}
							<span className="">
								Mostrando {(data.page - 1) * 10 + 1} - {(data.page - 1) * 10 + data.list.length}
							</span>
							{data.page * 10 < data.total && (
								<span onClick={() => setData({ ...data, page: data.page + 1 })} className="icon-[topcoat--next-light]"></span>
							)}
						</div>
					)}
					<div className="border border-primary rounded-lg mt-2">
						{data.list.map((client) => (
							<div key={client.id} className="border-b border-primary-light last-of-type:border-0 p-2">
								<div className="flex justify-between items-center">
									<span>{client.name}</span>
									<button onClick={() => setData({ ...data, client })} className="text-primary flex items-center">
										<span className={`${client.id === data.client?.id ? "icon-[si--check-circle-fill]" : "icon-[si--check-circle-line]"}`}></span>
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
