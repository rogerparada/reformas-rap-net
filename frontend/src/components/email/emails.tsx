import { auth, api } from "@/lib";
import EmailDetailsTable from "../tables/email/email-details-table";

export default async function Emails() {
	const jwt = await auth.isAuthenticated();
	if (!jwt) return;

	const emails = await api.email.getAllEmails(jwt);

	return (
		<div>
			<h1 className="title">Emails</h1>
			<hr className="separator mb-5" />
			<EmailDetailsTable emails={emails} />
		</div>
	);
}
