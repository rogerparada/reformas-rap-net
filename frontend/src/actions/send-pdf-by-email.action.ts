"use server";

export async function sendPdfByEmail(pdfBlob: Blob, destino: string, formData: FormData) {
	// try {
	// 	const fileName = `${formData.get("fileName") || "adjunto"}.pdf`;
	// 	const { data: uploadData, error: uploadError } = await supabase.storage
	// 		.from("pdf")
	// 		.upload(`pdf/${fileName}`, pdfBlob, { cacheControl: "3600", upsert: true });
	// 	if (uploadError || !uploadData) {
	// 		console.error("Error subiendo PDF a Supabase:", uploadError);
	// 		return { message: "Error subiendo PDF", status: 500, success: false };
	// 	}
	// 	const pdfPath = uploadData.path;
	// 	const response = await fetch(`${API_URL}/api/send-email`, {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({
	// 			pdfPath,
	// 			recipient: destino,
	// 			subject: formData.get("subject") || "",
	// 			message: formData.get("message") || "",
	// 		}),
	// 	});
	// 	if (!response.ok) {
	// 		const msg = await response.text();
	// 		console.error("Error al enviar el email:", msg);
	// 		return { message: msg || "Error al enviar el email", status: response.status, success: false };
	// 	}
	// 	return { message: "Se ha enviado correctamente", status: response.status, success: true };
	// } catch (error) {
	// 	console.error("Error del servidor:", error);
	// 	return { message: `Error del servidor: ${String(error)}`, status: 500, success: false };
	// }
}
