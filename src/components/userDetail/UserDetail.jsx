"use client";
import "./styles.scss"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserDetail } from "@/zustand/store/userDetail";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import Filters from "../Filters/Filters";
import Orders from "../Orders/Orders";

const UserDetail = ({params}) => {
    const {detail, getDetail} = useUserDetail()
    const [plan, setPlan] = useState();
    
    useEffect(()=> {
        if (params.id){
        getDetail(params.id)}
        if(detail.role){
            switch(detail.role){
                case 2: setPlan("Pay Plan")
                break;
                default: setPlan("Free Plan")
            }
        }

    }, [params.id, detail.role])

    return (
        <article>
            {detail && Object.keys(detail).length > 0 ? (
            <Card className="cardasdasdasd">
                <Image className="object-cover rounded-xl" src={detail.profile_img} alt={detail.name} />
                    <Filters/>
                    <Orders/>
                    <h1>{params.id}</h1>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h2>Name: {detail.name}</h2>
                    <h2>Email: {detail.email}</h2>
                    
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <h2>Plan: {plan}</h2>
                    <h2>Country: {detail.nationality}</h2>
                    <h2>City: {detail.city}</h2>
                    {/* <h2>Registration date: {detail.createdAt}</h2>  */}
                    <h2>Registration date: {new Date(detail.createdAt).toLocaleDateString()}</h2>
                </CardBody>
            </Card>
        ) : (
        <>estaria bueno poner aqui un componente que de una pantalla de carga</>
        )}
        </article>
    )
}
    // tambien solo me faltaria que este archivo sea hijo de la ruta de valentin
    export default UserDetail;


