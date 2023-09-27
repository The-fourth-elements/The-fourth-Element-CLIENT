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
import { Button, Card, CardBody } from '@nextui-org/react';

const Register = ({ toogleDisplay }) => {
	const router = useRouter();
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');
	const [duplicatedEmail, setDuplicatedEmail] = useState(false);

	let [viewPassword, setViewPassword] = useState(false);

	const handleShow = () => {
		setViewPassword(!viewPassword);
		console.log(viewPassword);
	};

	return (
		<Card className='Main text-4xl'>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema(country, region)}
				onSubmit={async values => {
					try {
						console.log(process.env.API_BACKEND);
						const response = await handleSubmitRegister(
							values,
							country,
							region
						);
						console.log('Response:  ', response);
						if (response.includes('duplicate')) {
							setDuplicatedEmail(true);
							throw new Error();
						} else {
							//	toastSuccess('cuenta creada con exito');
							// window.location.reload();
							console.log('Response valida:  ', response);
						}
					} catch (error) {
						if (error) {
							if (duplicatedEmail) {
								toastError('Ya hay una cuenta existente con el email ingresado');
							}
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
								<InputField
									type={viewPassword ? 'text' : 'password'}
									name='password'
									placeholder='Ingrese su contraseña'
									viewPassword={viewPassword}
								/>
							</div>

							<div className='group text-white'>
								<InputField
									type={viewPassword ? 'text' : 'password'}
									name='repeatPassword'
									placeholder='Repita su contraseña'
									viewPassword={viewPassword}
								/>
								<button type='button' onClick={handleShow}>
									{!viewPassword ? <EyeSlash /> : <EyeOpen />}
								</button>
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
