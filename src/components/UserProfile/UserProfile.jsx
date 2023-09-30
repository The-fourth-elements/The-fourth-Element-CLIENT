'use client';
import { useCountryCity } from '@/zustand/store/countryStore';
import './styles.scss';
import { useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, Image, CircularProgress, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { useUserDetail } from '@/zustand/store/userDetail';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import InputName from './input';


const UserProfile = () => {
	const { data: session } = useSession();
	const user = session?.token?.user;
	const {updateUserRole} = useUserDetail()
	const { theCountry, getCountry } = useCountryCity();
	let [openImage, setOpenImage] = useState(false)
	let [openCountry, setOpenCountry] = useState(false)
	let [openCity, setOpenCity] = useState(false)
	let [openName, setOpenName] = useState(false)
	let [newName, setNewName] = useState("")
	let [newCountry, setNewCountry] = useState("")
	let [newCity, setNewCity] = useState("")
	let [newImage, setNewImage] = useState("")

	useEffect(() => {
		setNewCity(user?.city)
		setNewCountry(user?.country)
		setNewName(user?.username)
	}, [user?.username, user?.country, user?.city])
	const handleChangePhoto = () => {
		setOpenImage(!openImage)
		setOpenCity(false)
		setOpenName(false)
		setOpenCountry(false)
	}
	const handleChangeCountry = () => {
		setOpenCountry(!openCountry)
		setOpenCity(false)
		setOpenName(false)
		setOpenImage(false)
	}
	const handleChangeCity = () => {
		setOpenCity(!openCity)
		setOpenCountry(false)
		setOpenName(false)
		setOpenImage(false)
	}
	const handleChangeName = () => {
		setOpenName(!openName)
		setOpenCity(false)
		setOpenCountry(false)
		setOpenImage(false)
	} 
	const getNewName = (event) => {
		setNewName(event.target.value)
	}
	const updateUserName = () => {
		user.username = newName
		updateUserRole(user)
		setOpenName(false)
	}
	const updateUserCountry = () => {
		user.country = newCountry
		console.log(theCountry)
		updateUserRole(user)
		setOpenCountry(false)
	}
	const updateUserCity = () => {
		user.city = newCity
		updateUserRole(user)
		setOpenCity(false)
	}
	const updateUserImage = () => {
		user.profile_img = newImage
		updateUserRole(user)
		setOpenName(false)
	}
	const selectCountry = (val) => {
		setNewCountry(val);
		setNewCity('');
		console.log(val)
		getCountry(val)
	}
	return (
		<article>
			{user && user.id && Object.keys(user).length > 0 ? (
				<Card className='main'>
					<CardHeader className='elHeader'>
						{openName ? <h1> <InputName getNewName={getNewName}/> <Button size="sm" title="back to" color="warning" variant="bordered" onClick={handleChangeName} isIconOnly>↩</Button> <Button color="warning" variant="bordered" size="sm" onClick={updateUserName}> Accept </Button></h1>
						:<h1>Name: {user.username} <Button title="Edit  Name" color="warning" variant="bordered" onClick={handleChangeName} size="sm" isIconOnly>
							<EditIcon/>
						</Button></h1>}
						{user.profile_img ? (
							<Image src={user.profile_img} alt={user.name} />
						) : (
							<Image
								src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
								alt={user.name}
							/>
							
						)}
						<Button isIconOnly color="warning" variant="bordered" title="Edit Photo" onClick={handleChangePhoto}>
							<EditIcon/>
						</Button>
						
					</CardHeader>
					<CardBody className='elBody'>
						<h2>Email: {user.email}</h2>
						{user.role === 0 ? (
							<h2>Plan: Free Plan</h2>
						) : user.role === 1 ? (
							<h2>Plan: Pay Plan</h2>
						) : (
							<h2>Plan: Admin </h2>
						)}
						{openCountry ? <h2> Country: <CountryDropdown
									name='country'
									autoComplete='on'
									id='country'
									value={newCountry}
									onChange={selectCountry}
									className='select'
								/> <Button color="warning" variant="bordered" title="back to" onClick={handleChangeCountry} isIconOnly> ↩ </Button> <Button onClick={updateUserCountry} color="warning" variant="bordered"> Accept </Button></h2> :<h2>Country: {user.country} <Button isIconOnly color="warning" variant="bordered"title="Edit Country" onClick={handleChangeCountry}>
							<EditIcon/>
						</Button>
						</h2>}
						{openCity ? <h2> City: <RegionDropdown
										country={newCountry}
										value={newCity}
										id='state'
										onChange={val => setNewCity(val)}
										className='group-select'
									/> <Button isIconOnly color="warning" variant="bordered" title="back to" onClick={handleChangeCity}> ↩ </Button> <Button color="warning" variant="bordered" onClick={updateUserCity}> Accept </Button></h2> : <h2>City: {user.city} <Button color="warning" isIconOnly variant="bordered"title="Edit City" onClick={handleChangeCity}>
							<EditIcon/>
						</Button>
						</h2>}
						<h2>
							Registration date: {new Date(user.createdAt).toLocaleDateString()}
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

export default UserProfile;
