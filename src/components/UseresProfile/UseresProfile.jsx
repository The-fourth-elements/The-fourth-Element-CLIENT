"use client"
import "./styles.scss"
import { useEffect } from "react";
import { useUsersStore } from "@/zustand/store/usersStore";
const UseresProfile = ({params}) => {
	const{getUsers, usersFilter} = useUsersStore()

	useEffect(() => {
		getUsers()
	}, []);

	const user = usersFilter.find((user) => user.name === params.name)
    return (
		<article>
			 
			{user.name && Object.keys(user).length > 0 ? (
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

export default UseresProfile;