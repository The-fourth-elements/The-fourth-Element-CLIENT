import { useUsersStore } from "@/zustand/store/usersStore"
import { useState } from "react"
import {Select, SelectSection, SelectItem} from "@nextui-org/react";
import "./styles.scss"


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
        <div className="main"> 
            <div className="diver">
                <label htmlFor="">ORDER BY NAME</label>
                <select className="select"
                label="Select a name"onChange={handleOrderName} value={orderName}>
                    <option value="nameDesc">A - Z</option>
                    <option value="nameAsc">Z - A</option>
                </select>
            </div>
            <div className="diver">
        <label htmlFor="">ORDER BY PLAN</label>
        <select className="select" label="Select a plan"onChange={handleOrderPlan} value={orderPlan}>
            <option value="payDesc">Pay - Free</option>
            <option value="payAsc">Free - Pay</option>
        </select>
        </div>
        </div>
    )
}
export default Orders;