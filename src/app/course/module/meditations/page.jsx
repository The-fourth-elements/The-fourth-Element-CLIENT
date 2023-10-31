'use client'

import Meditations from '@/components/meditations/Meditations';
import React from 'react'
function page() {
    const { moduleId } = localStorage;
  return (
    <Meditations idModule={moduleId}/>
  )
}

export default page