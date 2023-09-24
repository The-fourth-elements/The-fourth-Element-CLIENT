'use client'
import { useSession, getSession} from "next-auth/react";


const User = () => {
    const {data:session} = useSession();
    const doud =  async() =>{
      const i = await getSession();
      console.log(i);
      

    }
    doud().then()
  return (
    <>
        <pre>{JSON.stringify(session)}</pre>
    </>
  )
}

export default User