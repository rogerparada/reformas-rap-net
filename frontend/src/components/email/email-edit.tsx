import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, api } from "@/lib";

import EmailEditForm from "../forms/email-edit-form";

export default async function EmailEdit({ params }: { params: Promise<{ id: string }> }) {
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
	return <EmailEditForm email={result.getValue()} key={result.getValue().date} />;
}
