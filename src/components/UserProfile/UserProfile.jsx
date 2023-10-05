'use client';
import { useCountryCity } from '@/zustand/store/countryStore';
import { useNationAndCity } from '@/zustand/store/countryAndCityID';
import './styles.scss';
import { useEffect, useState } from 'react';
import {Card, CardHeader, CardBody, Image, CircularProgress, Button } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useUserDetail } from '@/zustand/store/userDetail';
import { UserProfileBody, UserProfileHeader } from './HeadBodyProfile';
import { useUserProfile } from '@/zustand/store/userProfile';
import { getCookie } from 'cookies-next';


const UserProfile = () => {
	const { data: session } = useSession();
	const theUser = session?.token?.user;
	const cookie = getCookie("jsdklfsdjklfdsjfds")
	const {getProfile, user} = useUserProfile()
	const {updateUserRole} = useUserDetail()
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
		getProfile(cookie)
		console.log("user:", user)
		setNewName(user?.username)
		setNewCountry(user?.nation?.name)
		setNewCity(user?.city?.name)
	
		console.log("theUser:", theUser)
	}, [user.id, user.username] )

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
		setNewCountry(stringCountry)
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
		const update = {id: user._id, username: newName}
		console.log(update)
		updateUserRole(update)
		setOpenName(false)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserCountry = () => {
		const update = {id: user._id, nation: newCountry, city:newCity}
		updateUserRole(update)
		setOpenCountry(false)
		setOpenCity(false)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserCity = () => {	
		const update = {id: user._id, city: newCity}
		updateUserRole(update)
		setOpenCity(false)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserImage = () => {
		user.profile_img = newImage
		updateUserRole(user)
		setOpenName(false)
	}
	const selectCountry = (val) => {
		setNewCountry(val);
		setNewCity('');
	}
	const selectCity = (val) => {
		setNewCity(val);
	}
	return (
		<article>
		  {user && user._id && Object.keys(user).length > 0 ? (
			<Card className='main'>
			  <UserProfileHeader user={user} openName={openName} handleChangeName={handleChangeName} handleChangePhoto={handleChangePhoto} updateUserName={updateUserName} getNewName = {getNewName} newName = {newName} session = {session}/>
			  <UserProfileBody user={user} openCountry={openCountry} stringCountry={stringCountry} newCountry={newCountry} selectCountry={selectCountry} handleChangeCountry={handleChangeCountry} updateUserCountry={updateUserCountry} openCity={openCity} stringCity={stringCity} newCity={newCity} selectCity={selectCity} handleChangeCity={handleChangeCity} updateUserCity={updateUserCity} />
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
