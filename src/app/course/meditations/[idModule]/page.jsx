import Meditations from '@/components/meditations/Meditations';
import React from 'react'
function page({ params }) {
    console.log(params.idModule);
    const {idModule} = params
  return (
    <Meditations idModule={idModule}/>
  )
}

export default page