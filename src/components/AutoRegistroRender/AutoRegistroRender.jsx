'use client'
import './AutoRegistroRender.scss'
import { useAutoRegistro } from '@/zustand/store/autoRegistroStore'
import { CircularProgress,Modal, ModalContent } from '@nextui-org/react'
// import SliderAutoRegistro from '@/helpers/SliderAutoRegistro'
import { useState, useEffect } from 'react'
import { Slider } from '@nextui-org/react'
import { getCookie } from 'cookies-next'
import { toastError, toastSuccess } from '@/helpers/toast'

const RenderAutoRegistro = ({isOpen, onOpen, onOpenChange, data, type}) => {
// const RenderAutoRegistro = () => {
    const id = '65553d59a581cd345efee567'
    const { getAutoRegistro,  createResponseSR, addResponseSRToUser} = useAutoRegistro()
    const userId = getCookie('jsdklfsdjklfdsjfds');
    const [userResponses, setUserResponses] = useState([]);
    const [comments, setComments] = useState("")
    
    const excersice = data.filter((section) => section.type === type)
    
    useEffect(() => {
        // if(excersice) {
        //     if(Object.keys(excersice).length === 0){
        //     const data = getAutoRegistro(id); // Llama a getAutoRegistro de manera síncrona
        // }  
        // }
        
        if (excersice?.questions) {
            // console.log("holas")
            setUserResponses(excersice?.questions?.map(() => 3));
        }
    }, [excersice]);

    const handleChangeComments = (event) => {
        setComments(event.target.value)
    }

    const handleChangeResponse = (event, index) => {
        const newResponses = [...userResponses];
        newResponses[index] = event;
        setUserResponses(newResponses); // Actualiza el estado de las respuestas del usuario
        console.log(newResponses)
    }

    const handleSaveResponse = () => {
        console.log(comments)
        try {
            if(comments === ""){
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
       excersice && Object.keys(excersice).length > 0 && (
        <Modal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} size='5xl' backdrop='blur' scrollBehavior="inside">
            <ModalContent>
                {onClose => (
            <main className="mainAutoRender">
                {excersice?.map((exer) =>
                <>
                <header>
                    <h1>{exer?.name}</h1>
                    <h2>{exer?.type}</h2>
                </header>
                <article>
                     {exer.questions?.map((question, index) => (
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
                    <textarea className='textAutoRegistro' onChange={handleChangeComments} name="" id="" cols="30" rows="10" placeholder='¿Por que te sentiste asi?'/>
                </article>
                </>)}
                <footer>
                    <button onClick={handleSaveResponse} className="buttonFooterAutoRender">
                        Guardar Respuestas
                    </button>
                </footer>
            </main>
            )}
            </ModalContent>
            </Modal>
        )
    );
}

export default RenderAutoRegistro;
