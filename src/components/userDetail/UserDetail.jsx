'use client';
import './styles.scss';
import { useEffect, useState } from 'react';
import { useUserDetail } from '@/zustand/store/userDetail';
import {
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
} from '@nextui-org/react';
import { useNationAndCity } from '@/zustand/store/countryAndCityID';

const UserDetail = ({ params }) => {
	
	const { detail, getDetail } = useUserDetail();
	let [country, setCountry] = useState("");
	let [city, setCity] = useState("");

	useEffect(() => {
		
		if (params?.id) {
			getDetail(params?.id);
		}
		if(detail?.username && Object.keys(detail).length > 0){
			setCity(detail?.nation?.name)
			setCountry(detail?.city?.name)
		}
		console.log (detail)
	}, [detail?.role, params?.id  ]);
	

	return (
		<article>
			 
			{detail?.username && Object.keys(detail).length > 0 ? (
				<Card className='main'>
					<CardHeader className='elHeader'>
						<h1>Name: {detail?.username}</h1>
						{detail?.profile_img ? <Image
							src={detail?.profile_img}
							alt={detail?.name}
						/>: <Image
						src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
						alt={detail?.name}
					/>}
					</CardHeader>
					<CardBody className='elBody'>
						<h2>Email: {detail?.email}</h2>
						{detail?.role === 0 ? (
							<h2>Plan: Free Plan</h2>
						) : detail?.role === 1 ? (
							<h2>Plan: Pay Plan</h2>
						) : (
							<h2>Plan: Admin </h2>
						)}
						<h2>Country: {country}</h2>
						<h2>City: {city}</h2>
						<h2>
							Registration date:
							{new Date(detail?.createdAt).toLocaleDateString()}
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
};
export default UserDetail;
