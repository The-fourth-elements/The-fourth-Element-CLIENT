'use client'
import { Button } from '@nextui-org/react';
import ModuleCard from '../moduleCard/ModuleCard';
import { items } from '@/utils/categoryItems';
import { useRouter } from 'next/navigation';
import { handleCategoryClick } from '@/helpers/handleCategoryClick';
import { useEffect } from 'react'



function ModulesNavigation() {
	const router = useRouter();
	let moduleId = null;
	let moduleIndex = null;
	let moduleName = null;
	if(typeof window !== 'undefined'){
		moduleId = localStorage.getItem('moduleId');
		moduleIndex = localStorage.getItem('moduleIndex');
		moduleName = localStorage.getItem('moduleName');
	}
	
		

	if(moduleId === null){
		return (<></>)
	}

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
