'use client';


import './style.scss';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import InputField from '@/helpers/InputField';
import SelectField from '@/helpers/SelectField';
import '@/helpers/CustomComponentsStyles.scss';
import { validationSchemaModule } from '@/helpers/validations';
import { toastError, toastSuccess } from '@/helpers/toast';
import Image from 'next/image';
import back from '@/assets/svg/arrowBack.svg';
import { useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import { postData } from '@/hooks/postData';


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

		try {
			
			const postResponse = await postData(`${process.env.API_BACKEND}moduls`, formattedValues)
			if (postResponse._id) {
				toastSuccess('¡Se subió el módulo!');
				
			}
			console.log("postResponse " , postResponse);
		} catch (error) {
			toastError('No se pudo subir el módulo, intente mas tarde')
		}

		
	};

	return ( //Form className='relative flex flex-col h-50vh  w-1/2 items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'
		<Card className=' relative min-h-screen modern  h-50vh text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesModule}
					validationSchema={validationSchemaModule}
					onSubmit={handleSubmit}>
					<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 space-y-5  flex flex-col mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg justify-center'>

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

						<h1 className='mx-auto mb-5 text-black' >Agregar Módulo</h1>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'
							label='Nombre del Módulo'
							name='name'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'

							label='Descripcion del Módulo'
							name='description'
						/>

						<InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'

							label='Quiz'
							name='quiz'
						/>

						<SelectField
							isRequired
							className='mb-5'

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
							className='bg-gradient-to-tr from-blue-500 rounded-lg submit max-w-xs  mx-auto'>
							Agregar modulo
						</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
};

export default ModuleForm;
