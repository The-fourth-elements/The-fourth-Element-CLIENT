import { useField } from 'formik';
import { Select, SelectItem } from '@nextui-org/react';

const FieldSelect = ({ name, label, options, ...props }) => {
	const [field, meta] = useField(name);

	return (
		<div className='input-container'>
			<Select
				label={label}
				name={name}
				value={field.value}
				onChange={field.onChange}
				options={options}
				{...props}>
				{options.map(option => (
					<SelectItem key={option.value} value={option.value}>
						{option.text}
					</SelectItem>
				))}
			</Select>

			<div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center modern text-2xl color text-red-500`} >
				{meta.error}
			</div>
		</div>
	);
};

export default FieldSelect;
