'use client';

import './style.scss';
import { Card, CardBody, Button, Select, SelectItem, useDisclosure } from '@nextui-org/react';
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
import { postData } from '@/hooks/fetchData';
import FormFrases from '../FormFrases/FormFrases';
import { useState, useEffect } from 'react';
import { useExcersices } from '@/zustand/store/ExcersicesStore';

const ModuleForm = () => {
	const router = useRouter();
	const [frasesModal, setFrasesModal] = useState(false)
	const [createEjercicio, setCreateEjercicio] = useState(false)
	const [exercisesId, setExercisesId] = useState("")
	// const [excersicesValue, setExcersicesValue] = useState("")
	const {getAllExcersices, AllExersices, getFrases, addExcersiceToModule, update, setUpdate} = useExcersices()
	// const handleFileChange = event => {
	// 	const fileInput = event.target;
	// 	const isVideo = fileInput.files.length > 0 &&
	// 		fileInput.files[0].type.startsWith('video/');
	// 	if (!isVideo) {
	// 		fileInput.value = '';
	// 	}
	// };

	useEffect(() => {
		getAllExcersices()

		if(update){
			getAllExcersices()
			setUpdate()
		}
	}, [update])

	const handleFrasesModal = () => {
		setFrasesModal(!frasesModal)
	}

	const handleSelect = event => {
		setExercisesId(event.target.value);
	};

	const initialValuesModule = {
		name: '',
		description: '',
		paid: '',
	};

	const optionsSelect = [
		{ label: 'Sí', value: true },
		{ label: 'No', value: false },
	];

	const handleSubmit = async values => {
		const formattedValues = {
			...values,
			paid: values.paid === 'true' ? true : false,
			// quiz: parseInt(values.quiz),
		};
		

		try {
			const postResponse = await postData(
				`${process.env.API_BACKEND}moduls`,
				formattedValues
			);

			

			if(exercisesId !== "" && createEjercicio){
				
				const addExcersice = {
				exercisesId,
				moduleId: postResponse?._id
			}
				addExcersiceToModule(addExcersice)
			}
			
			if (postResponse?._id) {
				toastSuccess('¡Se subió el módulo!');
			}
		} catch (error) {
			toastError('No se pudo subir el módulo, intente mas tarde');
		}
	};

	return (
		//Form className='relative flex flex-col h-50vh  w-1/2 items-center mx-auto  mt-10 mb-10 bg-blue-100 p-10 rounded-lg'
		<Card className=' relative min-h-screen modern  h-50vh text-4xl'>
			<CardBody>
				<Formik
					initialValues={initialValuesModule}
					validationSchema={validationSchemaModule}
					onSubmit={handleSubmit}>
					<Form className='claseForm relative sm:w-full md:w-3/4 lg:w-1/2 space-y-5  flex flex-col mx-auto  mt-10 mb-10 bg-primary-500 p-10 rounded-lg justify-center'>
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

						<h1 className='mx-auto mb-5 text-white '>Agregar Módulo</h1>

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

						{/* <InputField
							classNames={{
								label: 'text-xl',
							}}
							className='mb-5'

							label='Quiz'
							name='quiz'
						/> */}

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
						
						{createEjercicio ? 
						(<div
						className='showExcersice'>
							<div className='createExcersice'>
						{AllExersices?.length > 0 && <Select
								label='Ejercios'
								placeholder='Seleccione un ejercicio'
								className='md:max-w-[12rem] max-w-xs createExcersiceSize'
								onChange={handleSelect}>
								{AllExersices?.length > 0 &&
									AllExersices?.map(excersice => (
										<SelectItem key={excersice?._id} value={excersice?._id}>
											{excersice?.name}
										</SelectItem>
									))}
							</Select>}
						<Button
								onClick={handleFrasesModal}
								class='transition-all bg-background text-lg rounded-lg max-w-xs hover:bg-primary p-5 py-3 createExcersiceSize'>
								Crear Ejercicio
							</Button>
							</div>
							<p className='showButtonsExcersice' onClick={() => setCreateEjercicio(!createEjercicio)}>¿No deseas agregar un ejercicio?</p>
							
							</div>)
							:
							<div className='createExcersice'>
							<p className='showButtonsExcersice' onClick={() => setCreateEjercicio(!createEjercicio)}>¿Deseas agregar un ejercicio?</p>
							</div>
							}
							{frasesModal &&<FormFrases
								isOpen={true}
								handleFrasesModal= {handleFrasesModal}
							/>}

						<Button
							type='submit'
							size='lg'
							className='bg-background rounded-lg submit max-w-xs  mx-auto hover:bg-primary'>
							Agregar modulo
						</Button>
					</Form>
				</Formik>
			</CardBody>
		</Card>
	);
};

export default ModuleForm;
