'use client';

import ModulesNavigation from '@/components/modulesNavigation/ModulesNavigation';
import React from 'react';
function layout({ children }) {

	return (
		<main className=' bg-secondary-700  py-12'>
			<ModulesNavigation />

			<div>{children}</div>
		</main>
	);
}

export default layout;
