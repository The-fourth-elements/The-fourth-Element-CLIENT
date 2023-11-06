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
		<div className='flex flex-col items-center space-y-4 mb-10'>
			<ModuleCard
			
				moduleName={moduleData?.moduleName}
				moduleId={moduleData?.moduleId}
				moduleIndex={moduleData?.moduleIndex}
				className={'lg:max-w-[1265px] w-[90vw]'}
			/>

			<div className='grid min-[1100px]:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-4 lg:max-w-[1265px] w-[90vw]'>
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
						className='mx-auto max-w-[15rem] min-w-[15rem] px-8 py-2 h-fit bg-secondary-800 text-white text-2xl rounded-2xl'>
						<h3>{item.label}</h3>
					</Button>
				))}
			</div>

			<Button onPress={() => router.push('/course')} className='bg-secondary-800 rounded-2xl  px-8 py-6 '>
				<h3>VOLVER A TODOS LOS MÓDULOS</h3>
				
			</Button>
		</div>
	);
}

export default ModulesNavigation;
