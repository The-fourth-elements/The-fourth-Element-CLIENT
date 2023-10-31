'use client'

import ModulesNavigation from '@/components/modulesNavigation/ModulesNavigation';
function layout({ children }) {

	return (
		<main className=' bg-secondary-700  py-12'>
			<ModulesNavigation />

			<div>{children}</div>
		</main>
	);
}

export default layout;
