"use client"
import { useState, useEffect } from "react";
import { useExcersices } from "@/zustand/store/ExcersicesStore";
import { Button } from "@nextui-org/react";
import "./FormRender.scss"

const FrasesRender = ({id}) => {
    // const {Frases, getFrases} = useExcersices() 
    const Frases = {
        frases: 
[
{frase: 'frase 1', answer: ''},
{frase: 'frase 2', answer: ''},
{frase: 'frase 3', answer: ''},
{frase: 'frase 4', answer: ''},
{frase: 'frase 5', answer: ''},
{frase: 'frase 6', answer: ''},
{frase: 'frase 7', answer: ''},
{frase: 'frase 8', answer: ''}
],
name
: 
"elTitulo"
    }

    const [newFrases, setNewFrases] = useState(Frases)
    useEffect(() => {
        console.log(newFrases)
        if(id){
        getFrases(id)
        }
    }, [newFrases])

    const handleChangeAnswer = (event, index) => {
        const changedFrases = newFrases
        changedFrases.frases[index] = event.target.value
        setNewFrases(changedFrases)
    }

    const handleSave = () => {
        console.log(newFrases)
    }
    return(
        <article className="mainFrases"> 
            <h1>{Frases.name}</h1>
            {
                Frases.frases.map((frase, index) => (
                    <section className="sectionFrases">
                    <label htmlFor="input">{frase.frase}</label>
                    <input type="text" onChange={(event) => handleChangeAnswer(event, index)}/>
                    </section>
                ))
            }
            <Button
            className="button"
            radius="sm"
            color="warning"
            onClick={handleSave}>
                Guardar
            </Button>
        </article>
    )
}

export default FrasesRender;