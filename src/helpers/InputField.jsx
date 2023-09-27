import { useField } from 'formik';
import { Input } from '@nextui-org/react';

const InputFiled = ({ ...props }) => {
	const [field, meta] = useField(props);
	const words = field.name.split(/(?=[A-Z])/).join(' ');
	const { viewPassword } = props;

	return (
		<>
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
			<div className='flex justify-center p-5 modern text-2xl '>
				{meta.error && <span className='modern bg-primary-700'>{meta.error}</span>}
				
			</div>
		</>
	);
};

export default InputFiled;
