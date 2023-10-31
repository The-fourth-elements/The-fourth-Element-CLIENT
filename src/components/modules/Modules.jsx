'use client';

import { useModulesStore } from '@/zustand/store/modulesStore';


import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useUserProfile } from '@/zustand/store/userProfile';

import React, { useEffect, useState } from 'react';
import { setCookie } from 'cookies-next';
import ModuleCard from '../moduleCard/ModuleCard';

function modulesList(modules) {
	
	return (
		<div className='flex lg:h-[614px]  flex-col flex-wrap items-center justify-start gap-4 '>
			{modules.map((module, index) => (
				<ModuleCard key={index} moduleName={module.name}  moduleId={module._id}  moduleIndex={index+1} />
			))}
		</div>
	);
}

function Modules() {
	const { modules, getModules } = useModulesStore();
	const { user, getProfile } = useUserProfile(); // se usara luego para obtener el progreso del usuario, para el desbloqueo de clases.
	const [ modulesLoaded, setModulesLoaded ] = useState(false); // se usara luego para obtener el progreso del usuario, para el desbloqueo de clases.
	 

	const { data: session } = useSession();
	const role = session?.token?.user?.role;

	const id = session?.token?.user?.id;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	

	const router = useRouter();

	useEffect(() => {
		getModules();
		setModulesLoaded(true)
		if (id) {
			getProfile(id);
		}
	}, []);

	return <div className=' bg-secondary-700  py-10 flex flex-col items-center'>
		{modulesLoaded ? (modulesList(modules)):(<h1>Cargando modulos</h1>)}
		
		</div>;
}

export default Modules;
