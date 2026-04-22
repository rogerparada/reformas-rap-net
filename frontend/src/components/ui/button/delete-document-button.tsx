"use client";

import { DocumentInfo } from "@/types";
import ActionButton from "./action-button";
import { actions } from "@/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function DeleteDocumentButton({ id }: { id: DocumentInfo["idDocumento"] }) {
	const router = useRouter();
	const deleteDocument = () => {
		Swal.fire({
			title: "¿Esta seguro de eliminar este documento?",
			text: "Esta acción no es reversible",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { success, errors } = await actions.document.deleteDocumentAction(id);
				if (!success) {
					Swal.fire({
						title: "Error",
						text: errors?.join("\n"),
						confirmButtonColor: "#3085d6",
						icon: "error",
					});
					return;
				}
				await Swal.fire({
					title: "Eliminado",
					text: "Se ha borrado su documento",
					confirmButtonColor: "#3085d6",
					icon: "success",
				});
				router.push("/gestion/documentos");
			}
		});
	};
	return <ActionButton icon="delete" action={deleteDocument} text="Eliminar" color="red" />;
}
