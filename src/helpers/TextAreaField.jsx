import { Textarea } from '@nextui-org/react';
import { useField } from 'formik';
import './CustomComponentsStyles.scss'

const TextAreaField = ({ name, label, rows, ...props }) => {
	const [field, meta] = useField(name);

	return (
		<div className='input-container'>
			<Textarea
				label={label}
				id={name}
				name={name}
				value={field.value}
				onChange={field.onChange}
				rows={rows}
				{...props}
			/>
			<div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center modern text-2xl mb-10 mt-20`} >
				{meta.error}
			</div>
		</div>
	);
};

export default TextAreaField;
