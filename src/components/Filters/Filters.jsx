'use client';
import { useUsersStore } from '@/zustand/store/usersStore';
import { useState, useEffect } from 'react';
import { Select, SelectSection, SelectItem, Button } from '@nextui-org/react';
import { useAllCountrys } from '@/zustand/store/allCountrys';
import './styles.scss';

const Filters = () => {
    const { usersFilter, users, orderUsersName, getUsers } = useUsersStore();
    const { getCountrys, allCountrys } = useAllCountrys();
    const { filterUsers } = useUsersStore();
    let [orderName, setOrderName] = useState("");

    const handleOrderName = (event) => {
        const selectOrderName = event.target.value 
        setOrderName(selectOrderName)
        orderUsersName (selectOrderName)
        console.log(users)

    }

    useEffect(() => {
        getCountrys();
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
        filterUsers(filterNationality, filterPlan);
    }, [filterNationality, filterPlan]);

    return (
        <div className="main">
            <div className="diver">
                <label htmlFor="">FILTER BY COUNTRY</label>
                <select className="select" label="Select a country" onChange={handleFilterNationality} value={filterNationality}>
                    <option value="all">Everyone</option>
                    {allCountrys.map((country) => (
                        <option value={country?._id} key={country?._id}>
                            {country?.name}
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
            <div className="diver">
                <label htmlFor="">ORDER BY NAME</label>
                <select className="select"
                label="Select a name"onChange={handleOrderName} value={orderName}>
                    <option value="nameDesc">A - Z</option>
                    <option value="nameAsc">Z - A</option>
                </select>
            </div>
            
        </div>
    );
};

export default Filters;

