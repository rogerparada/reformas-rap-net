import { jwtDecode } from "jwt-decode";

export const validateToken = (token: string): boolean => {
	try {
		const decoded = jwtDecode(token);
		const { exp } = decoded;
		return exp ? +exp > Date.now() / 1000 : false;
	} catch (error) {
		console.log("Error validando el token", error);
		return false;
	}
};
