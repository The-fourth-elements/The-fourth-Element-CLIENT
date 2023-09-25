import { useUsersStore } from "@/zustand/store/usersStore"
import { useState } from "react"
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import "./styles.scss"

const Filters = () => {
    const {usersFilter} = useUsersStore()
    const {filterUsersPlan, filterUserCountry} = useUsersStore()
    const countrys = Array.from (new Set (usersFilter.map ((user) => user.nation)))

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
        <div className="main">
            {/* <div className="diver">
                <label htmlFor="">FILTER BY COUNTRY</label>
                <select className="select" label= "Select a country" onChange={handleFilterNationality} value={filterNationality}>
                    <option value="all">everyone</option>
                    {countrys.map ((country) => (
                        <option value={country} key={country} >
                            {country}
                        </option>
                    ))}
                </select>
            </div> */}
            <div className="diver">
                <label htmlFor="">FILTER BY PLAN</label>
                <select className="select" label="Select a plan"onChange={handleFilterPlan} value={filterPlan}>
                    <option value="all">Everyone</option>
                    <option value="free">Free Plan</option>
                    <option value="pay">Pay Plan</option>
                    <option value="moderators">Moderator</option>
                </select>
            </div>
        </div>
    )
}

export default Filters;