"use client";
import { actions } from "@/actions";
import { FormError } from "@/components/ui/form-error";
import { FormState } from "@/types";
import Modal from "@/components/modal/modal";

import react from "react";
import ModalMessage from "@/components/modal/modal-message";

const INITIAL_STATE: FormState = {
	success: false,
	message: undefined,
	serverErrors: null,
	errors: null,
	data: {
		username: "",
		password: "",
	},
};

export default function LoginPage() {
	const [formState, formAction, isPending] = react.useActionState(actions.auth.loginUserAction, INITIAL_STATE);

	return (
		<div className="flex flex-col justify-center items-center min-h-screen container mx-auto">
			<Modal open={isPending}>
				<ModalMessage text="Iniciando sesión..." icon="loading" color="blue" />
			</Modal>
			<form action={formAction} className="login_form">
				<div className="login_avatar">
					<span className="icon-[streamline--user-multiple-circle-solid]" />
				</div>
				<FormError error={formState.serverErrors?.message} />
				<div>
					<label htmlFor="user">Usuario:</label>
					<input
						id="username"
						name="username"
						type="text"
						placeholder="nombre de usuario"
						autoComplete="username"
						defaultValue={formState.data?.username || ""}
					/>
					<FormError error={formState.errors?.username} />
				</div>
				<div>
					<label htmlFor="password">Contraseña:</label>
					<input
						name="password"
						id="password"
						type="password"
						placeholder="contraseña"
						autoComplete="current-password"
						defaultValue={formState.data?.password || ""}
					/>
				</div>
				<FormError error={formState.errors?.password} />
				<div>
					<button type="submit" disabled={isPending}>
						{isPending ? "Cargando..." : "Iniciar sesión"}
					</button>
				</div>
			</form>
		</div>
	);
}
