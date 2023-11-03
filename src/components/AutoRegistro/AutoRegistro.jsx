"use client"
import { useState } from "react";

const AutoRegistro = () => {
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
    
    const createAutoRegistro = () => {
        const completeAutoRegistro ={
            name: title,
            type: description,
            selfRegister: questions
        }
        
        console.log('hola')
    }

 
    return (
        <main>
            
            <h1>Crear Autorregistro</h1>
            <article>
                {selfRegister.map((section, index) => (
                    <section key={index}>
                        <h3>Seccion {index + 1}</h3>
                        <input type="text"
                        placeholder="Nombre de la seccion"
                        value={section.name}
                        onChange={e => handleWriteName(e?.target?.value, index)}
                        />
                        <input type="text"
                        placeholder="Tipo de la seccion"
                        value={section.type}
                        onChange={e => handleWriteType(e?.target?.value, index)}
                        />
                        { section.questions.map((questions, indexQuestion) => (
                            <section key={indexQuestion}>
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
                            </section>
                        ))
                        
                        }

                    </section>
                ))}
                <button onClick={handleAddSection}>click</button>
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