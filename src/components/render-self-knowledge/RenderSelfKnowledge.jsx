'use client';
import React, { useState } from 'react';
import PreviewSelfSection from '../preview-self-knowledge/PreviewSelfSection';
import {
	Modal,
	ModalContent,
	ModalBody,
	ModalHeader,
	ModalFooter,
	Button,
} from '@nextui-org/react';

const RenderSelfKnowledge = ({ isOpen, onOpen, onOpenChange, data }) => {
	const [sectionPreview, setSectionPreview] = useState(0);
	const [disableBack, setDisableBack] = useState(false);
	const [disableNext, setDisableNext] = useState(false);
	const sections = data?.length;
	const handleSectionChange = nextOrBack => {
		const newPreview = sectionPreview + nextOrBack;
		if (newPreview >= 0 && newPreview < sections) {
			setSectionPreview(newPreview);
			setDisableBack(newPreview === 0);
			setDisableNext(newPreview === sections - 1);
		}
	};
    const initialAnswers = data?.map(section => section?.questions?.map(() => 0))
	const [answers, setAnswers] = useState(initialAnswers);

  // Función para manejar cambios en las respuestas
  const handleAnswerChange = (sectionIndex, questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[sectionIndex][questionIndex] = value;
    setAnswers(newAnswers);
  };
  const submitAnswers = ()=>{
    const answersReduced = answers.map((answer, index)=>{
        const sum =(answer.reduce((accumulator, current)=> Number(accumulator) + Number(current) , 0)) 
        const average = sum /   answers[index].length;
        return average
    });
  }
	return (
        <Modal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} size='4xl'>
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3 className='text-xl'>Autorregistro</h3>
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col max-h-full min-h-[30vh] justify-center h-[80vh] '>
                  <PreviewSelfSection
                    data={data[sectionPreview]}
                    answers={answers[sectionPreview]}
                    onAnswerChange={handleAnswerChange}
                    sectionIndex={sectionPreview}
                    render={true}
                  />
                </div>
              </ModalBody>
              <ModalFooter className='flex justify-between bg-black'>
                <div className='flex gap-6'>
                  <Button
                    onClick={() => {
                      handleSectionChange(-1);
                    }}
                    disabled={disableBack}
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={() => {
                      handleSectionChange(+1);
                    }}
                    disabled={disableNext}
                  >
                    Siguiente
                  </Button>
                </div>
                <div>
                    <Button onClick={submitAnswers}>Responder</Button>
                <Button onClick={onClose}>Cerrar</Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
	);
};

export default RenderSelfKnowledge;
