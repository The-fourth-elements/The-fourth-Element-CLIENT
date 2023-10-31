'use client'

import { Button } from '@nextui-org/react';
import React from 'react';
import ModuleCard from '../moduleCard/ModuleCard';
import { items } from '@/utils/categoryItems';
import { useRouter } from 'next/navigation';
import { handleCategoryClick } from '@/helpers/handleCategoryClick';



function ModulesNavigation() {
	const router = useRouter();



		let moduleId = localStorage.getItem('moduleId');
		let moduleIndex = localStorage.getItem('moduleIndex');
		let moduleName = localStorage.getItem('moduleName');


	return (
		<div className='flex flex-col items-center space-y-4'>
			<ModuleCard
				moduleName={moduleName}
				moduleId={moduleId}
				moduleIndex={parseInt(moduleIndex)}
			/>

			<div className='flex justify-center flex-wrap'>
				{items.map((item, index) => (
					<Button
					key={index}
						onPress={() =>
							handleCategoryClick(
								item.key,
								moduleId,
								moduleIndex,
								moduleName,
								router
							)
						}
						className='mx-2 p-2 bg-secondary-800 text-white rounded-md'>
						{item.label}
					</Button>
				))}
			</div>

            <Button onPress={() => router.push('/course')}> VOLVER A TODOS LOS MÓDULOS </Button>
		</div>
	);
}

export default ModulesNavigation;
