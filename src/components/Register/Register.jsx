'use client';
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { toastError, toastSuccess } from '@/helpers/toast';
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
						toastSuccess(response.message);
						router.push('/');
					} catch (error) {
						if (error.message.includes('duplicate')) {
							toastError('Email ya en uso');
						}
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='Form'>
							<div className='group'>
								<InputField
									type='string'
									name='username'
									placeholder='Ingrese su nombre'
								/>
							</div>

							<div className='group'>
								<InputField
									type='string'
									name='email'
									placeholder='Ingrese su email'
								/>
							</div>

							<div className='group'>
								<InputField
									type='string'
									name='password'
									placeholder='Ingrese su contraseña'
								/>
							</div>

							<div className='group'>
								<InputField
									type='string'
									name='repeatPassword'
									placeholder='Repita su contraseña'
								/>
							</div>

							<div className='group'>
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
