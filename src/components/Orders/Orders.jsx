import { useUsersStore } from "@/zustand/store/usersStore"
import { useState } from "react"
import {Select, SelectSection, SelectItem} from "@nextui-org/react";

const Orders = () => {
    const {orderUsersName, orderUsersPlan} = useUsersStore()

    let [orderName, setOrderName] = useState("");
    let [orderPlan, setOrderPlan] = useState("");

    const handleOrderName = (event) => {
        const selectOrderName = event.target.value 
        setOrderName(selectOrderName)
        orderUsersName (selectOrderName)
    }
    const handleOrderPlan = (event) => {
        const selectOrderPlan = event.target.value
        setOrderPlan(selectOrderPlan)
        orderUsersPlan (selectOrderPlan)
    }
    
    return(
        <>
        <label htmlFor="">ORDER BY NAME</label>
        <Select label="Select a name"onChange={handleOrderName} value={orderName}>
            <SelectItem value="nameDesc">A - Z</SelectItem>
            <SelectItem value="nameAsc">Z - A</SelectItem>
        </Select>
        <label htmlFor="">ORDER BY PLAN</label>
        <Select label="Select a plan"onChange={handleOrderPlan} value={orderPlan}>
            <SelectItem value="payDesc">Pay - Free</SelectItem>
            <SelectItem value="payAsc">Free - Pay</SelectItem>
        </Select>

        </>
    )
}
export default Orders;