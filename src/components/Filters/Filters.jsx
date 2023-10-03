'use client'
import { useUsersStore } from "@/zustand/store/usersStore"
import { useState, useEffect } from "react"
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import { useAllCountrys } from "@/zustand/store/allCountrys";
import "./styles.scss"

const Filters = () => {
    const {usersFilter} = useUsersStore()
    const {getCountrys, allCountrys} = useAllCountrys()
    const {filterUsersPlan, filterUserCountry} = useUsersStore()
    useEffect(()=>{
        getCountrys()
        console.log(allCountrys)
        console.log(usersFilter)
    }, [])

    let [filterNationality, setFilterNationality] = useState("")
    let [filterPlan, setFilterPlan] = useState("")

    const handleFilterNationality = (event) => {
        const selectedNationality = event.target.value
        setFilterNationality(selectedNationality)
        filterUserCountry(selectedNationality)
        console.log(selectedNationality)
    }

    const handleFilterPlan = (event) => {
        const selectedTypePlan = event.target.value
        setFilterPlan(selectedTypePlan)
        filterUsersPlan(selectedTypePlan)

    }

    return(
        <div className="main">
            <div className="diver">
                <label htmlFor="">FILTER BY COUNTRY</label>
                <select className="select" label= "Select a country" onChange={handleFilterNationality} value={filterNationality}>
                    <option value="all">everyone</option>
                    {allCountrys.map ((country) => (
                        <option value={country._id} key={country._id} >
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
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