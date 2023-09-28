import { useField } from 'formik';
import { Input } from '@nextui-org/react';

const InputFiled = ({ ...props }) => {
	const [field, meta] = useField(props);
	const words = field.name.split(/(?=[A-Z])/).join(' ');
	const { viewPassword } = props;

	return (
		<div className='input-container'>
			<Input
				isRequired
				label={words}
				id={field.name}
				color={meta.error ? 'danger' : 'default'}
				{...props}
				{...field}
				type={!field.name.includes("assword") ? "text" : viewPassword ? 'text' : 'password'}
				autoComplete='false'
			/>
			<div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center modern text-2xl text-red-500`} >
				{meta.error}
			</div>
		</div>
	);
};

export default InputFiled;
