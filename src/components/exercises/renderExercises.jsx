import { toastSuccess, toastError } from '@/helpers/toast';
import { Accordion, AccordionItem, Textarea, Button } from '@nextui-org/react';
import { Formik, Form } from 'formik';

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

export const renderTextSection = (questions) => {
	return (
	  questions ? (
		<Accordion  defaultExpandedKeys={["0"]}>
		  {questions.map((elem, index) => (
			<AccordionItem  key={index} textValue={elem} title={elem} classNames={{title : "p-4"}}>
			  <Formik
				initialValues={{ answer: '' }}
				onSubmit={async (values, { resetForm }) => {
				  try {
					console.log(values);
					// Agrega aquí la lógica para enviar la respuesta al servidor.
					// values.answer contiene la respuesta ingresada por el usuario.
					// Puedes usar un método como postData para enviar los datos al servidor.
  
					// Después de un envío exitoso, puedes realizar acciones como mostrar una notificación o limpiar el formulario.
					toastSuccess('Respuesta enviada con éxito');
				  } catch (error) {
					toastError('Error al enviar la respuesta. Inténtalo de nuevo.');
				  }
				}}
			  >
				{(formikProps) => (
				  <Form className='flex flex-col'>
					<Textarea
					  isRequired
					  classNames={{ label: 'text-white text-lg' }}
					  className='p-5'
					  name='answer'
					  label='Respuesta'
					  labelPlacement='inside'
					  placeholder='Escribe tu respuesta aquí'
					/>
					<Button
					  className='w-fit px-3 py-1 m-0 mb-5 mx-auto bg-green-600 hover-bg-green-800'
					  type='submit'
					>
					  Guardar respuesta
					</Button>
				  </Form>
				)}
			  </Formik>
			</AccordionItem>
		  ))}
		</Accordion>
	  ) : (
		<h1 className='p-8'>Seleccione un ejercicio para responder</h1>
	  )
	);
  };
  

