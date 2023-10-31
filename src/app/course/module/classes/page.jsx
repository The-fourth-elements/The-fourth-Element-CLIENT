'use client'
import ModuleClasses from '@/components/moduleClasses/ModuleClasses';
import React from 'react'

function page() {
    const {moduleId} = localStorage
  return (
    <ModuleClasses idModule={moduleId}/>
  )
}

export default page