import ModuleClasses from '@/components/moduleClasses/ModuleClasses';
import React from 'react'

function page({ params }) {
    console.log(params.idModule);
    const {idModule} = params
  return (
    <ModuleClasses idModule={idModule}/>
  )
}

export default page