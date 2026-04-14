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
				<div>Estado</div>
				<div>Destinatario</div>
				<div>Asunto</div>
				<div>Fecha</div>
				<div>Adjunto</div>
			</div>

			<div className="items">
				{emails.map((item) => (
					<EmailDetailsItem key={item.id} email={item} />
				))}
			</div>
		</div>
	);
}
