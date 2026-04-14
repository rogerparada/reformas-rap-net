import { EmailResponse } from "@/types";
import styles from "./email-details.module.css";
import { toLocalDate } from "@/utils";

type Props = {
	email: EmailResponse;
};

export default function EmailDetailsItem({ email }: Props) {
	const { attachment, cliente, destination, date, subject, status } = email;
	return (
		<div className={styles.row}>
			<div>{status}</div>
			<div>
				{cliente.name} &lt;{destination}&gt;
			</div>
			<div>{subject}</div>
			<div>{toLocalDate(date)}</div>
			<div>{attachment && <span className="icon-[iconoir--attachment]" />}</div>
		</div>
	);
}
