import { redirect } from "next/navigation";
import { auth } from "@/lib";
import { api } from "@/lib";
import EmailSignature from "./email-signature";
import { toDayOfWeekDate } from "@/shared/utils";
import Link from "next/link";
import EmailOptions from "./email-options";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function EmailView({ params }: Props) {
	const { id } = await params;
	const token = await auth.isAuthenticated();
	if (!token) return redirect("/login");

	const result = await api.email.getEmailById(token, id);
	if (!result.isSuccess) {
		return (
			<div className="w-full border-4 border-dotted border-primary rounded-2xl h-96 flex flex-col items-center justify-center gap-5">
				<span className="text-primary text-2xl font-extrabold">No se ha encontrado el email solicitado</span>
				<Link href="/gestion/emails" className="flex items-center gap-2 border rounded-lg p-2 text-primary ">
					<span className="icon-[lets-icons--back] text-2xl"></span>
					<span className="text-xl cursor-pointer hover:underline transition-all duration-300">Ir a los emails</span>
				</Link>
			</div>
		);
	}

	const email = result.getValue();

	return (
		<div className="w-full p-4 space-y-5">
			<EmailOptions action="draft" id={id} />
			<div className="w-full border border-slate-400 p-4">
				<span className="font-bold text-xl">{email.subject}</span>
			</div>
			<div className="flex justify-between">
				<div className="flex items-center gap-4">
					<div className="rounded-full flex items-center justify-center w-10 h-10 bg-blue-500 text-white">
						<span className="icon-[fa6-solid--user]" />
					</div>
					<span>
						<b>Para:</b> {email.to}
					</span>
				</div>
				<div className="text-slate-500">{toDayOfWeekDate(email.date)}</div>
			</div>
			{email.attachment && (
				<div className="h-8 flex items-center border border-slate-400 w-40">
					<div className="flex items-center h-full p-2 text-white bg-slate-400">
						<span className="icon-[ls--clip]" />
					</div>
					<div className="p-2 flex justify-center items-center flex-1">
						<Link href={`/gestion/documentos/${email.attachment.idDocumento}`} target="_blank">
							{email.attachment.name}
						</Link>
					</div>
				</div>
			)}
			<hr className="border-slate-400" />
			<div className="">{email.message}</div>
			<EmailSignature />
		</div>
	);
}
