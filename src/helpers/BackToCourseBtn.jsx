import { Button } from '@nextui-org/react';
import Image from 'next/image';
import back from '@/assets/svg/arrowBack.svg';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function BackToCourseBtn() {
	const router = useRouter();

	function handlePress() {
		router.push('/course');
	}

	return (
		<Image
			alt='go back arrow'
			src={back}
			width={40}
			className='z-10  cursor-pointer absolute top-2 left-3 bg-primary-500
    rounded-md hover:bg-primary-700'
			onClick={handlePress}
		/>
	);
}
