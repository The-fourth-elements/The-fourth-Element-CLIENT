'use client';
import { useUsersStore } from '@/zustand/store/usersStore';
import { useState, useEffect } from 'react';
import { Select, SelectSection, SelectItem, Button } from '@nextui-org/react';
import { useAllCountrys } from '@/zustand/store/allCountrys';
import './styles.scss';

const Filters = () => {
    const { usersFilter } = useUsersStore();
    const { getCountrys, allCountrys } = useAllCountrys();
    const { filterUsers } = useUsersStore(); // Utilizamos una única función de filtro

    useEffect(() => {
        getCountrys();
        console.log(allCountrys);
        console.log(usersFilter);
    }, []);

    let [filterNationality, setFilterNationality] = useState("all");
    let [filterPlan, setFilterPlan] = useState("all");

    const handleFilterNationality = (event) => {
        const selectedNationality = event.target.value;
        setFilterNationality(selectedNationality);
    };

    const handleFilterPlan = (event) => {
        const selectedTypePlan = event.target.value;
        setFilterPlan(selectedTypePlan);
    };

    useEffect(() => {
        // Aplicar ambos filtros al actualizar cualquiera de los valores de filtro
        filterUsers(filterNationality, filterPlan);
    }, [filterNationality, filterPlan]);

    return (
        <div className="main">
            <div className="diver">
                <label htmlFor="">FILTER BY COUNTRY</label>
                <select className="select" label="Select a country" onChange={handleFilterNationality} value={filterNationality}>
                    <option value="all">everyone</option>
                    {allCountrys.map((country) => (
                        <option value={country._id} key={country._id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="diver">
                <label htmlFor="">FILTER BY PLAN</label>
                <select className="select" label="Select a plan" onChange={handleFilterPlan} value={filterPlan}>
                    <option value="all">Everyone</option>
                    <option value="free">Free Plan</option>
                    <option value="pay">Pay Plan</option>
                    <option value="moderators">Moderator</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;

