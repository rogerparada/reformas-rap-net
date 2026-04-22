"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(name: string, token: string, email: string) {
	try {
		const url = process.env.BASE_URL;
		await resend.emails.send({
			from: "DND Utils <onboarding@resend.dev>",
			to: [email],
			subject: "Verifica tu email",
			html: `
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Email template</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:wght@400;700&display=swap" rel="stylesheet">
                </head>
                <body>
                    <style>
                        * {
                            font-family: "Poppins", sans-serif;
                            font-weight: 400;
                            font-style: normal;
                        }
                        h1 {
                            text-align: center;
                            color: blue;
                            margin-top: 50px;
                            font-family: "Poppins", sans-serif;
                            font-weight: 700;
                            font-style: normal;
                        }
                        a {
                            padding: 15px;
                            margin-top: 20px;
                            background-color: blue;
                            color: white;
                            border-radius: 10px;
                            text-decoration: none;
                            font-weight: bolder;
                            text-transform: uppercase;
                            width: 200px;
                            text-align: center;
                        }
                        div {
                            display: flex;
                            flex-direction: column;
                            justify-items: center;
                            align-items: center;
                        }
                    </style>
                    <h1 className="text-2xl">Gracias por registrarte</h1>
                    <div>
                        <p>${name} solo falta un paso para verificar tu cuenta</p>
                        <a href="${url}/api/verify-email?token=${token}"> Verificar mi email </a>
                    </div>
                </body>
            </html>`,
		});
	} catch (error) {
		console.error("Send Email Error", error);
		return { error: true };
	}
}
