import { FormError } from "../ui/form-error";
import { ClientFormState } from "@/types";

type ClientFormProps = { disabled?: boolean } & ClientFormState;

export default function ClientForm({ data, errors, serverErrors, disabled }: ClientFormProps) {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-2 ">
				<div className="space-y-2">
					<div className="form-control">
						<label htmlFor="name">Nombre:</label>
						<input name="name" id="name" type="text" placeholder="Nombre del cliente" defaultValue={data?.name} readOnly={disabled} />
					</div>
					<FormError error={errors?.name} />
					<div className="form-control">
						<label htmlFor="phone" className="font-bold">
							Teléfono:
						</label>
						<input name="phone" id="phone" type="text" placeholder="Teléfono" defaultValue={data?.phone} readOnly={disabled} />
					</div>
					<FormError error={errors?.phone} />
					<div className="form-control">
						<label htmlFor="email">Email:</label>
						<input name="email" id="email" type="text" placeholder="Email" defaultValue={data?.email} readOnly={disabled} />
					</div>
					<FormError error={errors?.email} />
				</div>
				<div className="space-y-2">
					<div className="form-control">
						<label htmlFor="address" className="font-bold">
							Dirección:
						</label>
						<input name="address" id="address" type="text" placeholder="Dirección" defaultValue={data?.address} readOnly={disabled} />
					</div>
					<FormError error={errors?.address} />
					<div className="form-control">
						<label htmlFor="city" className="font-bold">
							Población:
						</label>
						<input name="city" id="city" type="text" placeholder="Población" defaultValue={data?.city} readOnly={disabled} />
					</div>
					<FormError error={errors?.city} />
					<div className="form-control">
						<label htmlFor="nif" className="font-bold">
							NIF*:
						</label>
						<input name="nif" id="nif" type="text" placeholder="NIF" defaultValue={data?.nif} readOnly={disabled} />
					</div>
					<FormError error={errors?.nif} />
				</div>
			</div>
			<div className="mt-5">
				<FormError error={serverErrors ?? ""} />
			</div>
		</>
	);
}
