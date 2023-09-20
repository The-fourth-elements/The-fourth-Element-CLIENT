import { useField } from 'formik';
import React from 'react';

const InputFiled = ({ ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			{!field.name.includes('assword') ? (
				<input
					id={field.name}
					type='text'
					className={meta.error ? '' : ''}
					{...props}
					{...field}
					autoComplete='false'
				/>
			) : (
				<input
					id={field.name}
					type='password'
					className={meta.error ? '' : ''}
					{...props}
					{...field}
					autoComplete='false'
				/>
			)}
			{meta.error && <span className=''>{meta.error}</span>}
		</>
	);
};

export default InputFiled;
