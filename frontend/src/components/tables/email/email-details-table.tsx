import { EmailResponse } from "@/types";
import EmailDetailsItem from "./email-details-item";
import styles from "./email-details.module.css";

type Props = {
	emails: EmailResponse[];
};

export default function EmailDetailsTable({ emails }: Props) {
	return (
		<div className={styles.table}>
			<div className={styles.header}>
				<div>Fecha</div>
				<div>Para</div>
				<div>Asunto</div>
				<div></div>
			</div>

			<div className="items">
				{emails.map((item) => (
					<EmailDetailsItem key={item.id} email={item} />
				))}
			</div>
		</div>
	);
}
