export class Result<T, E> {
	public isSuccess: boolean;
	private value?: T;
	private error?: E;

	private constructor(isSuccess: boolean, error?: E, value?: T) {
		this.isSuccess = isSuccess;
		this.value = value;
		this.error = error;
	}

	public static ok<T, E>(value: T): Result<T, E> {
		return new Result<T, E>(true, undefined, value);
	}

	public static fail<T, E>(error: E): Result<T, E> {
		return new Result<T, E>(false, error, undefined);
	}

	public getValue(): T {
		if (!this.isSuccess) {
			throw new Error("No se puede obtener el valor de un resultado fallido");
		}
		return this.value!;
	}

	public getError(): E {
		if (this.isSuccess) {
			throw new Error("No se puede obtener el error de un resultado exitoso");
		}
		return this.error!;
	}
}
