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
import { deportes } from '@/utils/dataRegister';


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
	let [newImage, setNewImage] = useState(null)
	let [newSport, setNewSport] = useState("")
	let [newExp, setNewExp] = useState("")
	let [newAge, setNewAge] = useState("")
	
	useEffect(() => {
		getProfile(cookie)
		setNewName(user?.username)
		setNewCountry(user?.nation?.name)
		setNewCity(user?.city?.name)
		if(!user.sport){
			console.log("no deporte")
		}
		}, [user?.username, user?.id ] )

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
	const getNewExp = (event) => {
		setNewExp(event.target.value)
	}
	const getNewAge = (event) => {
		setNewAge(event.target.value)
	}
	const getNewImage = (event) => {
		setNewImage(event.target.files[0])
		console.log(event.target.files[0])
	}
	const updateUserName = () => {
		const update = {id: user?._id, username: newName}
		console.log(update)
		updateUserRole(update)
		setOpenName(false)
		getProfile(cookie)
		window.location.reload()
	}
	const updateUserAge = () => {
		const update = {id: user?._id, age: newAge}
		updateUserRole(update)
		getProfile(cookie)
		console.log(update)
		// window.location.reload()
	}
	const updateUserExp = () => {
		const update = {id: user?._id, expYearsSports: newExp}
		updateUserRole(update)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserCountry = () => {
		const update = {id: user?._id, nation: newCountry, city:newCity}
		updateUserRole(update)
		setOpenCountry(false)
		setOpenCity(false)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserCity = () => {	
		const update = {id: user?._id, city: newCity}
		updateUserRole(update)
		setOpenCity(false)
		getProfile(cookie)
		// window.location.reload()
	}
	const updateUserSport = () => {	
		const update = {id: user?._id, sport: newSport}
		updateUserRole(update)
		getProfile(cookie)
		// window.location.reload()
	}
	
	const updateUserImage = () => {
		// const update = {id: user?._id, image: {
		// 	public_id: algo,
		// 	secure_url: algo
		// }}
		// updateUserRole(update)
		if (!newImage){
			console.error('No se ha seleccionado un archivo.');
      		return;
		}
		const formData = new FormData();
    	formData.append('file', newImage);
		console.log(formData)
		setOpenImage(false)
	}
	const selectCountry = (val) => {
		setNewCountry(val);
		setNewCity('');
	}
	const selectCity = (val) => {
		setNewCity(val);
	}
	const selectSport = (event) => {
		setNewSport(event.target.value)
	}

	return (
		<article>
		  {user && user?._id && Object.keys(user).length > 0 ? (
			<Card className='main'>
			  <UserProfileHeader updateUserImage={updateUserImage} getNewImage={getNewImage} openImage={openImage} user={user} openName={openName} handleChangeName={handleChangeName} handleChangePhoto={handleChangePhoto} updateUserName={updateUserName} getNewName = {getNewName} newName = {newName} session = {session}/>
			  <UserProfileBody updateUserAge={updateUserAge} updateUserExp={updateUserExp} getNewAge={getNewAge} newAge={newAge} getNewExp={getNewExp} newExp={newExp} updateUserSport={updateUserSport} newSport={newSport} selectSport={selectSport} deportes={deportes} user={user} openCountry={openCountry} stringCountry={stringCountry} newCountry={newCountry} selectCountry={selectCountry} handleChangeCountry={handleChangeCountry} updateUserCountry={updateUserCountry} openCity={openCity} stringCity={stringCity} newCity={newCity} selectCity={selectCity} handleChangeCity={handleChangeCity} updateUserCity={updateUserCity} />
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
