import { StrapiError } from "@/types";
import { processDetails } from "@/utils";

export function FormError({ error }: { error?: string[] | string | Record<string, StrapiError[]> }) {
	if (!error) return null;

	if (typeof error !== "string") {
		const records = Array.isArray(error) ? error : processDetails(error);
		return records.map((err, index) => {
			return (
				<div className="form_error" key={index}>
					{err}
				</div>
			);
		});
	}
	return <div className="form_error">{error}</div>;
}
