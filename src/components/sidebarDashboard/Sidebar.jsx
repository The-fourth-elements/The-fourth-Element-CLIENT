'use client';
import {
	sidebar,
	sidebarOpen,
	hamburger,
	linksContainer,
} from './styles.module.scss';
import Item from './Item';
import { routes } from '@/utils/dataLinksDashboard';
import { useState } from 'react';

const Sidebar = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className={`sticky top-0 ${open ? 'z-50' : 'z-50'}`}>
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
							<Item key={index} to={to} text={text} svg={svg} open={open}></Item>
						))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
