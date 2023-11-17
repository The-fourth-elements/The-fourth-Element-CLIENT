import Link from 'next/link';
import React from 'react'

import {Footer, Footer_Container, Footer_Container_list, Footer_Container_list_item, Footer_Container_list_inputItem,} from './styles.module.scss';

const FooterDesktop = () => {
	const links = [
		{
			label: 'Partners',
			route: '/partners',
		},
		{
			label: 'Email Us',
			route: '/emailUs',
		},
		{
			label: 'Mantente al día con The Fourth Element',
			route: '/stayUp',
		},
	];
	const links2 = [
		{
			label: 'Media',
			route: '/media',
		},
		{
			label: "Coaches' Guide",
			route: '/coaches',
		},
	];
	return (
		<>
			<footer className={Footer}>
				<div className={Footer_Container}>
					<ul className={Footer_Container_list}>
						{links.map(({ label, route }) => (
							<li key={route} className={Footer_Container_list_item}>
								<Link href={route}>{label}</Link>
							</li>
						))}
					</ul>
					<ul className={Footer_Container_list}>
						{links2.map(({ label, route }) => (
							<li key={route} className={Footer_Container_list_item}>
								<Link href={route}>{label}</Link>
							</li>
						))}
						<li className={Footer_Container_list_inputItem}>
							<label htmlFor="emailr"></label>
							<input id="emailr" name="emailr" placeholder='Ingrese su email'></input>
						</li>
					</ul>
				</div>
			</footer>
		</>
	);
};

export default FooterDesktop;
