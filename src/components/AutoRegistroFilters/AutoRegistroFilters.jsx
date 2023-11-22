'use client'
import "./AutoRegistroFilters.scss"
import { useState } from "react"
import { handleSelectFilterAuto } from "@/helpers/handleSelectAutoFilters"
import { Select, SelectItem } from "@nextui-org/react"
import UserRecords from "@/features/user/knowledge/UserRecords"

const AutoRegistroFilters = (responses) => {
    console.log("responses:", responses)
    const [valueSelect, setValueSelect] = useState("todos")
    // const [fecha, setFecha] = useState(null)
    let [responsesToShow, setResponsesToShow] = useState(responses?.responses)
    
    const datasets = responsesToShow.map((response) => {
		const fecha = new Date (response?.date)
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1;

		return {label: `${dia}/${mes}`,
                data: response?.response,
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
    };

	})
    return(
        <section className="autoRegistroFilters">
            <header>
                <h2>Conoce tus autoregistros</h2>
            </header>
            <div className="divForSelect">
                <label htmlFor="select">Filtros</label>
            <Select className="selectAutoRegistros" label="Filtrar Autoregistros" onChange={(event) => handleSelectFilterAuto(event, responses, setResponsesToShow, setValueSelect)}>
                <SelectItem key="ultimosDiez" value="ultimosDiez">ultimos 10 auto registros</SelectItem>
                <SelectItem key="ultimaSemana" value="ultimaSemana">autoregistros de la ultima semana</SelectItem>
                <SelectItem key="ultimoMes" value="ultimoMes">autoregistros del ultimo mes</SelectItem>
                <SelectItem key="todos" value="todos">todos los autoregistros</SelectItem>
            </Select>
            </div>
            <div className="divForGraphic">
                <UserRecords datasets = {datasets}/>
                {/* <button  onClick={() => {console.log(datasets)}}>showREsponses</button> */}
            </div>



        </section>
    )
}

export default AutoRegistroFilters;