import TextAreaField from '@/helpers/TextAreaField';
import { toastSuccess, toastError } from '@/helpers/toast';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { useState } from 'react';
import { getCookie } from 'cookies-next';


export const renderExercises = (exerciseIndex, elem, handleExerciseClick) => {
	return (
		<AccordionItem
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

const handleSubmit = async (values, exerciseId) => {
	try {
	  const userId = getCookie('jsdklfsdjklfdsjfds');
  
	  const answersArray = Object.keys(values).map(key => values[key]);
  
	  const response = await fetch(`${process.env.API_BACKEND}responseEx/${exerciseId}/user/${userId}`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ responses: answersArray }),
	  });
  
	  if (response.ok) {
		const responseData = await response.json();
		toastSuccess(responseData.message);
	  } else {
		const errorData = await response.json();
		toastError(`Error: ${errorData.message}`);
	  }
	} catch (error) {
	  console.log(error.message);
	  toastError('Error ', error.message);
	}
  };
  

export const renderTextSection = (exercise) => {
	
	return exercise?.questions ? (
		<Formik
			initialValues={exercise?.questions.reduce((acc, _, index) => {
				acc[`answer_${index}`] = '';
				return acc;
			}, {})}
			onSubmit={values => handleSubmit(values, exercise._id)}>
			<Form className='flex flex-col'>
				<Accordion defaultExpandedKeys={['0']}>
					{exercise?.questions.map((elem, index) => (
						<AccordionItem
							key={index}
							textValue={elem}
							title={elem}
							classNames={{ title: 'p-4' }}>
							<TextAreaField
								isRequired
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
