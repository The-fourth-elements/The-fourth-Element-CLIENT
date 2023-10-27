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

const FormCreator = () => {
	const [form, setForm] = useState({
		id: 0,
		name: '',
		description: '',
		questions: [],
	});
	const [accumulatorData, setAccumulatorData] = useState([]);
	const [isAddingQuestion, setIsAddingQuestion] = useState(false);
	const [newQuestion, setNewQuestion] = useState('');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const addNewSection = () => {
		if (form.name && form.description) {
			setAccumulatorData([...accumulatorData, form]);
			setForm({ id: form.id + 1, name: '', description: '', questions: [] });
		}
	};
	const addQuestion = (sectionName, question) => {
		const updatedForm = { ...form };
		const sectionIndex = form.questions.findIndex(
			section => section.name === sectionName
		);
		if (sectionIndex === -1) {
			updatedForm.questions.push(question);
		} else {
			updatedForm.questions[sectionIndex].questions.push(question);
		}
		setForm(updatedForm);
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

	const saveQuestion = () => {
		if (form.name && form.description && newQuestion.length > 0) {
			addQuestion(form.name, newQuestion);
			setIsAddingQuestion(false);
			setNewQuestion('');
		}
	};
	const handleClearSections = () => {
		setAccumulatorData([]);
		setForm({
			id: 0,
			name: '',
			description: '',
			questions: [],
		});
	};
	return (
		<>
			<Card className='min-h-[20vh] max-h-[80vh] overflow-auto'>
				<CardHeader className='flex justify-center'>
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
							startAddingQuestion={startAddingQuestion}
							setNewQuestion={setNewQuestion}
						/>
					</form>
					<div className='flex align-middle justify-between mt-5'>
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
				</CardBody>
			</Card>
		</>
	);
};

export default FormCreator;
