"use client";

import Link from "next/link";
import styles from "./pagination.module.css";
import { useSearchParams } from "next/navigation";
import { DocumentFilters } from "@/types/filters";
import { DocumentSortBy, TipoDocumento } from "@/types";
import { getQueryString } from "@/shared/utils";

type PaginationProps = {
	maxItems: number;
	url: string;
};

const MAX_PAGES = 20;

export default function Pagination({ maxItems, url }: PaginationProps) {
	const searchParams = useSearchParams();
	const filters: DocumentFilters = {
		tipo: (searchParams.get("tipo") as TipoDocumento) || "",
		sortBy: searchParams.get("sortBy") as DocumentSortBy,
		desc: searchParams.get("desc") === "true",
		page: Number(searchParams.get("page") || 1),
		items: Number(searchParams.get("items") || 10),
	};
	const page = filters.page || 1;
	const items = filters.items || 10;
	const totalPages = Math.ceil(maxItems / items);

	const halfMax = Math.floor(MAX_PAGES / 2);
	const thresholdLeft = halfMax + 1;
	const thresholdRight = totalPages - halfMax;

	if (totalPages <= 1) return null;

	const getUrl = (p: number) => `${url}?${getQueryString({ ...filters, page: p })}`;

	const pages = Array.from({ length: totalPages > MAX_PAGES ? MAX_PAGES : totalPages }, (_, i) => {
		if (totalPages > MAX_PAGES && page) {
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
				<>
					{totalPages > MAX_PAGES && page >= thresholdLeft && (
						<Link href={getUrl(1)} className={styles.page}>
							<span className="icon-[material-symbols--keyboard-double-arrow-left-rounded]" />
						</Link>
					)}
					<Link href={getUrl(page - 1)} className={styles.page}>
						<span className="icon-[material-symbols--chevron-left-rounded]" />
					</Link>
				</>
			)}

			{pages.map((p) => (
				<Link href={getUrl(p)} key={p} className={p === page ? `${styles.page} ${styles.active}` : styles.page}>
					{p}
				</Link>
			))}

			{page < totalPages && (
				<>
					<Link href={getUrl(page + 1)} className={styles.page}>
						<span className="icon-[material-symbols--chevron-right-rounded]" />
					</Link>

					{totalPages > MAX_PAGES && page < thresholdRight && (
						<Link href={getUrl(totalPages)} className={styles.page}>
							<span className="icon-[material-symbols--keyboard-double-arrow-right-rounded]" />
						</Link>
					)}
				</>
			)}
		</div>
	);
}
