import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { items } from '@/utils/categoryItems';
import { handleCategoryClick } from '@/helpers/handleCategoryClick';

function ModuleCard({ moduleName, moduleIndex, moduleId }) {
	const moduleNameWords = moduleName.split(' ').length;
	const router = useRouter();

	return (
		<div className='flex sm:min-w-[450px] w-[95vw] lg:w-[45vw] md:w-[624px] h-full max-w-[550px] max-h-[110px] bg-secondary-800 items-center px-3 pr-6 rounded-xl py-3 m-0 '>
			<h1 className='max-w-full px-10 sm:px-16 p-3 text-7xl text-secondary-900'>
				{parseInt(moduleIndex)}
			</h1>
			<div className='max-w-full my-3 flex flex-col gap-1'>
				<p className='text-xl '>Módulo</p>
				<Dropdown
					classNames={{
						base: 'p-0 bg-background border-divider',
					}}>
					<DropdownTrigger className='w-full'>
						<Button
							className={`${
								moduleNameWords >= 2 ? 'text-base' : 'text-xl w-full '
							}  w-full p-0 rounded-lg border-none  text-white`}
							variant='bordered'>
							{moduleName}
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label='Dynamic Actions'
						className='gap-0 p-0 left-16'
						itemClasses={{
							base: [
								'data-[hover=true]:text-foreground',
								'data-[hover=true]:bg-background',
								'dark:data-[hover=true]:bg-default-50',
								'data-[selectable=true]:focus:bg-default-50',
							],
						}}
						items={items}>
						{items.map((item, index) => (
							<DropdownItem
								onClick={() =>
									handleCategoryClick(
										item.key,
										moduleId,
										moduleIndex,
										moduleName,
										router
									)
								}
								key={item.key}
								className={`${
									index % 2 === 0 ? 'bg-primary' : 'bg-primary-500 '
								} p-2`}>
								{item.label}
							</DropdownItem>
						))}
					</DropdownMenu>
				</Dropdown>
			</div>
		</div>
	);
}

export default ModuleCard;
