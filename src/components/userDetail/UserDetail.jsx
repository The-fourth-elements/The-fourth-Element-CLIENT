"use client";
import "./styles.scss"
import profile from "./negro.jpg"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useUserDetail } from "@/zustand/store/userDetail";
import {Card, CardHeader, CardBody, Image, CircularProgress} from "@nextui-org/react";
import Filters from "../Filters/Filters";
import Orders from "../Orders/Orders";


const UserDetail = ({params}) => {
    const {detail, getDetail} = useUserDetail()
    const [plan, setPlan] = useState();
    console.log(detail)
    useEffect (()=> {
        if (params.id){
         getDetail (params.id)}
    }, [params.id, detail.role])

    return (
        <article>
            {detail.name && Object.keys(detail).length > 0 ? (
    <Card className="main">
                
                    {/* Filters/>
                    <Orders/>< */}
                <CardHeader className="elHeader">
                    <h1>Name: {detail.name}</h1>
                    <Image src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg"  alt={detail.name} />
                </CardHeader>
                <CardBody className="elBody">
                    <h2>Email: {detail.email}</h2>
                    {detail.role === 0 ? <h2>Plan: Free Plan</h2> :  detail.rol === 1 ?<h2>Plan: Pay Plan</h2> : <h2>Plan: Admin </h2>}
                    <h2>Country: {detail.nationality}</h2>
                    <h2>City: {detail.city}</h2>
                    {/* <h2>Registration date: {detail.createdAt}</h2>  */}
                    <h2>Registration date: {new Date(detail.createdAt).toLocaleDateString()}</h2>
                </CardBody>
            </Card>
        ) : (
            <div className="centered">
                <CircularProgress className="loading" label="Loading..." color="warning"/>
            </div>
        )}
        </article>
    )
}
    // tambien solo me faltaria que este archivo sea hijo de la ruta de valentin
    export default UserDetail;


