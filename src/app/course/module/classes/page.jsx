'use client';
import ModuleClasses from '@/components/moduleClasses/ModuleClasses';
import React from 'react';

import { getCookie } from 'cookies-next';


function page() {
	let	moduleId = null;
	
		moduleId = getCookie('moduleId');
	    return <ModuleClasses idModule={moduleId} />;


}

export default page;
