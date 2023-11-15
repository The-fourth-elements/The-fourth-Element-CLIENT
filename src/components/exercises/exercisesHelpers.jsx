import TextAreaField from '@/helpers/TextAreaField';
import { toastSuccess, toastError } from '@/helpers/toast';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { getCookie } from 'cookies-next';

export const renderExercises = (exerciseIndex, elem, handleExerciseClick) => {
	return (
		<AccordionItem
		className='p-3'
			key={exerciseIndex}
			textValue={elem?.name}
			title={elem?.name}>
			<div className='flex justify-between items-center'>
				<Button
					className='cursor-pointer rounded-full'
					onPress={() => handleExerciseClick(elem)}>
					Entrar
				</Button>
			</div>
		</AccordionItem>
	);
};

const handleSubmit = async (values, exerciseId, questionsLength) => {
	try {


		const userId = getCookie('jsdklfsdjklfdsjfds');

		const answersArray = Object.values(values).filter(value => value.length > 0);


		if (questionsLength > answersArray.length) {
			throw new Error(`Debe responder todas las preguntas`);
		}

		const response = await fetch(
			`${process.env.API_BACKEND}responseEx/${exerciseId}/user/${userId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ responses: answersArray }),
			}
		);

		if (response.ok) {
			const responseData = await response.json();
			toastSuccess(responseData.message);
		} else {
			const errorData = await response.json();
			toastError(`Error: ${errorData.message}`);
		}
	} catch (error) {
		toastError(error.message);
	}
};




export const renderTextSection = (exercise, userResponses) => {
	return exercise?.questions ? (
		<Formik
		
			initialValues={exercise?.questions.reduce((acc, _, index) => {
				acc[`answer_${index}`] = userResponses[index]?.response || '';
				return acc;
			}, {})}
			onSubmit={values => handleSubmit( values, exercise._id, exercise?.questions?.length)}>

			<Form className=' flex flex-col'>
				<Accordion defaultExpandedKeys={['0']}>
					{exercise?.questions.map((elem, index) => (
						<AccordionItem
							key={index}
							textValue={elem}
							title={elem}
							className=''
							classNames={{ title: 'p-2 px-4 bg-secondary-700 w-fit rounded-lg', heading: 'pl-5' }}>
							<TextAreaField
								className='p-5 rounded-none'
								name={`answer_${index}`} // Agregar un identificador único
								label='Respuesta'
								labelPlacement='inside'
								placeholder='Escribe tu respuesta aquí'
							/>
						</AccordionItem>
					))}
				</Accordion>
				<Button
					className='w-fit px-3 py-1 m-0 mb-5 mx-auto bg-green-600 hover-bg-green-800'
					type='submit'>
					Guardar respuestas
				</Button>
			</Form>
		</Formik>
	) : (
		<h1 className='p-8'>Seleccione un ejercicio para responder</h1>
	);
};
