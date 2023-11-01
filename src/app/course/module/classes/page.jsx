'use client';
import ModuleClasses from '@/components/moduleClasses/ModuleClasses';
import React from 'react';

function page() {
	let	moduleId = null;
	if(typeof window !== 'undefined'){
		moduleId = localStorage.getItem('moduleId');
	    return <ModuleClasses idModule={moduleId} />;

	}

}

export default page;
