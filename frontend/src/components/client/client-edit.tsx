"use client";

import { FullClienteResponse } from "@/types";
import { useState } from "react";
import EditClientForm from "../forms/edit-client-form";
import ClientForm from "../forms/client-form";
import ActionButton from "../ui/button/action-button";
import { actions } from "@/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import ClientDocumentTable from "../tables/client/client-document-table";

type ClientFormProps = {
	client: FullClienteResponse;
	destination: string;
};

export default function ClientEdit({ client }: ClientFormProps) {
	const [edit, setEdit] = useState(false);
	const router = useRouter();

	const { documentos, ...clientData } = client;

	const handleReset = () => {
		setEdit(false);
	};

	const deleteClient = () => {
		Swal.fire({
			title: "¿Esta seguro de eliminar este cliente?",
			text: "Esta acción no es reversible",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { success, errors } = await actions.client.deleteClientAction(client.id);
				if (!success) {
					Swal.fire({
						text: errors,
						confirmButtonColor: "#3085d6",
						icon: "error",
					});
					return;
				}
				await Swal.fire({
					title: "Eliminado",
					text: "Se ha borrado su cliente",
					confirmButtonColor: "#3085d6",
					icon: "success",
				});
				router.push("/gestion/clientes");
			}
		});
	};

	if (edit) {
		return (
			<div className="card">
				<EditClientForm client={clientData} reset={handleReset} />
			</div>
		);
	}

	return (
		<div className="card">
			<div className="flex justify-between items-center">
				<h1 className="title ml-5">Detalles de {client.name}</h1>
				<div className="flex justify-end gap-2">
					<ActionButton icon="edit" action={() => setEdit(true)} text="Editar" />
					<ActionButton icon="delete" color="red" action={deleteClient} text="Eliminar" />
				</div>
			</div>
			<hr className="separator" />
			<ClientForm data={client} disabled />
			{documentos.length > 0 ? (
				<ClientDocumentTable data={documentos} title="" />
			) : (
				<div className="card text-center p-10! mt-12!">Este cliente no tienen ningún documento asociado.</div>
			)}
		</div>
	);
}
