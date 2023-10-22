'use client';

import { useModulesStore } from '@/zustand/store/modulesStore';

import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function Modules() {
	const { modules, getModules } = useModulesStore();

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
	// localStorage.setItem( "moduleId" , module?._id)

	const router = useRouter();

	useEffect(() => {
		getModules();
		console.log('modules ', modules);
	}, []);

	function handleClick(module, category) {
		// setModule(module)
		router.push(`/course/${category}/${module._id}`);
	}

	return (
		<div className='mt-10 flex start-0'>
			{modules.map((elem, index) => {
				return (
					<div className='mx-auto bg-secondary-600 h-fit w-fit p-3 px-8 pr-28 flex flex-col rounded-xl'>
						<p className='my-1'> {elem.name} </p>
						<h1 className='text-6xl mb-10 mt-2 mr-5'> M{`${index + 1}`}</h1>
						<Button
							onPress={() => handleClick(elem, 'classes')}
							className=' w-fit px-4 py-2 rounded-lg bg-primary transition-background hover:bg-primary-500'>
							Entrarsss{' '}
						</Button>
						<Dropdown>
							<DropdownTrigger>
								<Button variant='bordered'>Open Menu</Button>
							</DropdownTrigger>
							<DropdownMenu aria-label='Dynamic Actions' items={items} onAction={(key) => handleClick(key, elem)}>
								{item => (
									<DropdownItem
										key={item.key}
										color={item.key === 'delete' ? 'danger' : 'default'}
										className={item.key === 'delete' ? 'text-danger' : ''}>
										{item.label}
									</DropdownItem>
								)}
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			})}
		</div>
	);
}

export default Modules;
