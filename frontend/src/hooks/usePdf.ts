import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";

export const usePDF = () => {
	const scale = 2;
	const imageUrl = "image/jpeg";
	const format = "JPEG";

	const previewPdf = async (printRef: RefObject<null>) => {
		const element = printRef.current;

		if (!element) return;

		const canvas = await html2canvas(element, {
			scale,
		});
		const data = canvas.toDataURL(imageUrl);

		const pdf = new jsPDF();
		const imgProperties = pdf.getImageProperties(data);
		const pdfWidth = pdf.internal.pageSize.getWidth();

		const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

		pdf.addImage(data, format, 0, 0, pdfWidth, pdfHeight);
		const pdfBlob = pdf.output("blob");
		return URL.createObjectURL(pdfBlob);
	};

	// const createBlobPdf = async (printRef: RefObject<null>): Promise<Blob | void> => {
	// 	const element = printRef.current;

	// 	if (!element) return;

	// 	const canvas = await html2canvas(element, {
	// 		scale,
	// 	});
	// 	const data = canvas.toDataURL(imageUrl);

	// 	const pdf = new jsPDF();
	// 	const imgProperties = pdf.getImageProperties(data);
	// 	const pdfWidth = pdf.internal.pageSize.getWidth();

	// 	const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

	// 	pdf.addImage(data, format, 0, 0, pdfWidth, pdfHeight);
	// 	return pdf.output("blob");
	// };

	const createPdf = async (element: HTMLElement) => {
		// Renderiza el elemento a canvas
		const canvas = await html2canvas(element, {
			scale,
			useCORS: true,
			scrollY: 0,
		});

		//const imgData = canvas.toDataURL(imageUrl); // mantiene tu variable externa

		const pdf = new jsPDF("p", "mm", "a4");
		const pdfWidth = pdf.internal.pageSize.getWidth(); // mm
		const pdfHeight = pdf.internal.pageSize.getHeight(); // mm

		const marginTop = 12; // mm
		const marginBottom = 16; // mm
		const marginLeft = 10; // mm
		const availableHeightMm = pdfHeight - marginTop - marginBottom;
		const availableWidthMm = pdfWidth - marginLeft * 2;

		// Propiedades del canvas (px)
		const canvasWidthPx = canvas.width;
		const canvasHeightPx = canvas.height;

		// Convertir mm disponibles a píxeles del canvas:
		// Relación: imgWidthMm (pdfWidth) corresponde a canvasWidthPx
		// por tanto 1 mm en PDF = canvasWidthPx / pdfWidth px
		const pxPerMm = canvasWidthPx / pdfWidth;
		const pageHeightPx = Math.floor(availableHeightMm * pxPerMm); // altura por página en px (slice)

		// Si pageHeightPx es 0 por algún motivo, abortar
		if (pageHeightPx <= 0) throw new Error("pageHeightPx inválido");

		let yOffsetPx = 0;
		let pageIndex = 0;

		while (yOffsetPx < canvasHeightPx) {
			// altura del slice en px (última página puede ser menor)
			const sliceHeightPx = Math.min(pageHeightPx, canvasHeightPx - yOffsetPx);

			// Crear canvas temporal para el slice
			const sliceCanvas = document.createElement("canvas");
			sliceCanvas.width = canvasWidthPx;
			sliceCanvas.height = sliceHeightPx;

			const ctx = sliceCanvas.getContext("2d");
			if (!ctx) throw new Error("No se puede obtener contexto 2D");

			// Dibuja la porción del canvas original en el canvas temporal
			// source: sx, sy, sw, sh
			// dest: dx, dy, dw, dh
			ctx.drawImage(
				canvas,
				0, // sx
				yOffsetPx, // sy (empezamos en yOffsetPx)
				canvasWidthPx, // sw
				sliceHeightPx, // sh
				0, // dx
				0, // dy
				canvasWidthPx, // dw
				sliceHeightPx // dh
			);

			// Convertir sliceCanvas a dataURL
			const sliceData = sliceCanvas.toDataURL(imageUrl);

			// Calculamos la altura en mm de este slice al escalar a pdfWidth
			const sliceHeightMm = (sliceHeightPx * pdfWidth) / canvasWidthPx;

			// Añadir página (la primera ya existe, así que solo addPage() si pageIndex > 0)
			if (pageIndex > 0) pdf.addPage();

			// Insertar la imagen del slice con los márgenes laterales y superior
			pdf.addImage(sliceData, format, marginLeft, marginTop, availableWidthMm, sliceHeightMm);

			// avanzar
			yOffsetPx += sliceHeightPx;
			pageIndex += 1;
		}

		return pdf;
	};

	const createBlobPdf = async (printRef: RefObject<null>): Promise<Blob | void> => {
		const element = printRef.current as HTMLElement | null;
		if (!element) return;

		const pdf = await createPdf(element);

		return pdf.output("blob");
	};

	const downloadPdf = async (printRef: RefObject<null>, fileName: string) => {
		const element = printRef.current;

		if (!element) return;

		const pdf = await createPdf(element);

		pdf.save(fileName);
	};

	return { createBlobPdf, downloadPdf, previewPdf };
};
