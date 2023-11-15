'use client';
import LandingDesktop from '../components/landing/LandingDesktop';
import { useEffect, useState } from 'react';
import LandingMobile from '../components/landing/LandingMobile';
import Footer from '@/components/footer/Footer';

const Landing = () => {
	return (
		<>
			<LandingDesktop />
			<Footer></Footer>
		</>
	);
};

export default Landing;
