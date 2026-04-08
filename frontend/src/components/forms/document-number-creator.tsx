import { useAppStore } from "@/store/useAppStore";

export default function DocumentNumberCreator() {
	const documento = useAppStore((state) => state.document.tipoDocumento);
	const numeroDocumento = useAppStore((state) => state.document.numeroDocumento);
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);

	const encabezado = documento.slice(0, 4);
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
					onChange={(e) => changeDocumentAttribute("numeroDocumento", `${encabezado}-${e.target.value}`)}
				/>
			</div>
		</div>
	);
}
