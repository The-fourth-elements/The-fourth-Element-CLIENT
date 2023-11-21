'use client'
import { useState } from "react"
import { handleSelectFilterAuto } from "@/helpers/handleSelectAutoFilters"

const AutoRegistroFilters = (responses) => {
    // console.log("responses:", responses)
    const [valueSelect, setValueSelect] = useState("todos")
    // const [fecha, setFecha] = useState(null)
    let [responsesToShow, setResponsesToShow] = useState([])
    
    return(
        <section>
            <select name="" id="" onChange={(event) => handleSelectFilterAuto(event, responses, setResponsesToShow, setValueSelect)}>
                <option value="ultimosDiez">ultimos 10 auto registros</option>
                <option value="ultimaSemana">autoregistros de la ultima semana</option>
                <option value="ultimoMes">autoregistros del ultimo mes</option>
                <option value="todos">todos los autoregistros</option>
            </select>


            <div>
                {valueSelect}
                {/* {fecha} */}
            </div>

            <button  onClick={() => {console.log(responsesToShow)}}>showREsponses</button>
        </section>
    )
}

export default AutoRegistroFilters;