'use client';

import Meditations from '@/components/meditations/Meditations';
import React, { useEffect } from 'react';

function page() {
	let moduleId;
		moduleId = localStorage.getItem('moduleId');
		return <Meditations idModule={moduleId} />;

}

export default page;
