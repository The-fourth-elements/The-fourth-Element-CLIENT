'use client';
import React, { useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Input,
	Textarea,
	useDisclosure,
} from '@nextui-org/react';
import FormSection from './FormSection';
import Question from './Question';
import PreviewSelf from '../preview-self-knowledge/PreviewSelf';
import SelectModule from '@/helpers/select-module/SelectModule';
import { addQuestion, saveQuestion } from './form-creator-self-knowledge';
import { postData } from '@/hooks/postData';
import { toastError, toastSuccess } from '@/helpers/toast';

const FormCreator = () => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		questions: [],
	});
	const [moduleSelected, setModuleSelected] = useState('');
	const [accumulatorData, setAccumulatorData] = useState([]);
	const [isAddingQuestion, setIsAddingQuestion] = useState(false);
	const [newQuestion, setNewQuestion] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const addNewSection = () => {
		if (form.name && form.description && form.questions.length !== 0) {
			setAccumulatorData([...accumulatorData, form]);
			setForm({ name: '', description: '', questions: [] });
		}
	};

	const handleChange = (e, property) => {
		setForm({ ...form, [property]: e.target.value });
	};

	const startAddingQuestion = () => {
		setIsAddingQuestion(true);
	};

	const cancelAddingQuestion = () => {
		setIsAddingQuestion(false);
		setNewQuestion('');
	};

	const handleClearSections = () => {
		setAccumulatorData([]);
		setForm({
			name: '',
			description: '',
			questions: [],
		});
		setModuleSelected('');
	};
	const handleSendKnowledge = async () => {
		try {
			if (moduleSelected !== '') {
				const form = {
					selfKnowledge: accumulatorData,
				}
				const response = await postData(
					`${process.env.API_BACKEND}selfK/${moduleSelected}`
				, form);
				if (response?.statusCode === 404) {
					throw Error(response?.message);
				}
				toastSuccess(response?.message);
				handleClearSections();
			}
		} catch (error) {
			toastError(error);
			toastError('no se pudo crear el autoconocimiento');
		}
	};

	return (
		<>
			<Card className='min-h-[30vh]'>
				<CardHeader className='flex justify-center '>
					<h3 className='text-xl'>{form.name}</h3>
				</CardHeader>
				<CardBody>
					<form className='flex justify-center flex-col gap-5'>
						<Input
							type='text'
							placeholder='Nombre de la sección'
							value={form.name}
							onChange={e => {
								handleChange(e, 'name');
							}}
						/>
						<Textarea
							placeholder='Descripción de la sección'
							value={form.description}
							onChange={e => {
								handleChange(e, 'description');
							}}
						/>
						{form.questions.length > 0 && (
							<Question form={form} setForm={setForm} />
						)}
						<FormSection
							cancelAddingQuestion={cancelAddingQuestion}
							isAddingQuestion={isAddingQuestion}
							newQuestion={newQuestion}
							saveQuestion={saveQuestion}
							currentForm={form}
							startAddingQuestion={startAddingQuestion}
							setNewQuestion={setNewQuestion}
							setIsAddingQuestion={setIsAddingQuestion}
							setForm={setForm}
						/>
					</form>
					<div className='flex align-middle justify-center gap-4 flex-wrap mt-5'>
						<Button onClick={addNewSection} className='bg-primary '>
							Agregar nueva sección
						</Button>
						<Button onClick={handleClearSections}>
							Limpiar todas las secciones
						</Button>
						{accumulatorData.length > 0 && (
							<>
								<Button onClick={onOpen}>Previsualizar</Button>
								<PreviewSelf
									isOpen={isOpen}
									onOpen={onOpen}
									onOpenChange={onOpenChange}
									data={accumulatorData}
								/>
							</>
						)}
					</div>
					<SelectModule moduleSelected={setModuleSelected} />
					<Button onClick={handleSendKnowledge} className='bg-primary-700'>
						Crear
					</Button>
				</CardBody>
			</Card>
		</>
	);
};

export default FormCreator;
