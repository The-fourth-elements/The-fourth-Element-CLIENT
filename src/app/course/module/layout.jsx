'use client';

import ModulesNavigation from '@/components/modulesNavigation/ModulesNavigation';


function layout({ children }) {
	

		return (
			<div className=' bg-secondary-700  py-12'>
				<ModulesNavigation />

				{children}
			</div>
		);
	// else{
	// 	return <>CARGANDO </>
	// }
}

export default layout;
