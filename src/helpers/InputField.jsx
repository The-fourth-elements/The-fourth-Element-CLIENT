import { useField } from 'formik';
import { Input } from '@nextui-org/react';

const InputFiled = ({ ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			{!field.name.includes('assword') ? (
				<Input
					isRequired
					label={field.name}
					id={field.name}
					type='text'
					color={meta.error ? 'danger' : 'default'}
					{...props}
					{...field}
					autoComplete='false'
				/>
			) : (
				<Input
					isRequired
					label={field.name}
					id={field.name}
					color={meta.error ? 'danger' : 'default'}
					{...props}
					{...field}
					type='password'
					autoComplete='false'
				/>
			)}
			<div className='flex justify-center p-5 moder text-2xl'>
				{meta.error && <span className='modern bg-primary-700'>{meta.error}</span>}
			</div>
		</>
	);
};

export default InputFiled;
