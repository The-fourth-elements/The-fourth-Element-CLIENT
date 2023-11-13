import TextAreaField from '@/helpers/TextAreaField';
import { toastSuccess, toastError } from '@/helpers/toast';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { useState } from 'react';

export const renderExercises = (exerciseIndex, elem, handleExerciseClick) => {
	return (
		<AccordionItem
			key={exerciseIndex}
			textValue={elem?.name}
			title={elem?.name}>
			<div className='flex justify-between items-center'>
				<Button
					className='cursor-pointer rounded-full'
					onPress={() => handleExerciseClick(elem?.questions)}>
					Entrar
				</Button>
			</div>
		</AccordionItem>
	);
};

const handleSubmit = async values => {
	try {
	  const answersArray = Object.keys(values).map(key => values[key]);
	  console.log('answersArray ', answersArray);
  
	  toastSuccess('Respuestas enviadas con éxito');
	} catch (error) {
	  console.log(error.message);
	  toastError('Error ', error.message);
	}
  };
  

export const renderTextSection = questions => {
	return questions ? (
		<Formik
			initialValues={questions.reduce((acc, _, index) => {
				acc[`answer_${index}`] = '';
				return acc;
			}, {})}
			onSubmit={values => handleSubmit(values)}>
			<Form className='flex flex-col'>
				<Accordion defaultExpandedKeys={['0']}>
					{questions.map((elem, index) => (
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
							<Button
								className='w-fit px-3 py-1 m-0 mb-5 mx-auto bg-green-600 hover-bg-green-800'
								type='submit'>
								Guardar respuesta
							</Button>
						</AccordionItem>
					))}
				</Accordion>
			</Form>
		</Formik>
	) : (
		<h1 className='p-8'>Seleccione un ejercicio para responder</h1>
	);
};
