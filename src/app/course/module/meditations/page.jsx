'use client';

import Meditations from '@/components/meditations/Meditations';
import React, { useEffect } from 'react';

function page() {
	let moduleId;
	useEffect(() => {
		moduleId = localStorage.getItem('moduleId');
    console.log("localStorage", localStorage);
	}, []);
	return <Meditations idModule={moduleId} />;
}

export default page;
