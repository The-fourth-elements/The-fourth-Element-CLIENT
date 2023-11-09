'use client';

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
import { button } from './ModuleCard.module.scss'

function ModuleCard({ moduleName, moduleIndex, moduleId, className }) {
	const moduleNameWords = moduleName?.split(' ').length;
	const router = useRouter();

	return (
		<div
			className={
				!className
					? `flex sm:min-w-[450px] w-[95vw] lg:w-[45vw] md:w-[624px] h-full max-w-[550px] max-h-[110px] bg-secondary-800 items-center px-3 pr-6 rounded-xl py-3 m-0 `
					: `flex h-full max-h-[110px] bg-secondary-800 items-center px-3 pr-6 rounded-xl py-3 m-0 ${className}`
			}>
			<h3
				style={{ fontWeight: 700 }}
				className={
					className
						? 'bg-secondary-700 max-w-full px-4 rounded-xl sm:mx-16 text-6xl text-secondary-900'
						: 'max-w-full px-10 sm:px-16 p-3 text-7xl text-secondary-900'
				}>
				{moduleIndex}
			</h3>
			<div className='max-w-full my-3 flex flex-col gap-1'>
				<h5
					
					className='text-xl '>
					Módulo
				</h5>
				<Dropdown 
					classNames={{
						base: '',
					}}>
					<DropdownTrigger>
						<Button
						
							className={`${
								moduleNameWords >= 2 ? 'text-base' : 'text-xl w-full '
							} ${button}  w-full p-0 rounded-lg border-none  text-white`}
							variant='bordered'>
							{moduleName}
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label='Dynamic Actions'
						className='gap-0 p-0'
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
