"use client";
import { useState } from "react";
import Modal from "../modal/modal";
import { ClienteResponse } from "@/types";
import NewClientModal from "../modal/new-client-modal";
import ClientSelectorList from "./client-selector-list";
import { useAppStore } from "@/store/useAppStore";

type Props = {
	clients: ClienteResponse[];
};

export default function ClientSelectorModal({ clients }: Props) {
	const [open, setOpen] = useState(false);
	const client = useAppStore((state) => state.client.name);

	return (
		<>
			<div className="form-control">
				<span className="text-sm font-bold text-right">Cliente:</span>
				{!client && (
					<div className="flex gap-2">
						<button onClick={() => setOpen(true)} className="w-full bg-slate-200 rounded-lg h-8">
							Seleccionar cliente
						</button>
						<NewClientModal retrieve />
					</div>
				)}
				{client && (
					<div>
						<span>{client}</span>
						<div className="flex gap-2">
							<button onClick={() => setOpen(true)} className="animated-primary action_button">
								<span className="icon-[stash--arrows-switch] text-2xl"></span>
							</button>
							{/* <NewClientModal /> */}
						</div>
					</div>
				)}
			</div>
			<Modal open={open} close={() => setOpen(false)}>
				<ClientSelectorList clients={clients} close={() => setOpen(false)} />
			</Modal>
		</>
	);
}
