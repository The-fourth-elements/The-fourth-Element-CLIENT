import Exercises from '@/components/exercises/Exercises';
import React from 'react'

function page({ params }) {
    console.log(params.idModule);
    const {idModule} = params
  return (
    <Exercises idModule={idModule}/>
  )
}

export default page