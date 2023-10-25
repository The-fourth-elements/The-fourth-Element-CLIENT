"use client"
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import "./FormFrases.scss"
import { useExcersices } from "@/zustand/store/ExcersicesStore";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const FormFrases = ({handleSaveForm, ...props}) => {
	// const {createExcersices} = useExcersices()
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [title, setTitle] = useState("")
    const [fraseData, setFraseData] = useState([""
    ])

    const handleTitleChange = e => {
		setTitle(e?.target?.value);
	};

    const handleFraseChange = (text, fraseIndex) => {
		const newFraseData = [...fraseData];
		newFraseData[fraseIndex] = text;
		setFraseData(newFraseData);
	};

    const handleDeleteFrase = fraseIndex => {
		const newFraseData = [...fraseData];
		newFraseData.splice(fraseIndex, 1);
		setFraseData(newFraseData);
	};
    const handleAddFrase = () => {
		const newFraseData = [
			...fraseData,
			""
		];
		setFraseData(newFraseData);
	};

    // const handleSaveForm = () => {
		
	// 	const filteredFraseData = fraseData.filter((frase) => frase !== "" )
	// 	const theFrasesData = {
	// 		name: title,
	// 		excersices: filteredFraseData,
	// 	};

	// 	// update
	// 	// 	? updateQuiz(questionnaireData, idQuiz)
	// 	// 	: createQuiz(questionnaireData);
	// 	// onClose();
    //     console.log(theFrasesData)
	// };

    return(
		<Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
		<ModalContent>
			{(onClose) => (
			<ModalBody>
			<article className="mainFrasesRender">
				<h1>Crear Ejercicio</h1>
			<input className="titleInput" placeholder="Titulo pasa los ejercicios" value={title} onChange={handleTitleChange} type="text" />
			<section className="sectionFrases" >
					{fraseData.map((frase, fraseIndex) => (
						<div className="divFrase" key={fraseIndex}>
							<label>Frase {fraseIndex + 1}</label>
							<input
								type='text'
								placeholder='Nueva frase'
								value={frase}
								onChange={e =>
									handleFraseChange(e?.target?.value, fraseIndex)
								}
							/>
							
								<Button
									onClick={() => handleDeleteFrase(fraseIndex)}
									className='bg-danger-400 deleteButton'>
									Eliminar Frase
								</Button>
						</div>
					))}
					<Button className='p-7 mb-5 text-xl addFrase' onClick={handleAddFrase}>
					Agregar Frase
				</Button>

				<Button
					className='p-7 bg-background text-xl saveExcersice'
					onClick={handleSaveForm}>
					Guardar Ejercicio
				</Button>
				</section> 
				
			</article>
			</ModalBody>)}
		</ModalContent>
		</Modal>
    )
}

export default FormFrases;