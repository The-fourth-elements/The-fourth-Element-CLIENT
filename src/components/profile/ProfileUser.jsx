'use client';

import './styles.scss';
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
	Progress,
	Link,
	Accordion,
	AccordionItem,
} from '@nextui-org/react';

import { modules } from '../../utils/navigation';
import { useSession } from 'next-auth/react';

const ProfileUser = ({ params }) => {
	// const { detail, getDetail } = useUserDetail();
	const { data: session } = useSession();
	// useEffect(() => {
	// 	if (params?.id) {
	// 		getDetail(params?.id);
	// 	}
	// }, [params?.id, detail.role]);
	let token = {};
	if (session?.token) {
		token = session.token;
		console.log(token);
	}

	let imageSRC = 'https://cdn.pnghd.pics/data/862/user-profile-png-15.png';

	return (
		<main>
			<Card className='cardDisplay'>
				<h1 className='h1Name text-xl'>Profile</h1>
				{session?.token && token && (
					<>
						<Card className='cardProfile m-2 p-2'>
							<div className='w-1/3'>
								{session.token?.user?.image_profile ? (
									<Image
										src={session?.token?.user?.image_profile}
										alt={session?.token?.user?.username}
									/>
								) : (
									<Image src={imageSRC} alt={'default'} />
								)}
							</div>
							<h3 className='text-xl m-3'>
								Nombre: {session?.token?.user?.username}
							</h3>
							{session?.token?.user?.city ? (
								<>
									<h3 className='text-xl m-3'>
										Ciudad: {session?.token?.user?.city}
									</h3>
									<h3 className='text-xl m-3'>
										Pais: {session?.token?.user?.nationality}
									</h3>
								</>
							) : (
								<></>
							)}
							<Button className='self-end'>Editar</Button>
						</Card>
						<CardBody className='cardBody p-0 m-2 w-auto'>
							<Card className='titles'>
								<h4 className='flex justify-center text-xl m-2'>Titulos</h4>
								<Accordion>
									{modules.map((title, index) => {
										return (
											<AccordionItem
												key={index}
												className='m-2'
												aria-label={'Acordeon ' + index}
												title={title?.name}>
												{title.description}
											</AccordionItem>
										);
									})}
								</Accordion>
							</Card>
							<Card className='progress'>
								<h4 className='flex justify-center text-xl m-2'>Progreso</h4>
								<div className='divProgress'>
									<Progress
										aria-label='Loading...'
										value={50}
										className='max-w-md'
									/>
								</div>
							</Card>
						</CardBody>
					</>
				)}
			</Card>
		</main>
	);
};

export default ProfileUser;
