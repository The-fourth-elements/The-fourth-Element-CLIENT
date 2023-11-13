'use client'
import './AutoRegistroRender.scss'
import { useAutoRegistro } from '@/zustand/store/autoRegistroStore'
import { useEffect, useState } from 'react'
import { CircularProgress } from '@nextui-org/react'
import SliderAutoRegistro from '@/helpers/SliderAutoRegistro'

// const RenderAutoRegistro = ({id}) => {
const RenderAutoRegistro = () => {
    const id = '6545fe59cb4b95c0832e6e1f'
    const { getAutoRegistro, excersice } = useAutoRegistro()
    const [responses, setResponses] = useState(excersice?.questions?.map((question) => ""))
    useEffect(() => {
        getAutoRegistro(id)
    }, [])

    const handleButton = () => {
        console.log(excersice)
        console.log(responses)
    }

    const handleChangeResponse = (event, index) => {
        console.log(event)
        console.log(index)
        const newResponses = [...responses]
        newResponses[index] = event
    }
    return(
        Object.keys(excersice).length > 0 ?(<main className="mainAutoRender">
            <header>
                <h1>{excersice?.name}</h1>
                <h2>{excersice?.type}</h2>
            </header>
            <article>
                {excersice.questions.map((question, index) => (
                    <section className="section1AutoRender">
                        <h3>{question?.selfQuestion}</h3>
                        <h3>{question?.agree}</h3>
                        <SliderAutoRegistro index = {index} responses={responses} handleChangeResponse = {handleChangeResponse}/>
                        <h3>{question?.disagree}</h3>

                    </section>
                ))}
                
            </article>
            <footer>
                <button className="button1FooterAutoRender">

                </button>
                <button onClick={handleButton} className="button2FooterAutoRender">
                    clickeame
                </button>
            </footer>
        </main>)
        : <CircularProgress
        className='loading'
        label='Loading...'
        color='warning'
    />
    )
}

export default RenderAutoRegistro;