import { Button, Input } from '@nextui-org/react'
import React from 'react'

const FormSection = ({isAddingQuestion, newQuestion, saveQuestion, cancelAddingQuestion, startAddingQuestion, setNewQuestion}) => {
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
								<div className='flex justify-center p-4 gap-5'>
								<Button onClick={saveQuestion} className='bg-success'>
									Guardar Pregunta
								</Button>
								<Button onClick={cancelAddingQuestion} className='bg-danger'>
									Cancelar
								</Button>
								</div>
							</div>
						) : (
							<Button onClick={startAddingQuestion} className='bg-danger-600 w-full'>
								Agregar Pregunta
							</Button>
						)}
    </>
  )
}

export default FormSection