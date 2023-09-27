'use client';

import './style.scss';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import '@/components/loginForm/style.scss';
import InputField from '@/helpers/InputField';
import SelectField from '@/helpers/SelectField';
import { validationSchemaModule } from '@/helpers/validations';
import Image from 'next/image';
import back from '@/assets/svg/arrowBack.svg';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';

const ModuleForm = () => {
	const router = useRouter();
	const handleFileChange = event => {
		const fileInput = event.target;
		const isVideo =
			fileInput.files.length > 0 &&
			fileInput.files[0].type.startsWith('video/');
		if (!isVideo) {
			fileInput.value = '';
		}
	};

	const initialValuesModule = {
		name: '',
		description: '',
		quiz: '',
		paid: '',
	};

	const optionsSelect = [
		{ label: 'Sí', value: true },
		{ label: 'No', value: false },
	];

	const handleSubmit = async values => {
		console.log(values);
		const formattedValues = {
			...values,
			paid: values.paid === 'true' ? true : false,
			quiz: parseInt(values.quiz),
		};

		console.log("formated values" , formattedValues);

		await fetch(`${process.env.API_BACKEND}moduls`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			  },
			body: JSON.stringify(formattedValues),
		});
	};

	return (
		<Card className=' relative min-h-screen modern  h-50vh text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesModule}
					validationSchema={validationSchemaModule}
					onSubmit={handleSubmit}>
					<Form className='relative flex flex-col h-50vh  w-1/2 items-center mx-auto space-y-3 mt-10 mb-10 bg-blue-100 p-10 rounded-lg'>
						<Image
							alt='go back arrow'
							src={back}
							width={40}
							className='z-10  cursor-pointer absolute top-2 left-2
                            rounded-md hover:bg-blue-300'
							onClick={() => {
								router.push('/dashboard');
							}}
						/>

						<h1>Agregar Módulo</h1>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							label='Nombre del Módulo'
							name='name'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							label='Descripcion del Módulo'
							name='description'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							label='Quiz'
							name='quiz'
						/>

						<SelectField
							isRequired
							className='mb-10'
							name='paid'
							label='Es pago?'
							options={optionsSelect.map(elem => ({
								key: elem,
								value: elem.value,
								text: elem.label,
							}))}
						/>

						<Button
							type='submit'
							size='lg'
							className='bg-gradient-to-tr from-blue-500 rounded-lg submit'>
							Agregar modulo
						</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
};

export default ModuleForm;
