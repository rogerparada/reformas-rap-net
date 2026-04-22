import Emails from "@/components/email/emails";
import { Suspense } from "react";

export default function EmailPage() {
	return (
		<Suspense>
			<Emails />
		</Suspense>
	);
}
