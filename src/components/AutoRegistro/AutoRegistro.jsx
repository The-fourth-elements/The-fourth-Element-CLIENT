"use client"
import './AutoRegistro.scss'
import { useState, useEffect } from "react";
import { useAutoRegistro } from "@/zustand/store/autoRegistroStore";
import { useModulesStore } from "@/zustand/store/modulesStore";
import { Select, SelectItem, Slider } from "@nextui-org/react";
import * as Yup from "yup";


const AutoRegistro = () => {
    const autoSchema = Yup.object().shape({
        selfRegister: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('El nombre de la sección es obligatorio'),
                type: Yup.string().required('El tipo de la sección es obligatorio'),
                questions: Yup.array().of(
                    Yup.object().shape({
                        selfQuestion: Yup.string().required('La pregunta es obligatoria'),
                        agree: Yup.string().required('La respuesta "agree" es obligatoria'),
                        disagree: Yup.string().required('La respuesta "disagree" es obligatoria'),
                    })
                ),
            })
        ),
    })
    const [errors, setErrors] = useState({})
    const width = window.innerWidth
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
    
    const saveAutoRegistro = async () => {
        try {
            await autoSchema.validate({ selfRegister }, { abortEarly: false });
            // Los datos son válidos, puedes enviarlos al servidor
            const newSelfRegister = { selfRegister };
            createAutoRegistro(newSelfRegister, moduleId);
        } catch (error) {
            // La validación falló, manejar los errores aquí
            const validationErrors = {};
            error.inner.forEach((err) => {
                const path = err.path;
                const message = err.message;
                validationErrors[path] = message;
            });
    
            setErrors(validationErrors);
        }
    };

    // const handleChangeSlider =(e) => {
    //     console.log(e)
    // }

 
    return (
        <main className='mainAuto'>
            <header>
                <h1 className='titleAuto'>Crear Autorregistro</h1>
            </header>
            <article className='articleAuto'>
                {selfRegister.map((section, index) => (
                    <section className='sectionContainer' key={index}>
                        <h3>Seccion {index + 1}</h3>
                        <input type="text"
                        placeholder="Nombre de la seccion"
                        value={section.name}
                        onChange={e => handleWriteName(e?.target?.value, index)}
                        className='sectionContainerInput nameInput'
                        />
                        {errors?.selfRegister &&
    errors?.selfRegister[index]?.name && console.log('hola')}
                        <input type="text"
                        className='sectionContainerInput sectionInput'
                        placeholder="Tipo de la seccion"
                        value={section.type}
                        onChange={e => handleWriteType(e?.target?.value, index)}
                        />
                        { section.questions.map((questions, indexQuestion) => (
                            <section className='sectionQuestions' key={indexQuestion}>
                                <input type="text" 
                                className='inputQuestion'
                                placeholder="Question"
                                value={questions.selfQuestion}
                                onChange={e => handleWriteQuestion(e?.target?.value, index, indexQuestion)}/>
                                <input type="text" 
                                className='inputDisagree'
                                placeholder="Disagree"
                                value={questions.disagree}
                                onChange={e => handleWriteDisgree(e?.target?.value, index, indexQuestion)}/>
                                <Slider
                                    // onChange={handleChangeSlider}
                                    color="success"
                                    size="md"
                                    step={1}
                                    defaultValue={3}
                                    showSteps={true} 
                                    maxValue={5} 
                                    minValue={1}
                                    marks={[
                                        {value : 1,
                                        label : 1},
                                        {value : 2,
                                        label : 2},
                                        {value : 3,
                                        label : 3},
                                        {value : 4,
                                        label : 4},
                                        {value : 5,
                                        label : 5}
                                    ]}
                                    className='sliderAuto'
                                />
                                <input type="text" 
                                className='inputAgree'
                                placeholder="Agree"
                                value={questions.agree}
                                onChange={e => handleWriteAgree(e?.target?.value, index, indexQuestion)}/>
                                
                                <button onClick={() => handleDeleteQuestion(index, indexQuestion)} className='deleteQuestion'>
                                    Eliminar Pregunta
                                </button>
                            </section>
                        ))
                        
                        }
                            <div className='sectionQuestionsDiv'>
                                <button className='addQuest' onClick={() => handleAddQuestion(index)}>Agregar Pregunta</button>
                                <button className='deleteSect' onClick={() => handleDeleteSection(index)}>Eliminar Seccion</button>
                            </div>
                        
                        {/* {width >= 766 && <button className='deleteSect' onClick={() => handleDeleteSection(index)}>Eliminar Seccion</button>}
                        {width >= 766 && <button className='addQuest' onClick={() => handleAddQuestion(index)}>Agregar Pregunta</button>} */}
                        
                        
                        
                    </section>
                ))}
                <footer className='footerAuto'>
                    <button className='agregarSection' onClick={handleAddSection}>Agregar Seccion</button>

                    <button className='createAuto' onClick={() => saveAutoRegistro()}>Crear Auto-Registro</button>

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
                </footer>
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