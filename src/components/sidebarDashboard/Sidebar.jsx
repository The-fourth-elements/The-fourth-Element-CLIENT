'use client';
import {
	sidebar,
	sidebarOpen,
	hamburger,
	linksContainer,
	i
} from './styles.module.scss';
import Item from './Item';
import { routes } from '@/utils/dataLinksDashboard';
import { useState } from 'react';
import { useDisclosure } from '@nextui-org/react';
import Invitation from '../create-invitation/Invitation';

const Sidebar = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure()
	const [open, setOpen] = useState(false);
	return (
		<div className={`sticky top-11 ${open ? 'z-30' : 'z-30'}`} style={{top:'150px'}}>
			<div
				className={
					open ? sidebarOpen + ' absolute z-30' : sidebar + ' absolute z-30'
				}>
				<svg
					className={hamburger}
					onClick={() => {
						setOpen(!open);
					}}>
					<path
						d='M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z'
						fill='#8F8F8F'
					/>
				</svg>
				<div className={linksContainer}>
					{routes &&
						routes.map(({ to, text, svg }, index) => (
							<Item
								key={index}
								to={to}
								text={text}
								svg={svg}
								open={open}></Item>
						))}
				</div>
				<div className={i}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6 flex'
						onClick={onOpen}
						>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z'
						/>
					</svg>
					<Invitation isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
