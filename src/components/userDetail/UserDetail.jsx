"use client";
import "./styles.scss"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserDetail } from "@/store/userDetail"
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";


const UserDetail = () => {
    const {detail, getDetail} = useUserDetail()
    
    // const id = useRouter().query.id
    const [plan, setPlan] = useState();

    useEffect(()=> {
        if(detail.role){
            switch(detail.role){
                case 2: setPlan("Pay Plan")
                break;
                default: setPlan("Free Plan")
            }
        }

    }, [detail.role])

    return (
        <article>
            {/* {detail && Object.keys(detail).length > 0 ? ( */}
            <Card className="cardasdasdasd">
                {/* <Image className="object-cover rounded-xl" src={detail.profile_img} alt={detail.name} /> */}
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h1>Name: Angel</h1>
                    <h2>Email: asdasdasd</h2>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <h2>Plan: 12</h2>
                    <h2>Country: asdasdasdasd</h2>
                    <h2>City: asdasdasd</h2>
                    {/* <h2>Registration date: {detail.createdAt}</h2>  */}
                    <h2>Registration date: asdasdasdqwe</h2>
                </CardBody>
            </Card>
        {/* ) : (
        <>estaria bueno poner aqui un componente que de una pantalla de carga</>
        )} */}
        </article>
    )
}
    // tambien solo me faltaria que este archivo sea hijo de la ruta de valentin
    export default UserDetail;


