'use client';

import { useModulesStore } from '@/zustand/store/modulesStore';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { useUserProfile } from '@/zustand/store/userProfile';

import React, { useEffect } from 'react';
import { setCookie } from 'cookies-next';

function Modules() {
	const { modules, getModules } = useModulesStore();
	const { user, getProfile } = useUserProfile(); // se usara luego para obtener el progreso del usuario, para el desbloqueo de clases.

	const { data: session } = useSession();
	const role = session?.token?.user?.role;

	const id = session?.token?.user?.id;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const items = [
		{
		  key: "classes",
		  label: "Clases",
		},
		{
		  key: "exercises",
		  label: "Ejercicios",
		},
		{
		  key: "meditations",
		  label: "Meditacion",
		},
	  ];

	const router = useRouter();

	useEffect(() => {
		getModules();
		if(id)
		{
			getProfile(id);
		}
	}, []);

	return (
		<div className='mt-10 flex start-0'>
			{modules?.map((elem, index) => {
				return (
					(!elem.paid || role > 0) &&
					<React.Fragment key={index}>
					
					<div className='mx-auto bg-secondary-600 h-fit w-fit p-3 px-8 pr-28 flex flex-col rounded-xl'>
						<p className='my-1'> {elem.name} </p>
						<h1 className='text-6xl mb-10 mt-2 mr-5'> M{`${index + 1}`}</h1>
						<Dropdown>
							<DropdownTrigger>
								<Button className=' w-fit px-4 py-2 rounded-lg bg-primary transition-background hover:bg-primary-500' variant='bordered'>Categoría</Button>
							</DropdownTrigger>
							<DropdownMenu aria-label='Dynamic Actions' items={items}>
								{item => (
									<DropdownItem
										onClick={() => router.push(`/course/${item.key}/${elem._id}`)}
										key={item.key}
										color={item.key === 'delete' ? 'danger' : 'default'}
										className={item.key === 'delete' ? 'text-danger' : ''}>
										{item.label}
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</div>
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default Modules;
