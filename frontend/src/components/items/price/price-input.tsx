import styles from "./price-input.module.css";

type Props = {
	symbol?: string;
	name: string;
	value?: number;
	placeholder?: string;
};

export default function PriceInput({ symbol = "€", name, value, placeholder }: Props) {
	return (
		<div className={styles.contenedor}>
			<label htmlFor={name}>Precio:</label>
			<input type="number" name={name} id={name} min={0} step={0.01} defaultValue={value} placeholder={placeholder} />
			<div>{symbol}</div>
		</div>
	);
}
