import styles from './styles.module.scss';


const InputRange = ({
	value,
	onChange,
	className = 'w-full',
    typeOfRegister
}) => {
	
	// const background = `background:  ${}`//colores a especificar, hay que hacer una condicional. que cuando se renderice el autorregistro este cambie dependiendo de la variable typeOfRegister.-m-2

	// let background = 'max-w-[30vw]';
	return (
		<input
			type='range'
			min={1}
			max={5}
			step={1}
			value={value}
			defaultValue={3}
			onChange={onChange}
			className={`${styles.InputRange} ${className} bg-gradient-to-t`}
		/>
	);
};

export default InputRange;
