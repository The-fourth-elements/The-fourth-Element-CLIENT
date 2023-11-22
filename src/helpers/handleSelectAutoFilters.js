
  export const handleSelectFilterAuto = (event, responses, setResponsesToShow, setValueSelect) => {
    setValueSelect(event?.target?.value) 
        const fecha = new Date (Date.now())
        const year = fecha.getFullYear()
        const day = fecha.getDate()
        // console.log(year)
        const month = fecha.getMonth() + 1
    if(event?.target?.value === "ultimosDiez") {
        setResponsesToShow(responses?.responses?.slice(-10))
    }
    if(event?.target?.value === "ultimaSemana"){
        // console.log(responses?.responses)
       
        // console.log(month)
        const yearMatched = responses?.responses?.filter((response) => {
            const dateResponse = new Date (response?.date)
            return dateResponse?.getFullYear() === year
        }
        )
        // console.log(yearMatched)
        if (yearMatched.length > 0){
            const monthMatched = responses?.responses?.filter((response) => {
                const dateResponse = new Date (response?.date)
                // console.log(dateResponse?.getMonth())
                return dateResponse?.getMonth() + 1 === month
            }
            )
            // console.log("meses: ", monthMatched)
            if(monthMatched.length > 0){
                // console.log("hola")
                const dayMatched = responses?.responses?.filter((response) => {
                    const dateResponse = new Date (response?.date)
                    // console.log(dateResponse?.getDate())
                    return dateResponse?.getDate() >= day - 7
                    // return dateResponse?.getDate() >= 200
                }
                )
                    setResponsesToShow(dayMatched)
            }
        }
        // console.log(responsesToShow)
    }
    if(event?.target?.value === "ultimoMes") {
        const yearMatched = responses?.responses?.filter((response) => {
            const dateResponse = new Date (response?.date)
            return dateResponse?.getFullYear() === year
        }
        )
        // console.log(yearMatched)
        if (yearMatched.length > 0){
            const monthMatched = responses?.responses?.filter((response) => {
                const dateResponse = new Date (response?.date)
                // console.log(dateResponse?.getMonth())
                return dateResponse?.getMonth() + 1 === month
                // return dateResponse?.getMonth() + 1 === 2
            }
            )
            
            setResponsesToShow(monthMatched)
            
        }
    }
    if(event?.target?.value === "todos"){
        setResponsesToShow(responses?.responses)
    }
}