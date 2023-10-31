'use client';

import Meditations from '@/components/meditations/Meditations';
import React from 'react';
function page() {
	let moduleId;
	useEffect(() => {
		moduleId = localStorage.getItem('moduleId');
	}, []);
	return <Meditations idModule={moduleId} />;
}

export default page;
