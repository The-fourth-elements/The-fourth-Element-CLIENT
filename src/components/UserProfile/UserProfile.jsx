'use client';
import { useNationAndCity } from '@/zustand/store/countryAndCityID';
import './styles.scss';
import { useEffect, useState } from 'react';
import { Card, CircularProgress } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useUserDetail } from '@/zustand/store/userDetail';
import { UserProfileBody, UserProfileHeader } from './HeadBodyProfile';
import { useUserProfile } from '@/zustand/store/userProfile';
import { getCookie } from 'cookies-next';
import { deportes } from '@/utils/dataRegister';
import { toastError, toastInfo } from '@/helpers/toast';
import UserRecords from '../user-records/UserRecords';

const UserProfile = () => {
	const { data: session } = useSession();
	const cookie = getCookie('jsdklfsdjklfdsjfds');
	const { getProfile, user } = useUserProfile();
	const { updateUserRole } = useUserDetail();
	const { stringCity, stringCountry } = useNationAndCity();
	let [openImage, setOpenImage] = useState(false);
	let [openCountry, setOpenCountry] = useState(false);
	let [openCity, setOpenCity] = useState(false);
	let [openName, setOpenName] = useState(false);
	let [newName, setNewName] = useState('');
	let [newCountry, setNewCountry] = useState('');
	let [newCity, setNewCity] = useState('');
	let [newImage, setNewImage] = useState(null);
	let [newSport, setNewSport] = useState('');
	let [newExp, setNewExp] = useState('');
	let [newAge, setNewAge] = useState('');
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		getProfile(cookie);
		setNewName(user?.username);
		setNewCountry(user?.nation?.name);
		setNewCity(user?.city?.name);
		if (updated) {
			getProfile(cookie);
			setUpdated(false);
		}
		if (!user.sport) {
			// console.log('no deporte')
		}
		return ()=>{
			
		}
	}, [user?.username, user?.id, updated]);
	const handleChangePhoto = () => {
		setOpenImage(!openImage);
		setOpenCity(false);
		setOpenName(false);
		setOpenCountry(false);
		setNewImage(null)
	};
	const handleChangeCountry = () => {
		setOpenCountry(!openCountry);
		setOpenCity(false);
		setOpenName(false);
		setOpenImage(false);
		setNewCountry(stringCountry);
	};
	const handleChangeCity = () => {
		setOpenCity(!openCity);
		setOpenCountry(false);
		setOpenName(false);
		setOpenImage(false);
	};
	const handleChangeName = () => {
		setOpenName(!openName);
		setOpenCity(false);
		setOpenCountry(false);
		setOpenImage(false);
	};
	const getNewName = event => {
		setNewName(event.target.value);
	};
	const getNewExp = event => {
		setNewExp(event.target.value);
	};
	const getNewAge = event => {
		setNewAge(event.target.value);
	};
	const getNewImage = e => {
		const { info } = e;
		const { url, public_id } = info;
		setNewImage({ url, id: public_id });
	};
	const updateUserName = () => {
		const update = { id: user?._id, username: newName };
		updateUserRole(update);
		setOpenName(false);
		getProfile(cookie);
		setUpdated(true);
	};
	const updateUserAge = () => {
		const update = { id: user?._id, age: newAge };
		updateUserRole(update);
		getProfile(cookie);
		setUpdated(true);

	};
	const updateUserExp = () => {
		const update = { id: user?._id, expYearsSports: newExp };
		updateUserRole(update);
		getProfile(cookie);
		setUpdated(true);

	};
	const updateUserCountry = () => {
		const update = { id: user?._id, nation: newCountry, city: newCity };
		updateUserRole(update);
		setOpenCountry(false);
		setOpenCity(false);
		getProfile(cookie);
		setUpdated(true);

	};
	const updateUserCity = () => {
		const update = { id: user?._id, city: newCity };
		updateUserRole(update);
		setOpenCity(false);
		getProfile(cookie);
		setUpdated(true);

	};
	const updateUserSport = () => {
		const update = { id: user?._id, sport: newSport };
		updateUserRole(update);
		getProfile(cookie);
		setUpdated(true);

	};
	const updateUserImage = async () => {
		try {
			const update = {
				id: user?._id,
				imagen: {
					public_id: newImage.id,
					secure_url: newImage.url,
				},
			};
			await updateUserRole(update);
			setUpdated(true);
			toastInfo('Ha actualizado la foto de perfil');
			setNewImage(null);
			setOpenImage(false)
		} catch (error) {
			toastError(
				'No se pudo cambiar la foto de perfil, contacta a un moderador si el problema persiste'
			);
		}
	};
	const selectCountry = val => {
		setNewCountry(val);
		setNewCity('');
	};
	const selectCity = val => {
		setNewCity(val);
	};
	const selectSport = event => {
		setNewSport(event.target.value);
	};
	return (
		<article className='flex flex-col justify-center items-center gap-2'>
			{user && user?._id && Object.keys(user).length > 0 ? (
				<div className='main'>
					<UserProfileHeader
						newImage={newImage}
						updateUserImage={updateUserImage}
						getNewImage={getNewImage}
						openImage={openImage}
						user={user}
						openName={openName}
						handleChangeName={handleChangeName}
						handleChangePhoto={handleChangePhoto}
						updateUserName={updateUserName}
						getNewName={getNewName}
						newName={newName}
						session={session}
					/>
					<UserProfileBody
						updateUserAge={updateUserAge}
						updateUserExp={updateUserExp}
						getNewAge={getNewAge}
						newAge={newAge}
						getNewExp={getNewExp}
						newExp={newExp}
						updateUserSport={updateUserSport}
						newSport={newSport}
						selectSport={selectSport}
						deportes={deportes}
						user={user}
						openCountry={openCountry}
						stringCountry={stringCountry}
						newCountry={newCountry}
						selectCountry={selectCountry}
						handleChangeCountry={handleChangeCountry}
						updateUserCountry={updateUserCountry}
						openCity={openCity}
						stringCity={stringCity}
						newCity={newCity}
						selectCity={selectCity}
						handleChangeCity={handleChangeCity}
						updateUserCity={updateUserCity}
					/>
				</div>
			) : (
				<div className='centered'>
					<CircularProgress
						className='loading'
						label='Loading...'
						color='warning'
					/>
				</div>
			)}
			<UserRecords user={user} session={session} />
		</article>
	);
};

export default UserProfile;
