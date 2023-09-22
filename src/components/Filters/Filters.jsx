import { useUsersStore } from "@/zustand/store/usersStore"
import { useState } from "react"
import {Select, SelectSection, SelectItem} from "@nextui-org/react";

const Filters = () => {
    const {usersFilter} = useUsersStore()
    const {filterUsersPlan, filterUserCountry} = useUsersStore()
    const countrys = Array.from (new Set (usersFilter.map ((user) => user.nationality)))

    let [filterNationality, setFilterNationality] = useState("")
    let [filterPlan, setFilterPlan] = useState("")

    const handleFilterNationality = (event) => {
        const selectedNationality = event.target.value
        setFilterNationality(selectedNationality)
        filterUserCountry(selectedNationality)
    }
    
    const handleFilterPlan = (event) => {
        const selectedTypePlan = event.target.value
        setFilterPlan(selectedTypePlan)
        filterUsersPlan(selectedTypePlan)

    }
    return(
        <>
            <label htmlFor="">FILTER BY COUNTRY</label>
            <Select label= "Select a country" onChange={handleFilterNationality} value={filterNationality}>
                <SelectItem value="all">everyone</SelectItem>
                {countrys.map ((country) => (
                    <SelectItem value={country} key={country} >
                        {country}
                    </SelectItem>
                ))}
            </Select>

            <label htmlFor="">FILTER BY PLAN</label>
            <Select label="Select a plan"onChange={handleFilterPlan} value={filterPlan}>
                <SelectItem value="all">everyone</SelectItem>
                <SelectItem value="free">Free Plan</SelectItem>
                <SelectItem value="pay">Pay Plan</SelectItem>
            </Select>

        </>
    )
}

export default Filters;