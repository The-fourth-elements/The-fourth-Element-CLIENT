'use client';
import { useCountryCity } from '@/zustand/store/countryStore';
import { useNationAndCity } from '@/zustand/store/countryAndCityID';
import './styles.scss';
import { useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, Image, CircularProgress, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { useUserDetail } from '@/zustand/store/userDetail';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { NameEditor, CountryEditor, } from './ComponentsProfile';

const UserProfile = () => {
	const { data: session } = useSession();
	const user = session?.token?.user;
	const {updateUserRole} = useUserDetail()
	const { theCountry, getCountry, theCity, getCity } = useCountryCity();
	const {getCityId, getCountryId, stringCity, stringCountry} = useNationAndCity()
	let [openImage, setOpenImage] = useState(false)
	let [openCountry, setOpenCountry] = useState(false)
	let [openCity, setOpenCity] = useState(false)
	let [openName, setOpenName] = useState(false)
	let [newName, setNewName] = useState("")
	let [newCountry, setNewCountry] = useState("")
	let [newCity, setNewCity] = useState("")
	let [newImage, setNewImage] = useState("")

	useEffect(() => {
		console.log(user?.city)
		console.log(user?.nation)
		getCityId(user?.city)
		getCountryId(user?.nation)
		setNewCity(stringCity)
		setNewCountry(stringCountry)
		setNewName(user?.username)
	}, [user?.username, user?.country, user?.city, stringCity, stringCountry] )
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
		if(theCountry !== ""){
		user.nation = theCountry
		updateUserRole(user)
		setOpenCountry(false)
		}
	}
	const updateUserCity = () => {	
		if(theCity !== ""){
		user.city = theCity
		updateUserRole(user)
		setOpenCity(false)
		}
	}
	const updateUserImage = () => {
		user.profile_img = newImage
		updateUserRole(user)
		setOpenName(false)
	}
	const selectCountry = (val) => {
		setNewCountry(val);
		setNewCity('');
		getCountry(val)
	}
	const selectCity = (val) => {
		setNewCity('');
		getCity(val)
	}
	return (
		<article>
			{user && user.id && Object.keys(user).length > 0 ? (
				<Card className='main'>
					<CardHeader className='elHeader'>
						<NameEditor
						user={user}
						openName={openName}
						setOpenName={setOpenName}
						newName={newName}
						getNewName={getNewName}
						updateUser={updateUserName}
						/>
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
						<CountryEditor
							user={user}
							openCountry={openCountry}
							setOpenCountry={setOpenCountry}
							newCountry={newCountry}
							selectCountry={selectCountry}
							updateUser={updateUserCountry}
						/>
						<CityEditor
							user={user}
							openCity={openCity}
							setOpenCity={setOpenCity}
							newCity={newCity}
							selectCity={selectCity}
							updateUser={updateUserCity}
						/>
						{/* <h2>Edad: {user.edad}</h2> */}
						{/* <h2>Deportes:</h2> <ul>
							{user.deportes.map((deporte) => (
								<li>{deporte}</li>
							))}
						</ul> */}
						{/* <h2>Deporte: {user.deporte}</h2> */}
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
