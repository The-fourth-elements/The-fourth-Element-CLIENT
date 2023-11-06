import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useUserDetail } from "@/zustand/store/userDetail"

const Detail = () => {
    const {detail} = useUserDetail()
    const {getDetail} = useUserDetail()
    const router = useRouter();
    const id = router.query.id
    const [plan, setPlan] = useState();

    useEffect(()=> {
        if (id){
        getDetail(id)}
        if(detail.role){
            switch(detail.role){
                case 2: setPlan("Pay Plan")
                break;
                default: setPlan("Free Plan")
            }
        }

        
        return (id = null)


    }, [id, detail.role])


    return (
        <div>
            {detail && Object.keys(detail).length > 0 ? ( 
            <section>
                <img src={detail.profile_img} alt={detail.name} />
                <header>
                    <h1>Name: {detail.name}</h1>
                    <h2>Email: {detail.email}</h2>
                </header>
                <section>
                    <h2>Plan: {plan}</h2>
                    <h2>Country: {detail.nationality}</h2>
                    <h2>City: {detail.city}</h2>
                    {/* <h2>Registration date: {detail.createdAt}</h2>  */}
                    <h2>Registration date: {new Date(detail.createdAt).toLocaleDateString()}</h2>
                </section>
                {/*chuchu aqui uso el createdAt que te da por default la base de datos pero no se si con MongoDB tambien te lo de por default y no lo pude probar por que algo me fallaba en el registro mañana lo reviso, igual si no lo tiene por defecto el modelo nadamas seria agregarlo createdAt: {
                type: Date,
                default: Date.now()
                }  */}
            </section>
        ) : (
        <>estaria bueno poner aqui un componente que de una pantalla de carga</>
        )}
        </div>
    )
}
    // tambien solo me faltaria que este archivo sea hijo de la ruta de valentin
    export default Detail;    



