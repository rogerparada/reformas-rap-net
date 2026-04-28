import { api, auth } from "@/lib";
import ClientTable from "../tables/client/client-table";
import AddData from "../ui/add-data";
import { ClientFilters } from "@/types";
import ItemsSelector from "./items-selector";

export default async function Clients({ params }: { params: Promise<{ add: boolean } & ClientFilters> }) {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const { add, ...filters } = await params;

	const response = await api.client.getClients(jwt, filters as ClientFilters);
	const { data, count } = response;

	if (data.length === 0) return <AddData tipo="Clientes" url="/gestion/client/new?clear=true" />;
	return (
		<>
			<ItemsSelector open={add} />
			<ClientTable data={data} maxItems={count} />
		</>
	);
}
