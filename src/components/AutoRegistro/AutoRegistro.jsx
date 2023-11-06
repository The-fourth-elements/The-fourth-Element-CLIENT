"use client"
import './AutoRegistro.scss'
import { useState, useEffect } from "react";
import { useAutoRegistro } from "@/zustand/store/autoRegistroStore";
import { useModulesStore } from "@/zustand/store/modulesStore";
import { Button, useDisclosure, Select, SelectItem, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";

const AutoRegistro = () => {
    const {modules, getModules} = useModulesStore()
    const {createAutoRegistro} = useAutoRegistro()
    const [moduleId, setModuleId] = useState('')
    const [selfRegister, setSelfRegister] = useState ([{
        name: '',
        type: '',
        questions: [{
            selfQuestion: '',
        agree: '',
        disagree: ''
        }]     
    }])

    useEffect(() => {
		getModules()
	}, [])

    const handleSelect = (e) => {
		setModuleId(e?.target?.value)
	}

    const handleAddSection = () => {
        const newSection = [
            ...selfRegister,
            {
                name: '',
                type: '',
                questions: [{
                    selfQuestion: '',
                agree: '',
                disagree: ''
                }]
            }
        ]
        setSelfRegister(newSection)
    }

    const handleAddQuestion = (index) => {
        const newRegister = [...selfRegister]
        const newQuestion = {
            selfQuestion: '',
            agree: '',
            disagree: ''
        }
        newRegister[index]?.questions.push(newQuestion)
        setSelfRegister(newRegister)
    }

    const handleDeleteSection = (index) => {
        const newRegister = [...selfRegister]
        newRegister.splice(index, 1)
        setSelfRegister(newRegister)
    }

    const handleDeleteQuestion = (index, indexQuestion) => {
        const newRegister = [...selfRegister]
        newRegister[index].questions.splice(indexQuestion, 1)
        setSelfRegister(newRegister)
    }

    const handleWriteName = (text, index) => {
        const newRegister = [...selfRegister]
        newRegister[index].name = text
        setSelfRegister(newRegister)
    }

    const handleWriteType = (text, index) => {
        const newRegister = [...selfRegister]
        newRegister[index].type = text
        setSelfRegister(newRegister)
    }

    const handleWriteQuestion = (text, index, indexQuestion) => {
        const newRegister = [...selfRegister]
        newRegister[index].questions[indexQuestion].selfQuestion = text
        setSelfRegister(newRegister)
        }
    
    const handleWriteAgree = (text, index, indexQuestion) => {
        const newRegister = [...selfRegister]
        newRegister[index].questions[indexQuestion].agree = text
        setSelfRegister(newRegister)
    }

    const handleWriteDisgree = (text, index, indexQuestion) => {
        const newRegister = [...selfRegister]
        newRegister[index].questions[indexQuestion].disagree = text
        setSelfRegister(newRegister)
    }
    
    const saveAutoRegistro = () => {
        const newSelfRegister = {
            selfRegister
        }
        createAutoRegistro(newSelfRegister, moduleId)
    }

 
    return (
        <main>
            
            <h1>Crear Autorregistro</h1>
            <article>
                {selfRegister.map((section, index) => (
                    <section className='sectionContainer' key={index}>
                        <h3>Seccion {index + 1}</h3>
                        <input type="text"
                        placeholder="Nombre de la seccion"
                        value={section.name}
                        onChange={e => handleWriteName(e?.target?.value, index)}
                        className='nameInput'
                        />
                        <input type="text"
                        placeholder="Tipo de la seccion"
                        value={section.type}
                        onChange={e => handleWriteType(e?.target?.value, index)}
                        />
                        { section.questions.map((questions, indexQuestion) => (
                            <section className='sectionQuestions' key={indexQuestion}>
                                 <input type="text" 
                                placeholder="Question"
                                value={questions.selfQuestion}
                                onChange={e => handleWriteQuestion(e?.target?.value, index, indexQuestion)}/>
                                <input type="text" 
                                placeholder="Agree"
                                value={questions.agree}
                                onChange={e => handleWriteAgree(e?.target?.value, index, indexQuestion)}/>
                                <input type="text" 
                                placeholder="Disagree"
                                value={questions.disagree}
                                onChange={e => handleWriteDisgree(e?.target?.value, index, indexQuestion)}/>
                                
                                <button onClick={() => handleDeleteQuestion(index, indexQuestion)}>
                                    Eliminar Pregunta
                                </button>
                            </section>
                        ))
                        
                        }
                        <button className='addQuest' onClick={() => handleAddQuestion(index)}>Agregar Pregunta</button>
                        <button onClick={() => handleDeleteSection(index)}>Eliminar Seccion</button>
                    </section>
                ))}
                <button onClick={handleAddSection}>Agregar Seccion</button>

                <button onClick={() => saveAutoRegistro()}>Crear Auto-Registro</button>

                <Select
					label='Modulos'
					placeholder='Seleccione un modulo'
					className='md:max-w-[12rem] max-w-xs '
					onChange={handleSelect}>
					{modules.length > 0 &&
						modules.map(modulo => (
							<SelectItem key={modulo._id} value={modulo._id}>
								{modulo.name}
							</SelectItem>
									))}
				</Select>
            </article>

        </main>
    )
}

export default AutoRegistro;

// {
// ”questions”: [
//     ””, “”, “etc”
// ],     
// messages: [
//     {”agree”: “motivado”, “disagree”: “No muy motivado”},
//     {”agree”: “motivado”, “disagree”: “No muy motivado”}, 
//     {”agree”: “motivado”, “disagree”: “No muy motivado”}
// ]}
// type Range = 0 | 1 | 2 | 3 | 4 
// {
//     questions: [
//         {    ejemplo:
//             question: ¿Que tan motivado te sentiste hoy?,
//             motivation: 4 por que se sintio muy motivado
//         },
//         {
//             question: string,
//             motivation: Range  0 nada motivado y 4 muy motivado
//         },
//         {
//             question: string,
//             motivation: Range  0 nada motivado y 4 muy motivado
//         }

//     ]
// }