'use client';

import Meditations from '@/components/meditations/Meditations';
import React, { useEffect } from 'react';
import { getCookie } from 'cookies-next';


function page() {
	let moduleId;
	moduleId = getCookie('moduleId');
		return <Meditations idModule={moduleId} />;

}

export default page;
