'use client';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './styles.scss';
import { handleSubmit } from './handlers';
import { registerSchema, initialValues } from './validations';
import { useRouter } from 'next/navigation';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

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
					const response = await handleSubmit(values, country, region);
					alert(JSON.stringify(response, null, 2));
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
							<Field
								type='text'
								id='username'
								autoComplete='on'
								placeholder='Enter your username'
								name='username'
								className='Main__Register__Form--group--input'
							/>
							<ErrorMessage
								name='username'
								compoennt='span'
								className='Main__Register__Form--group--error'
							/>
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='email'
								className='Main__Register__Form--group--label'>
								Email:
							</label>
							<Field
								type='email'
								autoComplete='on'
								id='email'
								placeholder='Enter your email'
								name='email'
								className='Main__Register__Form--group--input'
							/>
							<ErrorMessage
								name='email'
								compoennt='span'
								className='Main__Register__Form--group--error'
							/>
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='password'
								className='Main__Register__Form--group--label'>
								Password:
							</label>
							<Field
								id='password'
								type='password'
								placeholder='Enter your password'
								name='password'
								className='Main__Register__Form--group--input'
							/>
							<ErrorMessage
								name='password'
								compoennt='span'
								className='Main__Register__Form--group--error'
							/>
						</div>

						<div className='Main__Register__Form--group'>
							<label
								htmlFor='repeatPassword'
								className='Main__Register__Form--group--label'>
								Repeat Password:
							</label>
							<Field
								id='repeatPassword'
								type='password'
								placeholder='Repeat the password'
								name='repeatPassword'
								error={errors.repeatPassword}
								className='Main__Register__Form--group--input'
							/>
							<ErrorMessage
								name='repeatPassword'
								compoennt='span'
								className='Main__Register__Form--group--error'
							/>
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
									compoennt='span'
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
