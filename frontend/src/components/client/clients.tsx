import { api, auth } from "@/lib";
import ClientTable from "../tables/client/client-table";
import AddData from "../ui/add-data";
import NewClientModal from "../modal/new-client-modal";

export default async function Clients({ params }: { params: Promise<{ add: boolean }> }) {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const { add } = await params;

	const data = await api.client.getClients(jwt);
	if (!data) {
		return;
	}

	if (data.length === 0) return <AddData tipo="Clientes" url="/gestion/client/new?clear=true" />;
	return (
		<>
			<div className="flex justify-end">
				<NewClientModal text="Nuevo Cliente" open={!!add} />
			</div>
			<h1 className="title">Clientes</h1>
			<hr className="separator mb-10" />
			<ClientTable data={data} />
		</>
	);
}
