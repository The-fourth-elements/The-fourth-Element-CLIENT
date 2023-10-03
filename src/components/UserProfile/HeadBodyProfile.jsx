"use client"
import {Card, CardHeader, CardBody, Image, CircularProgress, Button } from '@nextui-org/react';
import InputName from './input';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { CountrySelect, CitySelect } from './SelectsProfile';

export const UserProfileHeader = ({ user, openName, handleChangeName, handleChangePhoto, updateUserName, getNewName }) => (
    <CardHeader className='elHeader'>
      {openName ? (
        <h1>
          <InputName getNewName={getNewName} />
          <Button size="sm" title="back to" color="warning" variant="bordered" onClick={handleChangeName} isIconOnly>
            ↩
          </Button>
          <Button color="warning" variant="bordered" size="sm" onClick={updateUserName}> Accept </Button>
        </h1>
      ) : (
        <h1>
          Name: {user.username}
          <Button title="Edit  Name" color="warning" variant="bordered" onClick={handleChangeName} size="sm" isIconOnly>
            <EditIcon />
          </Button>
        </h1>
      )}
      {user.profile_img ? (
        <Image src={user.profile_img} alt={user.name} />
      ) : (
        <Image
          src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
          alt={user.name}
        />
      )}
      <Button isIconOnly color="warning" variant="bordered" title="Edit Photo" onClick={handleChangePhoto}>
        <EditIcon />
      </Button>
    </CardHeader>
  );

export const UserProfileBody = ({ user, openCountry, stringCountry, newCountry, selectCountry, handleChangeCountry, updateUserCountry, openCity, stringCity, newCity, selectCity, handleChangeCity, updateUserCity }) => (

    <CardBody className='elBody'>
      <h2>Email: {user.email}</h2>
      {user.role === 0 ? (
        <h2>Plan: Free Plan</h2>
      ) : user.role === 1 ? (
        <h2>Plan: Pay Plan</h2>
      ) : (
        <h2>Plan: Admin </h2>
      )}
      <CountrySelect stringCountry = {stringCountry} openCountry = {openCountry} newCountry={newCountry} selectCountry={selectCountry} handleChangeCountry={handleChangeCountry} updateUserCountry={updateUserCountry} />
      <CitySelect openCity = {openCity} stringCity = {stringCity}newCountry={newCountry} newCity={newCity} selectCity={selectCity} handleChangeCity={handleChangeCity} updateUserCity={updateUserCity} />
      {/* Otras partes del cuerpo del perfil */}
    </CardBody>
  );