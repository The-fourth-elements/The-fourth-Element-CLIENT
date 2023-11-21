'use client'
import { useState } from "react"

const AutoRegistroFilters = (responses) => {
    console.log("responses:", responses)
    const [valueSelect, setValueSelect] = useState("todos")
    // const [fecha, setFecha] = useState(null)
    let responsesToShow;
    const handleSelectFilterAuto = (event) => {
        setValueSelect(event?.target?.value)
        if(valueSelect === "ultimosDiez") {
            responsesToShow = responses?.responses?.slice(-10)
        }
        if(event?.target?.value === "ultimaSemana"){
            console.log(responses?.responses)
            const fecha = new Date (Date.now())
            const year = fecha.getFullYear()
            console.log(year)
            const yearMatched = responses?.responses?.filter((response) => 
                parseInt(response?.date) === 20
            )
            console.log("todos: ", yearMatched)
        }
        if(valueSelect === "ultimoMes") {
    
        }
        if(valueSelect === "todos"){
    
        }
    }
    return(
        <section>
            <select name="" id="" onChange={handleSelectFilterAuto}>
                <option value="ultimosDiez">ultimos 10 auto registros</option>
                <option value="ultimaSemana">autoregistros de la ultima semana</option>
                <option value="ultimoMes">autoregistros del ultimo mes</option>
                <option value="todos">todos los autoregistros</option>
            </select>


            <div>
                {valueSelect}
                {/* {fecha} */}
            </div>
        </section>
    )
}

export default AutoRegistroFilters;