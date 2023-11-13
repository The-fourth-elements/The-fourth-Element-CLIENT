import { useField } from 'formik';
import { Input } from '@nextui-org/react';

const InputFiled = ({ ...props }) => {
	const [field, meta] = useField(props);
	const words = field.name.split(/(?=[A-Z])/).join(' ');
	const { viewPassword } = props;

	return (
		<div className='w-full text-area-container'>
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
			<div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center text-2xl`} >
				{meta.error}
			</div>
		</div>
	);
};

export default InputFiled;
