'use client'
import "./AutoRegistroFilters.scss"
import { useState } from "react"
import { handleSelectFilterAuto } from "@/helpers/handleSelectAutoFilters"
import { Select, SelectItem } from "@nextui-org/react"
import UserRecords from "@/features/user/knowledge/UserRecords"

const AutoRegistroFilters = (responses) => {
    // console.log("responses:", responses)
    // const responses = []
    const [valueSelect, setValueSelect] = useState("todos")
    // const [fecha, setFecha] = useState(null)
    let [responsesToShow, setResponsesToShow] = useState(responses?.responses)
    let [responsesToCheck, setResponsesToCheck] =useState(responses?.responses)
    const datasets = responsesToShow?.map((response) => {
		const fecha = new Date (response?.date)
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1;
		return {
                label: "",
                data: response?.response,
                fill: false,
                backgroundColor: 'none',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
    };
})

        const handleToCheckAutoRegistro = (id) => {
            const responsesFiltered = responses?.responses?.filter((newResponse) => newResponse._id === id)
            setResponsesToShow(responsesFiltered)
            setValueSelect("")
        }
    return(
        responsesToShow?.length > 0 ? (<section className="autoRegistroFilters">
            <header>
                <h2>Conoce tus autoregistros</h2>
            </header>
            <div className="divForSelect">
                <label htmlFor="select">Filtros</label>
            <Select value={valueSelect} className="selectAutoRegistros" label="Filtrar Autoregistros" onChange={(event) => handleSelectFilterAuto(event, responses, setResponsesToShow, setValueSelect)}>
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
            <div className="divForShowAutoRegistros">
                    {   responsesToCheck?.map((response, index) => {
                            const fecha = new Date (response?.date)
                            const dia = fecha.getDate();
                            const mes = fecha.getMonth() + 1;
                            return (
                            <h3 onClick={() => handleToCheckAutoRegistro(response?._id)}>
                                {`Registro dia ${dia}/${mes}`}
                            </h3>)
                            }
                        )
                    }
            </div>
            </section>)
            :
            (
                <section className="sectionNoResponses">
                    <h2>Conoce tus autoregistros</h2>
                    <h3>Parece que aun no has hecho ningun autoregistro</h3>
                </section>
            )
    )
}

export default AutoRegistroFilters;