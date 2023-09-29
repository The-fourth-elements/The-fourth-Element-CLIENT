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
				{options.map((option, index) => {
					if(typeof option =="object"){
						return (<SelectItem key={option.value} value={option.value}>
							{option.text}
						</SelectItem>)
					} else {
						return (<SelectItem key={option} value={option}>{option}</SelectItem>)
					}
					
					
					})}
			</Select>

			<div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center modern text-2xl color text-red-500 mb-10 mt-20`} >
				{meta.error}
			</div>
		</div>
	);
};

export default FieldSelect;
