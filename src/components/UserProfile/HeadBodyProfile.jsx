'use client';
import {
	Card,
	CardHeader,
	CardBody,
	Image,
	CircularProgress,
	Button,
	select,
} from '@nextui-org/react';
import InputName from './input';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { CountrySelect, CitySelect } from './SelectsProfile';
import { useState } from 'react';
import { InputAge, InputExp } from './inputExp';
import { CldUploadButton } from 'next-cloudinary';

export const UserProfileHeader = ({
	user,
	openName,
	handleChangeName,
	handleChangePhoto,
	updateUserName,
	getNewName,
	newName,
	session,
	openImage,
	getNewImage,
	updateUserImage,
	newImage,
}) => {
	const [hasErrors, setHasErrors] = useState(false);

	// Función para actualizar el estado de errores
	const handleValidationErrors = hasErrors => {
		setHasErrors(hasErrors);
	};

	return (
		<div className='elHeader'>
			{openName ? (
				<h1>
					<InputName
						getNewName={getNewName}
						name={newName}
						handleValidationErrors={handleValidationErrors}
					/>
					<Button
						className='button'
						size='sm'
						title='back to'
						color='warning'
						variant='bordered'
						onClick={handleChangeName}
						isIconOnly>
						↩
					</Button>
					<Button
						className='button'
						color='warning'
						variant='bordered'
						size='sm'
						onClick={updateUserName}
						disabled={hasErrors}>
						Aceptar
					</Button>
				</h1>
			) : (
				<h1>
					Nombre: {user?.username}
					<Button
					className='button'
						title='Edit  Name'
						color='warning'
						variant='bordered'
						onClick={handleChangeName}
						size='sm'
						isIconOnly>
						<EditIcon />
					</Button>
				</h1>
			)}
			{newImage ? <Image src={newImage?.url} alt={newImage?.id} />
			:
			user?.profile_img ? (
				<Image src={user?.profile_img?.secure_url} alt={user?.name} />
			) 
			: session?.token?.picture ? (
				<Image src={session?.token?.picture} alt='profileImage' />
			) 
			: (
				<Image
					src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
					alt={user?.name}
				/>
			)}
			{openImage ? (
				<div>
					<Button
						className='button'
						size='sm'
						title='back to'
						color='warning'
						variant='bordered'
						onClick={handleChangePhoto}
						isIconOnly>
						↩
					</Button>
					<CldUploadButton
						className='buttonImg'
						uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
						disabled={newImage?.url?.length > 0}
						onSuccess={getNewImage}
						children={'Subir Imagen'}
					/>
					<Button className='buttonImg'
						color='warning'
						variant='bordered'
						size='sm' onClick={updateUserImage} disabled={!newImage?.url}>Aceptar</Button>
				</div>
			) : (
				<Button
				className='buttonImg'
					isIconOnly
					color='warning'
					variant='bordered'
					title='Edit Photo'
					onClick={handleChangePhoto}>
					<EditIcon />
				</Button>
			)}
		</div>
	);
};

export const UserProfileBody = ({
	user,
	openCountry,
	stringCountry,
	newCountry,
	selectCountry,
	handleChangeCountry,
	updateUserCountry,
	openCity,
	stringCity,
	newCity,
	selectCity,
	handleChangeCity,
	updateUserCity,
	deportes,
	selectSport,
	newSport,
	updateUserSport,
	getNewExp,
	newExp,
	updateUserExp,
	getNewAge,
	newAge,
	updateUserAge,
}) => (
	<div className='elBody'>
		<h2>Email: {user?.email}</h2>
		{user?.role === 0 ? (
			<h2>Plan: Gratuito</h2>
		) : user?.role === 1 ? (
			<h2>Plan: Pago</h2>
		) : (
			<h2>Plan: Moderador</h2>
		)}
		<CountrySelect
			user = {user}
			stringCountry={stringCountry}
			openCountry={openCountry}
			newCountry={newCountry}
			selectCountry={selectCountry}
			handleChangeCountry={handleChangeCountry}
			updateUserCountry={updateUserCountry}
		/>
		<CitySelect
			user = {user}
			openCountry={openCountry}
			handleChangeCountry={handleChangeCountry}
			updateUserCountry={updateUserCountry}
			openCity={openCity}
			stringCity={stringCity}
			newCountry={newCountry}
			newCity={newCity}
			selectCity={selectCity}
			handleChangeCity={handleChangeCity}
			updateUserCity={updateUserCity}
		/>

		{!user?.sport ? (
			<h2>
				Deporte:
				<select value={newSport} onChange={selectSport}>
					{deportes.map(deporte => (
						<option> {deporte}</option>
					))}
				</select>
				<Button
					className='button'
					color='warning'
					variant='bordered'
					size='sm'
					onClick={updateUserSport}>
					Aceptar
				</Button>
			</h2>
		) : (
			<h2> Deporte: {user?.sport?.name}</h2>
		)}

		{!user?.age ? (
			<h2>
				Edad: <InputAge getNewAge={getNewAge} newAge={newAge} />{' '}
				<Button
					className='button'
					color='warning'
					variant='bordered'
					size='sm'
					onClick={updateUserAge}>
					Aceptar
				</Button>
			</h2>
		) : (
			<h2> Edad: {user?.age} </h2>
		)}

		{!user?.expYearsSports ? (
			<h2>
				Años de experiencia: <InputExp getNewExp={getNewExp} newExp={newExp} />{' '}
				<Button
				className='button'
					color='warning'
					variant='bordered'
					size='sm'
					onClick={updateUserExp}>
					Aceptar
				</Button>
			</h2>
		) : (
			<h2> Años de experiencia: {user?.expYearsSports} </h2>
		)}
	</div>
);
