import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
	process.env.SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY! // Key con permisos de lectura del bucket privado
);

export async function POST(req: Request) {
	try {
		const { pdfPath, recipient, subject, message } = await req.json();

		if (!pdfPath || !recipient) {
			return NextResponse.json({ message: "Falta PDF o destinatario" }, { status: 400 });
		}

		// Descargar PDF desde Supabase
		const { data, error } = await supabase.storage.from("pdf").download(pdfPath);
		if (error || !data) throw error || new Error("No se pudo descargar el PDF");

		const fileBuffer = Buffer.from(await data.arrayBuffer());

		const attachment = {
			content: fileBuffer,
			filename: pdfPath.split("/").pop() || "documento.pdf",
		};

		const messageBody =
			message && message.includes("\n")
				? message
						.split("\n")
						.map((line: string) => `<p>${line}</p>`)
						.join("")
				: message;

		const { data: emailData, error: emailError } = await resend.emails.send({
			from: "Reformas RAP <jose@reformasrap.com>",
			to: [recipient],
			subject: subject || "Información",
			html: `${messageBody}
					<hr style="margin: 20px 0" />
					<table style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 14pt; border-collapse: collapse">
						<tr>
							<td style="padding-right: 15px; vertical-align: top">
								<img src="https://reformasrap.com/images/Logo.png" alt="Logo Empresa" width="150" height="auto" style="display: block; border: 0" />
							</td>
							<td style="border-left: 2px solid #006630; padding-left: 15px">
								<p style="margin: 0">
									<span style="font-size: 12pt; font-weight: bold; color: #333333">José Parada</span>
								</p>
								<p style="margin: 8px 0 8px 0">
									<span style="font-size: 12pt; font-weight: bold; color: black">REFORMAS RAP</span><br />
									<span style="color: #0088cc">Reformas Integrales.</span>
								</p>
								<p style="margin: 0">
									<span style="color: #0088cc; font-weight: bold">Móvil:</span>
									<a href="tel:627798621" style="color: #666666; text-decoration: none">627798621</a><br />
									<span style="color: #0088cc; font-weight: bold">Email:</span>
									<a href="mailto:jose@reformasrap.com" style="color: #666666; text-decoration: none">jose@reformasrap.com</a><br />
									<span style="color: #0088cc; font-weight: bold">Web:</span>
									<a href="reformasrap.com" target="_blank" style="color: #666666; text-decoration: none">reformasrap.com</a>
								</p>
							</td>
						</tr>
					</table>`,
			attachments: [attachment],
		});

		if (emailError) throw emailError;

		return NextResponse.json({ message: "Email enviado correctamente", data: emailData });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ message: "Error interno", error: String(err) }, { status: 500 });
	}
}
