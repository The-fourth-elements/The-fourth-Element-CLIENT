"use client"
import {Card, CardHeader, CardBody, Image, CircularProgress, Button, select } from '@nextui-org/react';
import InputName from './input';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { CountrySelect, CitySelect } from './SelectsProfile';
import { useState } from 'react';
import InputExp from './inputExp';
import InputAge from './inputAge';

export const UserProfileHeader = ({ user, openName, handleChangeName, handleChangePhoto, updateUserName, getNewName, newName, session}) => {
  const [hasErrors, setHasErrors] = useState(false);

  // Función para actualizar el estado de errores
  const handleValidationErrors = (hasErrors) => {
    setHasErrors(hasErrors);
  };
  
  return(
    <CardHeader className='elHeader'>
      {openName ? (
        <h1>
          <InputName getNewName={getNewName} name={newName}             handleValidationErrors={handleValidationErrors}/>
          <Button size="sm" title="back to" color="warning" variant="bordered" onClick={handleChangeName} isIconOnly>
            ↩
          </Button>
          <Button color="warning" variant="bordered" size="sm" onClick={updateUserName} disabled={hasErrors} > Accept </Button>
        </h1>
      ) : (
        <h1>
          Name: {user?.username}
          <Button title="Edit  Name" color="warning" variant="bordered" onClick={handleChangeName} size="sm" isIconOnly>
            <EditIcon />
          </Button>
        </h1>
      )}
      {session?.token?.picture ?(         
      <Image src={session?.token?.picture} alt="profileImage" />)
      :
      user?.profile_img ? (
        <Image src={user?.profile_img} alt={user?.name} />
      ) : (
        <Image
          src='https://cdn.pnghd.pics/data/862/user-profile-png-15.png'
          alt={user?.name}
        />
      )}
      <Button isIconOnly color="warning" variant="bordered" title="Edit Photo" onClick={handleChangePhoto}>
        <EditIcon />
      </Button>
    </CardHeader>
  )
};

export const UserProfileBody = ({ user, openCountry, stringCountry, newCountry, selectCountry, handleChangeCountry, updateUserCountry, openCity, stringCity, newCity, selectCity, handleChangeCity, updateUserCity, deportes, selectSport, newSport, updateUserSport, getNewExp, newExp, updateUserExp, getNewAge, newAge, updateUserAge }) => (

    <CardBody className='elBody'>
      <h2>Email: {user?.email}</h2>
      {user?.role === 0 ? (
        <h2>Plan: Free Plan</h2>
      ) : user?.role === 1 ? (
        <h2>Plan: Pay Plan</h2>
      ) : (
        <h2>Plan: Admin </h2>
      )}
      <CountrySelect stringCountry = {stringCountry} openCountry = {openCountry} newCountry={newCountry} selectCountry={selectCountry} handleChangeCountry={handleChangeCountry} updateUserCountry={updateUserCountry} />
      <CitySelect openCountry={openCountry} handleChangeCountry={handleChangeCountry} updateUserCountry={updateUserCountry} openCity = {openCity} stringCity = {stringCity} newCountry={newCountry} newCity={newCity} selectCity={selectCity} handleChangeCity={handleChangeCity} updateUserCity={updateUserCity} />

      {!user?.sport ? <h2>Deporte: <select value={newSport} onChange={selectSport}>
        {deportes.map((deporte) => (
          <option> {deporte}</option>
        ))}
      </select> <Button color="warning" variant="bordered" size="sm" onClick={updateUserSport} > Accept </Button> </h2>
      :<h2> Deporte: {user?.sport?.name}</h2>}

      {!user?.age ? <h2>Edad:  <InputExp getNewAge={getNewAge} newAge={newAge}  /> <Button color="warning" variant="bordered" size="sm" onClick={updateUserAge} > Accept </Button> </h2>
      : <h2> Edad: {user?.age} </h2>
      }

      {!user?.expYearsSports ? <h2>Años de experiencia: <InputAge getNewExp={getNewExp} newExp={newExp}  /> <Button color="warning" variant="bordered" size="sm" onClick={updateUserExp} > Accept </Button> </h2>
      : <h2> Años de experiencia: {user?.expYearsSports}  </h2> 
      }
      
      
    </CardBody>
  );