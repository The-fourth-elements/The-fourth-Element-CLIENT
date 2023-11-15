'use client'
import './AutoRegistroRender.scss'
import { useAutoRegistro } from '@/zustand/store/autoRegistroStore'
import { CircularProgress } from '@nextui-org/react'
// import SliderAutoRegistro from '@/helpers/SliderAutoRegistro'
import { useState, useEffect } from 'react'
import { Slider } from '@nextui-org/react'
import { getCookie } from 'cookies-next'
import { toastError, toastSuccess } from '@/helpers/toast'

// const RenderAutoRegistro = ({id}) => {
const RenderAutoRegistro = () => {
    const id = '6545fe59cb4b95c0832e6e1f'
    const { getAutoRegistro, excersice, createResponseSR, addResponseSRToUser} = useAutoRegistro()
    const userId = getCookie('jsdklfsdjklfdsjfds');
    const [userResponses, setUserResponses] = useState([]);
    const [value, setValue] = useState()
    useEffect(() => {
        if(Object.keys(excersice).length === 0){
            const data = getAutoRegistro(id); // Llama a getAutoRegistro de manera síncrona
        }
        if (excersice.questions) {
            // console.log("holas")
            setUserResponses(excersice.questions.map(() => 3));
        }
    }, [excersice]);

    const handleButton = () => {
        const bodyAuto ={
            selfRegisterId: id,
            userId,
            response: userResponses,
            comments: ["me senti del orto", "me senti joyita"]
        }
        createResponseSR(bodyAuto)
    }

    const handleChangeResponse = (event, index) => {
        const newResponses = [...userResponses];
        newResponses[index] = event;
        setUserResponses(newResponses); // Actualiza el estado de las respuestas del usuario
        console.log(newResponses)
    }

    const handleSaveResponse = () => {
        // const comments = ["Hola que tal", "Buenos dias"]
        const comments = ["asdasdwasdwa", "Buenos dias"]

        try {
            const newComments = comments.some((coment) => coment === "" )
            if(newComments){
                throw new Error("Complete todos los campos");
            }
            const bodyAuto ={
                selfRegisterId: id,
                userId,
                response: userResponses,
                comments
            }
            createResponseSR(bodyAuto)
            // console.log(newComments)
        } catch (error) {
            toastError(error.message)
        }
    }
    return (
        Object.keys(excersice).length > 0 ? (
            <main className="mainAutoRender">
                <header>
                    <h1>{excersice?.name}</h1>
                    <h2>{excersice?.type}</h2>
                </header>
                <article>
                    {excersice?.questions?.map((question, index) => (
                        <section className="section1AutoRender" key={index}>
                            <h3 className='autoRegistroQuestion'>{question?.selfQuestion}</h3>
                            <h3 className='autoRegistroAgree'>{question?.agree}</h3>
                            <Slider className='autoRegistroSlider'
        onChange={(event) => handleChangeResponse(event, index)}
        color={userResponses[index] === 3 ? "foreground" : userResponses[index] < 3 ? "danger" : "success"}
        size="md"
        step={1}
        defaultValue={3}
        showSteps={true} 
        maxValue={5} 
        minValue={1}
        marks={[
            {value : 1},
            {value : 2},
            {value : 3},
            {value : 4},
            {value : 5}
        ]}
        />
                            <h3 className='autoRegistroDisagree'>{question?.disagree}</h3>
                        </section>
                    ))}
                </article>
                <footer>
                    <button onClick={handleSaveResponse} className="buttonFooterAutoRender">
                        Guardar Respuestas
                    </button>
                </footer>
            </main>
        ) : (
            <CircularProgress className='loading' label='Loading...' color='warning' />
        )
    );
}

export default RenderAutoRegistro;
