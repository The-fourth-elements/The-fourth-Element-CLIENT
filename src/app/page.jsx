
'use client';
import LandingDesktop from '../components/landing/LandingDesktop';
import { useEffect, useState } from 'react';
import LandingMobile from '../components/landing/LandingMobile';

const Landing = () => {
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
			<LandingMobile />

		) : (
			<LandingDesktop />
		)
	) : null;
};

export default Landing;
