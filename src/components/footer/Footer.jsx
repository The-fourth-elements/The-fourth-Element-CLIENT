'use client';


import { useEffect, useState } from 'react';

import FooterDesktop from './FooterDesktop';

import FooterMobile from './FooterMobile';


const Footer = () => {
	const [mobile, setMobile] = useState(undefined);


	useEffect(() => {
		const updateMobile = () => {
			setMobile(window.innerWidth < 766 ? true : false);
		};

		window.addEventListener('resize', updateMobile);
		updateMobile();

		return () => {
			window.removeEventListener('resize', updateMobile);
		};
	}, []);

    
	return typeof mobile !== 'undefined' ? (
		mobile ? (
			<FooterMobile />

		) : (
			<FooterDesktop />
		)
	) : null;
};

export default Footer;
