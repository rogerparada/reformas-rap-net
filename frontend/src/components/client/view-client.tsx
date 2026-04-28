import { api, auth } from "@/lib";
import { redirect } from "next/navigation";
import ClientEdit from "./client-edit";

export default async function ViewClient({ params }: { params: Promise<{ id: string }> }) {
	const token = await auth.isAuthenticated();
	if (!token) return redirect("/login");

	const { id } = await params;

	const response = await api.client.getFullClientById(token, id);

	return <ClientEdit client={response} destination="/gestion/clientes" />;
}
