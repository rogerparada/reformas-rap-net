"use client";
import { useEffect } from "react";

interface PdfViewerProps {
	pdfBlob: Blob;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfBlob }) => {
	const url = URL.createObjectURL(pdfBlob);
	useEffect(() => {
		if (pdfBlob) {
			return () => {
				if (url) {
					URL.revokeObjectURL(url);
				}
			};
		}
	}, [pdfBlob, url]);

	return (
		<div style={{ width: "100%", height: "100vh" }}>
			<iframe src={url} title="Vista previa del PDF" style={{ width: "100%", height: "100%" }} frameBorder="0" />
		</div>
	);
};

export default PdfViewer;
