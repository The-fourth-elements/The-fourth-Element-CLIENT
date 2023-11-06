'use client';
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { toastError, toastSuccess } from '../../helpers/toast';
import SelectField from '@/helpers/SelectField';
import { deportes } from '@/utils/dataRegister';
import './styles.scss';
import { handleSubmitRegister } from '../../helpers/handlers';
import { registerSchema, initialValues } from '../../helpers/validations';
import InputField from '../../helpers/InputField';
import InputFieldPassword from '@/helpers/InputFieldPassword';
import { Button, Card, CardBody } from '@nextui-org/react';
import {
	AnimatedCountryDropdown,
	AnimatedRegionDropdown,
} from '../animated-components/DropdownSelectorRegion';

const Register = ({ toogleDisplay }) => {
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');

	let [viewPassword, setViewPassword] = useState(false);
	let [viewPassword2, setViewPassword2] = useState(false);

	const handleShow = () => {
		setViewPassword(!viewPassword);
	};
	const handleShow2 = () => {
		setViewPassword2(!viewPassword2);
	};

	return (
		<Card className='text-4xl InputMono'>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema(country, region)}
				onSubmit={async values => {
					try {
						const response = await handleSubmitRegister(
							values,
							country,
							region
						);
						if (response?.success) {
							toastSuccess(response.success);
							toogleDisplay();
						}
					} catch (error) {
						toastError(error?.message);
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col items-center mx-auto  space-y-5 mt-10 mb-10  p-10 rounded-lg justify-center bg-[#F29222]'>
							<InputField
								type='string'
								name='username'
								placeholder='Ingrese su nombre'
								className='mb-3'
							/>

							<InputField
								type='string'
								name='email'
								placeholder='Ingrese su email'
								className='mb-3'
							/>

							<InputFieldPassword
								type={viewPassword ? 'text' : 'password'}
								name='password'
								placeholder='Ingrese su contraseña'
								viewPassword={viewPassword}
								handleShow={handleShow}
								className='mb-3'
							/>

							<InputFieldPassword
								type={viewPassword2 ? 'text' : 'password'}
								name='repeatPassword'
								placeholder='Repita su contraseña'
								viewPassword={viewPassword2}
								handleShow={handleShow2}
								className='mb-3'
							/>
							<InputField
								type='number'
								name='edad'
								placeholder='Ingrese su edad'
							/>
							<InputField
								type='number'
								name='experiencia'
								placeholder='Ingrese sus años de experiencia'
							/>
							<SelectField
								options={deportes}
								name={'deporte'}
								label={'deporte'}></SelectField>

							<label htmlFor='country' className='text-black mb-10'>
								País:
							</label>
							<AnimatedCountryDropdown
								className={'select'}
								onChange={val => {
									setCountry(val);
									setRegion('');
								}}
								country={country}
							/>

							{country && (
								<>
									<label className='text-black ' htmlFor='state'>
										Estado/Region:
									</label>
									<AnimatedRegionDropdown
										country={country}
										value={region}
										onChange={val => setRegion(val)}
										className='select mt-10 group-select max-w-full text-white'
									/>
									<ErrorMessage name='state' component='span' className=' ' />
								</>
							)}
							<span
								onClick={toogleDisplay}
								className='toogle text-2xl text-black hover:cursor-pointer underline mt-5 mb-5'>
								¿Ya tienes una cuenta?
							</span>
							<Button type='submit' className='rounded-lg mb-12 p-7 bg-[#C4161C] text-lg min-w-[12.5rem]'>
								REGISTRAR
							</Button>
						</Form>
					</CardBody>
				)}
			</Formik>
		</Card>
	);
};

export default Register;
