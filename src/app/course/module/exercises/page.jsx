'use client'

import Exercises from '@/components/exercises/Exercises';
import React from 'react'

function page() {
    const {moduleId} = localStorage
  return (
    <Exercises idModule={moduleId}/>
  )
}

export default page