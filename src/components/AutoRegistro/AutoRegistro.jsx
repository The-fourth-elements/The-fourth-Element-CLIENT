"use client"
import { useState } from "react";

const AutoRegistro = () => {
    const [questions, setQuestions] = useState ([{
        question: '',
        motivation: 0
    }])
    const [title, setTitle] = useState('')
    const [moduleId, setModuleId] = useState('')
    const [description, setDescription] = useState('')
    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }
    const handleAddQuestion = () => {
        const newQuestions = [
            ...questions,
            {
                question: '',
                motivation: 0
            }
        ]
        setQuestions(newQuestions)
    }

    const handleDeleteQuestion = (index) => {
        const newQuestions = [...questions]
        newQuestions.splice(index, 1)
        setQuestions(newQuestions)
    }

    const handleWriteQuestion = (text, index) => {
        const newQuestions = [...questions]
        newQuestions[index].question = text
        setQuestions(newQuestions)
        }

    const handleChangeMotivation = (number, index) => {
            const newQuestions = [...questions]
            newQuestions[index].motivation = +number
            setQuestions(newQuestions)
            }
    
    const createAutoRegistro = () => {
        console.log('hola')
    }
    const [seleccion, setSeleccion] = useState(3);

  const handleSeleccion = (e) => {
    setSeleccion(parseInt(e.target.value, 10));
  };
    const opciones = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];
    return (
        <main>
            <header>
            <h1>Crear Autorregistro</h1>
                <input
                        type='text'
                        placeholder='Título del Autorregistro'
                        value={title}
                        onChange={handleChangeTitle}
                    />
                <input
                        type='text'
                        placeholder='Descripcion del Autorregistro'
                        value={description}
                        onChange={handleChangeDescription}
                    />    
            </header>
            <article>
                {
                    questions.map((pregunta, index) =>  (
                        <section>
                            <h3>Pregunta {index + 1}</h3>
                            <input
							className='input'
							type='text'
							placeholder='Escribe una pregunta'
							value={pregunta?.question}
							onChange={e =>
								handleWriteQuestion(e?.target?.value, index)
							}
						/>
                             <input
                                type="range"
                                min="1"
                                max="5"
                                step="1"
                                value={seleccion}
                                onChange={handleSeleccion}
                                list="opciones"
                            />
                            <datalist id="opciones">
        {opciones.map((opcion, index) => (
          <option key={index} value={index + 1}>
            {opcion}
          </option>
        ))}
      </datalist>
      <p>Seleccion: {opciones[seleccion - 1]}</p>

                        </section>
                    ))
                }
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