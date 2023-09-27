import EditAdminUser from "@/components/editAdminUser/EditAdminUser";

const EditUser = ({params}) => {
    return(
        <>
            
            <EditAdminUser id = {params.id}/>

        </>
    )
}

export default EditUser;