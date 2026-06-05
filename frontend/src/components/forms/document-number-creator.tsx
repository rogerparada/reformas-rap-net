import { useAppStore } from "@/store/useAppStore";
import { getNextDocumentNumberAction } from "@/actions/document.action";
import { useEffect, useRef } from "react";

export default function DocumentNumberCreator() {
	const idDocumento = useAppStore((state) => state.document.idDocumento);
	const tipoDocumento = useAppStore((state) => state.document.tipoDocumento);
	const numeroDocumento = useAppStore((state) => state.document.numeroDocumento);
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);

	const isNew = !idDocumento;
	const lastTipo = useRef(tipoDocumento);

	useEffect(() => {
		if (!isNew) return;
		if (lastTipo.current === tipoDocumento) return;

		lastTipo.current = tipoDocumento;
		getNextDocumentNumberAction(tipoDocumento).then((nextNumber) => {
			changeDocumentAttribute("numeroDocumento", nextNumber);
		});
	}, [tipoDocumento, isNew, changeDocumentAttribute]);

	const encabezado = tipoDocumento.slice(0, 4);
	const numero = numeroDocumento.slice(5);

	return (
		<div className="form-control">
			<label htmlFor="documentNumber">Número:</label>
			<div className="pillBox">
				<div>{encabezado}</div>
				<input
					id="documentNumber"
					type="text"
					value={numero}
					readOnly={isNew}
					onChange={(e) => changeDocumentAttribute("numeroDocumento", `${encabezado}-${e.target.value}`)}
				/>
			</div>
		</div>
	);
}
