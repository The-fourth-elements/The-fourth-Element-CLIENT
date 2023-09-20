'use client';
import { useState } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import './styles.scss';
import { handleSubmitRegister } from '../../helpers/handlers';
import { registerSchema, initialValues } from '../../helpers/validations';
import { useRouter } from 'next/navigation';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import InputField from '../../helpers/InputField';

const Register = ({ toogleDisplay }) => {
	const router = useRouter();
	const [country, setCountry] = useState('');
	const [region, setRegion] = useState('');

	return (
		<main className='Main__Register'>
			<Formik
				initialValues={initialValues}
				validationSchema={registerSchema(country, region)}
				onSubmit={async values => {
					await handleSubmitRegister(values, country, region);
					router.push('/');
				}}>
				{({ errors }) => (
					<Form className='Main__Register__Form'>
						<h1 className='Main__Form--title'>SignUp</h1>
						<div className='Main__Register__Form--group'>
							<label
								htmlFor='username'
								className='Main__Register__Form--group--label'>
								Username:
							</label>
							<InputField type='string' name='username' placeholder="Ingrese su nombre" />
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='email'
								className='Main__Register__Form--group--label'>
								Email:
							</label>
							<InputField type='string' name='email' placeholder="Ingrese su email" />
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='password'
								className='Main__Register__Form--group--label'>
								Password:
							</label>
							<InputField type='string' name='password' placeholder="Ingrese su contraseña" />
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='repeatPassword'
								className='Main__Register__Form--group--label'>
								Repeat Password:
							</label>
							<InputField type='string' name='repeatPassword' placeholder="Repita su contraseña"/>
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='country'
								className='Main__Register__Form--group--label'>
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
								className='Main__Register__Form--group--input'
							/>
						</div>

						{country && (
							<div className='Main__Register__Form--group'>
								<label
									htmlFor='state'
									className='Main__Register__Form--group--label'>
									State/Region:
								</label>
								<RegionDropdown
									country={country}
									value={region}
									id='state'
									onChange={val => setRegion(val)}
									className='Main__Register__Form--group--input'
								/>
								<ErrorMessage
									name='state'
									component='span'
									className='Main__Register__Form--group--error'
								/>
							</div>
						)}
						<span onClick={toogleDisplay} className='toogle'>
							¿Ya tienes una cuenta?
						</span>
						<button type='submit' className='Main__Register__Form--button'>
							Register
						</button>
					</Form>
				)}
			</Formik>
		</main>
	);
};

export default Register;
