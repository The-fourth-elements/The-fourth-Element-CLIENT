import { Button, Input } from '@nextui-org/react';
import React from 'react';

const FormSection = ({
	isAddingQuestion,
	newQuestion,
	saveQuestion,
	cancelAddingQuestion,
	startAddingQuestion,
	setNewQuestion,
	currentForm,
	setIsAddingQuestion,
	setForm,
}) => {
	return (
		<>
			{isAddingQuestion ? (
				<div>
					<Input
						type='text'
						placeholder='Ingrese la pregunta'
						value={newQuestion}
						onChange={e => setNewQuestion(e.target.value)}
					/>
					<div className='flex flex-wrap justify-center p-4 gap-5'>
						<Button
							onClick={() => {
								saveQuestion(
									currentForm,
									newQuestion,
									setIsAddingQuestion,
									setNewQuestion,
									setForm
								);
							}}
							className='bg-green-700 rounded-lg'>
							Guardar Pregunta
						</Button>
						<Button onClick={cancelAddingQuestion} className='bg-danger rounded-lg'>
							Cancelar
						</Button>
					</div>
				</div>
			) : (
				<Button onClick={startAddingQuestion} className='bg-primary-500 w-fit px-5 mx-auto rounded-lg'>
					Agregar Pregunta
				</Button>
			)}
		</>
	);
};

export default FormSection;
