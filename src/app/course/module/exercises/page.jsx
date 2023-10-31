'use client';

import Exercises from '@/components/exercises/Exercises';
import React from 'react';

function page() {
	let moduleId;
	useEffect(() => {
		moduleId = localStorage.getItem('moduleId');
	}, []);
	return <Exercises idModule={moduleId} />;
}

export default page;
