'use client';
import { Button } from '@nextui-org/react';
import ModuleCard from '../moduleCard/ModuleCard';
import { items } from '@/utils/categoryItems';
import { useRouter } from 'next/navigation';
import { handleCategoryClick } from '@/helpers/handleCategoryClick';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';

function ModulesNavigation() {
	const router = useRouter();

	const [moduleData, setModuleData] = useState({});

	useEffect(() => {
		setModuleData({
			moduleId: getCookie('moduleId'),
			moduleIndex: getCookie('moduleIndex'),
			moduleName: getCookie('moduleName'),
		});
	}, []);


	return (
		<div className='flex flex-col items-center space-y-4'>
			<ModuleCard
				moduleName={moduleData?.moduleName}
				moduleId={moduleData?.moduleId}
				moduleIndex={moduleData?.moduleIndex}
			/>

			<div className='flex justify-center flex-wrap'>
				{items.map((item, index) => (
					<Button
						key={index}
						onPress={() =>
							handleCategoryClick(
								item.key,
								moduleData?.moduleId,
								moduleData?.moduleIndex,
								moduleData?.moduleName,
								router
							)
						}
						className='mx-2 p-2 bg-secondary-800 text-white rounded-md'>
						{item.label}
					</Button>
				))}
			</div>

			<Button onPress={() => router.push('/course')}>
				VOLVER A TODOS LOS MÓDULOS
			</Button>
		</div>
	);
}

export default ModulesNavigation;
