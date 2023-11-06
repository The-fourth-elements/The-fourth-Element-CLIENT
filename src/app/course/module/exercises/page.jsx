'use client'

import Exercises from '@/components/exercises/Exercises';
import React from 'react'
import { getCookie } from 'cookies-next';

function page() {
    let moduleId
		moduleId = getCookie('moduleId');
        return <Exercises idModule={moduleId}/>

  
}

export default page