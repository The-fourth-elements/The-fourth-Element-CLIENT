
import { useField } from 'formik';
import { Input } from '@nextui-org/react';
import { EyeOpen, EyeSlash } from '@/components/loginForm/eyeIcons';
import "./Button.scss"

const InputFiledPassword = ({ ...props }) => {
	const [field, meta] = useField(props);
	const words = field.name.split(/(?=[A-Z])/).join(' ');
	const { viewPassword, handleShow } = props;

	return (
		<div className='input-container'>
		  <div className='input-wrapper'>
			<Input
			  isRequired
			  label={words}
			  id={field.name}
			  color={meta.error ? 'danger' : 'default'}
			  {...props}
			  {...field}
			  type={!field.name.includes('assword') ? 'text' : viewPassword ? 'text' : 'password'}
			  autoComplete='false'
			/>
			<button type='button' onClick={handleShow} className='eye-button'>
			  {!viewPassword ? <EyeSlash /> : <EyeOpen />}
			</button>
		  </div>
	
		  <div className={`error-message ${meta.error ? 'visible' : 'hidden'} flex justify-center modern text-2xl`} >
				{meta.error}
			</div>
		</div>
	  );
};

export default InputFiledPassword;