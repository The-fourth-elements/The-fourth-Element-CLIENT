'use client'
import { useSession, getSession} from "next-auth/react";


const User = () => {
    const {data} = useSession();
    const newData = data
    const doud =  async() =>{
      const i = await getSession();
      console.log(i);
      

    }
    doud().then()
    console.log(newData)
  return (
    <>
        {/* <pre>{JSON.stringify(session)}</pre> */}
    </>
  )
}

export default User