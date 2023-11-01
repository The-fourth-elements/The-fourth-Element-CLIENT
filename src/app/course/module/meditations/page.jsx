'use client';

import Meditations from '@/components/meditations/Meditations';
import React, { useEffect } from 'react';

function page() {
	let moduleId;
	if (typeof window !== 'undefined') {
		moduleId = localStorage.getItem('moduleId');
		return <Meditations idModule={moduleId} />;
	}
}

export default page;
