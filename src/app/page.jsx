'use client';

import LandingDesktop from './landing/LandingDesktop';
import LandingMobile from './landing/LandingMobile';

import { useEffect, useState } from 'react';
import './styles.scss';
const Landing = () => {
	const [mobile, setMobile] = useState(undefined);

	useEffect(() => {
		const updateMobile = () => {
			setMobile(window.innerWidth < 766 ? true : false);
		};

		updateMobile();
		window.addEventListener('resize', updateMobile);
		return () => {
			window.removeEventListener('resize', updateMobile);
		};
	}, []);

	return typeof mobile !== 'undefined' ? (
		mobile ? (
			<LandingMobile />

		) : (
			<LandingDesktop />
		)
	) : null;
};

export default Landing;
