export const getQueryString = (values: object) => {
	const params: string[] = [];
	for (const [key, value] of Object.entries(values)) {
		if (value) {
			params.push(`${key}=${value}`);
		}
	}
	return params.join("&");
};
