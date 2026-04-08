import { jsPDF } from "jspdf";

import { FullDocument, ItemTable } from "@/types";
import { formatCurrency } from "@/utils";
import { formatDate } from "@/utils/formatters";

export function generarPDF(doc: Omit<FullDocument, "data"> & { items: ItemTable[] }) {
	const { client, company, document, items } = doc;
	const { tipoDocumento: tipo, numeroDocumento: numero, fecha, iva: tax } = document;

	const pdf = new jsPDF();
	const green = "#006630";
	const dark_green = "#0d542b";
	let y = 10;
	const leftX = 10;
	const rightX = 115;
	const width = 190;
	const ROW_HEIGHT = 10;
	const PAGE_LIMIT = 290;
	const widthTable = 197;

	const addPageIfNeeded = (minSpace: number = 40) => {
		const pageHeight = pdf.internal.pageSize.height;
		if (y + minSpace >= pageHeight - 15) {
			pdf.addPage();
			y = 10;
		}
	};

	pdf.setFillColor(green);
	pdf.setDrawColor(green);
	pdf.rect(10, y, width, 12, "DF");

	pdf.setTextColor(255, 255, 255);
	pdf.setFont("helvetica", "bold");
	pdf.setFontSize(11);
	pdf.addImage("/images/LogoB.png", leftX + 5, y + 2.5, 7, 7);
	pdf.text(`eformas RAP | ${tipo}`, leftX + 13, y + 9);

	pdf.setTextColor(0, 0, 0);

	y += 20;

	pdf.setFont("helvetica", "bold");
	pdf.text(company.name, leftX + 5, y);
	pdf.setFont("helvetica", "normal");

	pdf.addImage("/icons/phone.png", "PNG", leftX + 5, y + 3, 3.5, 3.5);
	pdf.addImage("/icons/mail.png", "PNG", leftX + 5, y + 9.5, 3.5, 3.5);
	pdf.addImage("/icons/address.png", "PNG", leftX + 5, y + 15, 3.5, 3.5);
	pdf.addImage("/icons/web.png", "PNG", leftX + 5, y + 27, 3.5, 3.5);

	pdf.text(company.phone, leftX + 10, y + 6);
	pdf.text(company.email, leftX + 10, y + 12);
	pdf.text(company.address, leftX + 10, y + 18);
	pdf.text(company.city, leftX + 10, y + 24);
	pdf.text(company.web, leftX + 10, y + 30);
	pdf.link(leftX + 5, y + 20, 35, 10, { url: `https://${company.web}` });

	pdf.setFont("helvetica", "bold");
	pdf.text(client.name, rightX, y);
	pdf.setFont("helvetica", "normal");

	pdf.addImage("/icons/phone.png", "PNG", rightX, y + 3, 3.5, 3.5);
	pdf.addImage("/icons/mail.png", "PNG", rightX, y + 9.5, 3.5, 3.5);
	pdf.addImage("/icons/address.png", "PNG", rightX, y + 15, 3.5, 3.5);

	pdf.text(client.phone || "", rightX + 5, y + 6);
	pdf.text(client.email, rightX + 5, y + 12);
	pdf.text(client.address || "", rightX + 5, y + 18);
	pdf.text(client.city || "", rightX + 5, y + 24);
	if (client.nif) {
		pdf.addImage("/icons/id.png", "PNG", rightX, y + 27, 3.5, 3.5);
		pdf.text(client.nif || "", rightX + 5, y + 30);
	}

	y = 70;

	// Info factura

	pdf.setFillColor(green);

	pdf.rect(10, y, width, 10, "DF");
	pdf.rect(10, y + 10, width, 10);

	pdf.setTextColor(255, 255, 255);

	if (tax) {
		pdf.text(`N° ${tipo}`, width / 6, y + 7);
		pdf.text("Fecha", 99, y + 7);
		pdf.text("DNI", 165, y + 7);

		pdf.setDrawColor(dark_green);
		pdf.line(73.5, y, 73.5, y + 10);
		pdf.line(136.5, y, 136.5, y + 10);
		pdf.setDrawColor(green);
		pdf.line(73.5, y + 10, 73.5, y + 20);
		pdf.line(136.5, y + 10, 136.5, y + 20);

		pdf.setTextColor(0, 0, 0);
		pdf.text(numero ?? "", 10 + width / 6 - numero.length, y + 16);
		pdf.text(formatDate(document.fecha), 95, y + 16);
		pdf.text(company.nif, 158, y + 16);
	} else {
		pdf.text(`N° ${tipo}`, width / 4, y + 7);
		pdf.text("Fecha", 147, y + 7);
		pdf.setTextColor(0, 0, 0);
		pdf.setDrawColor(dark_green);
		pdf.line(105, y, 105, y + 10);

		pdf.setDrawColor(green);
		pdf.line(105, y + 10, 105, y + 20);

		pdf.text(numero ?? "", 10 + width / 4 - numero.length, y + 16);
		pdf.text(formatDate(fecha), 142.5, y + 16);
	}

	y = 100;

	// Tabla
	const header = () => {
		pdf.setFillColor(green);
		pdf.rect(10, y, width, 10, "DF");
		pdf.setTextColor(255, 255, 255);
		pdf.setFont("helvetica", "bold");
		pdf.text("Descripción", 15, y + 7);
		pdf.text("Precio", 125, y + 7);
		pdf.text("Ud.", 150, y + 7);
		pdf.text("Importe", 178, y + 7);
		pdf.setDrawColor(dark_green);
		pdf.line(115, y, 115, y + 10);
		pdf.line(145, y, 145, y + 10);
		pdf.line(160, y, 160, y + 10);
		y += 10;
	};

	header();

	pdf.setFont("helvetica", "normal");
	pdf.setTextColor(0, 0, 0);

	items.forEach(({ description, price, quantity, total }) => {
		const lines = pdf.splitTextToSize(description, 95);

		const rowHeight = Math.max(ROW_HEIGHT, lines.length * 5);

		if (y + rowHeight > PAGE_LIMIT) {
			pdf.addPage();
			y = 10;
			header();
			pdf.setFont("helvetica", "normal");
			pdf.setTextColor(0, 0, 0);
		}

		pdf.rect(10, y, width, rowHeight);

		pdf.setDrawColor(green);
		pdf.line(115, y, 115, y + rowHeight);
		pdf.line(145, y, 145, y + rowHeight);
		pdf.line(160, y, 160, y + rowHeight);

		const p = formatCurrency(price);
		const q = quantity.toString();
		const t = formatCurrency(total);

		pdf.text(lines, 15, y + 7);

		if (price) pdf.text(p, 130 - p.length, y + 7);
		if (quantity) pdf.text(q, 152 - q.length, y + 7);
		pdf.text(t, widthTable - t.length * 2, y + 7);

		y += rowHeight;
	});

	const base = items.reduce((sum, { total }) => (sum += total), 0);
	const subtotal = formatCurrency(base);
	const iva = formatCurrency(base * 0.21);
	const total = formatCurrency(tax ? base + base * 0.21 : base);

	addPageIfNeeded(60);

	pdf.setFont("helvetica", "bold");
	pdf.setTextColor(0, 0, 0);

	if (tax) {
		pdf.rect(10, y, width, 10);
		pdf.text("BASE IMPONIBLE", 15, y + 7);
		pdf.text(subtotal, widthTable - subtotal.length * 2, y + 7);
		y += 10;

		addPageIfNeeded(40);
		pdf.rect(10, y, width, 10);
		pdf.text("21% IVA", 15, y + 7);
		pdf.text(iva, widthTable - iva.length * 2, y + 7);
		y += 10;
	}
	addPageIfNeeded(40);
	pdf.rect(10, y, width, 10);
	pdf.text("TOTAL", 15, y + 7);
	pdf.text(total, widthTable - total.length * 2, y + 7);
	y += 10;

	const condiciones = "Condiciones de pago:";

	addPageIfNeeded(40);
	pdf.rect(10, y, width, 10);
	pdf.text(condiciones, 15, y + 7);

	pdf.setFont("helvetica", "normal");

	const texto = "Se abonará el 40% al inicio de la obra y el resto al final de la misma.";
	const lineas = pdf.splitTextToSize(texto, width - 40);

	pdf.text(lineas, 16 + condiciones.length * 2, y + 7);

	return pdf;
}
