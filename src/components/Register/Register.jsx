'use client';
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
	const [duplicatedEmail, setDuplicatedEmail] = useState(false);

	let [viewPassword, setViewPassword] = useState(false);
	let [viewPassword2, setViewPassword2] = useState(false);

	const handleShow = () => {
		setViewPassword(!viewPassword);
		console.log(viewPassword);
	};
	const handleShow2 = () => {
		setViewPassword2(!viewPassword2);
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
							console.log('se hizo true el estado');
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
								toastError(
									'Ya hay una cuenta existente con el email ingresado'
								);
							}
							toastError('Ocurrio un error al crear la cuenta');
						}
					}
				}}>
				{({ errors }) => (
					<CardBody className='body'>
						<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 flex flex-col space-y-5 items-center mx-auto mt-10 mb-10 bg-blue-100 p-10 rounded-lg justify-center'>
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

							<label htmlFor='country' className='text-black mb-5'>
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
								className='select text-medium  w-auto'
							/>

							{country && (
								<>
									<label className='text-black ' htmlFor='state'>
										State/Region:
									</label>
									<RegionDropdown
										country={country}
										value={region}
										id='state'
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
