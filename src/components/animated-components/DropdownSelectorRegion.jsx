import { useState } from 'react';
import { motion } from 'framer-motion';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const AnimatedCountryDropdown = ({ className, country, onChange }) => {
	return (
		<motion.div
			whileTap={{ opacity: 0.2,transitionDuration: '.2s' }}
			className='w-full max-w-full selection'>
			<CountryDropdown
				className={className}
				value={country}
				name='country'
				autoComplete='on'
				id='country'
				onChange={onChange}/>
		</motion.div>
	);
};

const AnimatedRegionDropdown = ({ country, value, onChange, className }) => {
	return (
		<motion.div whileTap={{ opacity: 0.2,transitionDuration: '.2s' }}
        className='w-full max-w-full selection'
        >
			<RegionDropdown
				country={country}
				value={value}
				id='state'
				onChange={onChange}
				className={className}
			/>
		</motion.div>
	);
};

export { AnimatedCountryDropdown, AnimatedRegionDropdown };
