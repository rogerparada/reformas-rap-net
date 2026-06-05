import { useAppStore } from "@/store/useAppStore";
import { getNextDocumentNumberAction } from "@/actions/document.action";
import { useEffect, useRef } from "react";

export default function DocumentNumberCreator() {
	const idDocumento = useAppStore((state) => state.document.idDocumento);
	const tipoDocumento = useAppStore((state) => state.document.tipoDocumento);
	const numeroDocumento = useAppStore((state) => state.document.numeroDocumento);
	const originalTipo = useAppStore((state) => state.originalTipoDocumento);
	const originalNumero = useAppStore((state) => state.originalNumeroDocumento);
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);

	const isNew = !idDocumento;
	const lastTipo = useRef(tipoDocumento);
	const generatedCache = useRef<Record<string, string>>({});

	useEffect(() => {
		if (lastTipo.current === tipoDocumento) return;
		lastTipo.current = tipoDocumento;

		if (isNew) {
			getNextDocumentNumberAction(tipoDocumento).then((nextNumber) => {
				changeDocumentAttribute("numeroDocumento", nextNumber);
			});
			return;
		}

		if (!originalTipo) return;

		if (tipoDocumento === originalTipo) {
			changeDocumentAttribute("numeroDocumento", originalNumero);
			return;
		}

		if (generatedCache.current[tipoDocumento]) {
			changeDocumentAttribute("numeroDocumento", generatedCache.current[tipoDocumento]);
			return;
		}

		getNextDocumentNumberAction(tipoDocumento).then((nextNumber) => {
			generatedCache.current[tipoDocumento] = nextNumber;
			changeDocumentAttribute("numeroDocumento", nextNumber);
		});
	}, [tipoDocumento, isNew, originalTipo, originalNumero, changeDocumentAttribute]);

	const encabezado = tipoDocumento.slice(0, 4).toUpperCase();
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
					disabled
				/>
			</div>
		</div>
	);
}
