'use client';
import { EyeOpen, EyeSlash } from '../loginForm/eyeIcons';
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { toastError, toastSuccess } from '../../helpers/toast';
import './styles.scss';
import { handleSubmitRegister } from '../../helpers/handlers';
import { registerSchema, initialValues } from '../../helpers/validations';
import { useRouter } from 'next/navigation';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import InputField from '../../helpers/InputField';
import InputFieldPassword from '@/helpers/InputFieldPassword';
import { Button, Card, CardBody } from '@nextui-org/react';

const Register = ({ toogleDisplay }) => {
	const router = useRouter();
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	let [viewPassword, setViewPassword] = useState(false)
	let [viewPassword2, setViewPassword2] = useState(false)


	const handleShow = () => {
		setViewPassword(!viewPassword)
		console.log(viewPassword)
	}
	const handleShow2 = () => {
		setViewPassword2(!viewPassword2)
		
	}

	return (
		<Card className='Main text-4xl'>
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
						if(!response.error){
							toastSuccess("cuenta creada con exito");
							window.location.reload();
							console.log(values)
						}

					} catch (error) {
						if (error) {
							toastError('Ocurrio un error al crear la cuenta');
						}
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='Form'>
							<div className='group text-white'>
								<InputField
									type='string'
									name='username'
									placeholder='Ingrese su nombre'
								/>
							</div>

							<div className='group text-white'>
								<InputField
									type='string'
									name='email'
									placeholder='Ingrese su email'
								/>
							</div>

							<div className='group text-white'>
								<InputFieldPassword
									type={viewPassword ? 'text' : 'password'}
									name='password'
									placeholder='Ingrese su contraseña'
									viewPassword = {viewPassword}
									handleShow={handleShow}

								/>
								
							</div>

							<div className='group text-white'>
								<InputFieldPassword
									type={viewPassword2 ? 'text' : 'password'}
									name='repeatPassword'
									placeholder='Repita su contraseña'
									viewPassword = {viewPassword2}
									handleShow={handleShow2}

								/>
								
							</div>

							<div className='group '>
								<label htmlFor='country' className=''>
									Country:
								</label>
								<CountryDropdown
									name='country'
									autoComplete='on'
									id='country'
									value={country}
									onChange={val => {
										setCountry(val);
										setRegion('');
									}}
									className='select'
								/>
							</div>

							{country && (
								<div className='group'>
									<label htmlFor='state'>State/Region:</label>
									<RegionDropdown
										country={country}
										value={region}
										id='state'
										onChange={val => setRegion(val)}
										className='group-select'
									/>
									<ErrorMessage name='state' component='span' className='' />
								</div>
							)}
							<span onClick={toogleDisplay} className='toogle text-2xl'>
								¿Ya tienes una cuenta?
							</span>
							<Button type='submit' className='submit'>
								Register
							</Button>
						</Form>
					</CardBody>
				)}
			</Formik>
		</Card>
	);
};

export default Register;
