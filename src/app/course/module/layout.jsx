'use client';

import ModulesNavigation from '@/components/modulesNavigation/ModulesNavigation';
function layout({ children }) {
	if (typeof window !== 'undefined') {
		moduleId = localStorage.getItem('moduleId');
		return (
			<main className=' bg-secondary-700  py-12'>
				<ModulesNavigation />

				<div>{children}</div>
			</main>
		);
	}
}

export default layout;
