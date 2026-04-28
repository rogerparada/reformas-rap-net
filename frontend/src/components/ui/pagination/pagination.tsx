import Link from "next/link";
import styles from "./pagination.module.css";

type PaginationProps = {
	page: number;
	items: number;
	totalPages: number;
	url: string;
};

const MAX_PAGES = 20;

export default function Pagination({ page, items, totalPages, url }: PaginationProps) {
	console.log(page, items, totalPages, url);
	if (totalPages <= 1) return null;

	const pages = Array.from({ length: totalPages > MAX_PAGES ? MAX_PAGES : totalPages }, (_, i) => {
		if (totalPages > MAX_PAGES) {
			if (page > MAX_PAGES / 2 && page < totalPages - MAX_PAGES / 2) {
				return i + page - MAX_PAGES / 2;
			}
			if (page >= totalPages - MAX_PAGES / 2) {
				return totalPages - i;
			}
			return i + 1;
		}
		return i + 1;
	}).sort((a, b) => a - b);

	return (
		<div className={styles.pagination}>
			{page > 1 && (
				<Link href={`${url}?page=${page - 1}&items=${items}`} className={styles.page}>
					<span className="icon-[material-symbols--keyboard-double-arrow-left-rounded]" />
				</Link>
			)}
			{page > MAX_PAGES && (
				<Link href={`${url}?page=${page - 1}&items=${items}`} className={styles.page}>
					<span className="icon-[material-symbols--chevron-right-rounded]" />
				</Link>
			)}
			{pages.map((p) => (
				<Link href={`${url}?page=${p}&items=${items}`} key={p} className={p === page ? `${styles.page} ${styles.active}` : styles.page}>
					{p}
				</Link>
			))}
			{page < totalPages && (
				<Link href={`${url}?page=${page + 1}&items=${items}`} className={styles.page}>
					<span className="icon-[material-symbols--chevron-right-rounded]" />
				</Link>
			)}
			{page < totalPages - MAX_PAGES && (
				<Link href={`${url}?page=${totalPages}&items=${items}`} className={styles.page}>
					<span className="icon-[material-symbols--keyboard-double-arrow-right-rounded]" />
				</Link>
			)}
		</div>
	);
}
