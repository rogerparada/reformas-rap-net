import { api, auth } from "@/lib";
import { redirect } from "next/navigation";
import ClientEdit from "./client-edit";

export default async function ViewClient({ params }: { params: Promise<{ id: string }> }) {
	const token = await auth.isAuthenticated();
	const { id } = await params;

	const response = await api.client.getClientFullDataById(token || "", id);

	if (!response) redirect("/gestion/clientes");

	return <ClientEdit client={response} destination="/gestion/clientes" />;
}
