import { useField } from 'formik';
import { Select, SelectItem } from '@nextui-org/react';

const FieldSelect = ({ name, label, options, ...props }) => {
	const [field, meta] = useField(name);

	return (
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
	);
};

export default FieldSelect;
