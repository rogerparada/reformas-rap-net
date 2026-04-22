import { ContextMenuItemType, EmailResponse } from "@/types";
import styles from "./email-details.module.css";
import { toLocalDate } from "@/utils";
import MenuButton from "@/components/ui/button/menu-button";

type Props = {
	email: EmailResponse;
};

export default function EmailDetailsItem({ email }: Props) {
	const { attachment, cliente, to, date, subject, status } = email;

	const options: ContextMenuItemType[] = [
		{
			label: "Ver",
			icon: "view",
			url: `/gestion/emails/${email.id}`,
		},
		{
			label: "Editar",
			icon: "edit",
			url: `/gestion/emails/${email.id}/edit`,
		},
		{
			label: "Eliminar",
			icon: "delete",
			url: `/gestion/emails/delete/${email.id}`,
		},
	];

	return (
		<div className={styles.row}>
			<div className={styles.rowItem}>{toLocalDate(date)}</div>
			<div className={styles.rowItem}>
				{cliente?.name} &lt;{to}&gt;
			</div>
			<div className={styles.rowItem}>
				<div className="">
					<div className="">{subject}</div>
					<div className="">[ {status} ]</div>
					<div className="">{attachment && <span className="icon-[iconoir--attachment]" />}</div>
				</div>
			</div>
			<div className="h-10 w-full flex items-center justify-center">
				<MenuButton options={options} />
			</div>
		</div>
	);
}
