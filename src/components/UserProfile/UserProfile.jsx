
'use client';
import './styles.scss';
import { useEffect, useState } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';

const UserProfile = () => {
    const { data } = useSession();
    // const nData =  async() =>{
    //     const userDetail = await getSession();
        
    //     console.log(userDetail)
    //     }
    //     nData()
  
    const user = data?.user

	useEffect(() => {
        // console.log(data)
        // console.log(user)
		
	});
	

	return (
		<article>
			 
			{user && user.name && Object.keys(user).length > 0 ? (
				<Card className='main'>
					<CardHeader className='elHeader'>
						<h1>Name: {user.name}</h1>
						{user.profile_img ? <Image
							src={user.profile_img}
							alt={user.name}
						/>: <Image
						src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
						alt={user.name}
					/>}
					</CardHeader>
					<CardBody className='elBody'>
						<h2>Email: {user.email}</h2>
						{user.role === 0 ? (
							<h2>Plan: Free Plan</h2>
						) : user.rol === 1 ? (
							<h2>Plan: Pay Plan</h2>
						) : (
							<h2>Plan: Admin </h2>
						)}
						<h2>Country: {user.nationality}</h2>
						<h2>City: {user.city}</h2>
						{/* <h2>Registration date: {detail.createdAt}</h2>  */}
						<h2>
							Registration date:{' '}
							{new Date(user.createdAt).toLocaleDateString()}
						</h2>
					</CardBody>
				</Card>
			) : (
				<div className='centered'>
					<CircularProgress
						className='loading'
						label='Loading...'
						color='warning'
					/>
				</div>
			)}
		</article>
	);
}

export default UserProfile;