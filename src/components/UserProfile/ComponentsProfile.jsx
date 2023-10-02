import InputName from "./input";
import {Card, CardHeader, CardBody, Image, CircularProgress, Button } from '@nextui-org/react';
import { EditIcon } from "@/assets/svg-jsx/EditIcon";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

export const NameEditor = ({ user, openName, setOpenName, newName, getNewName, updateUser }) => {
    if (openName) {
      return (
        <h1>
          <InputName getNewName={getNewName} />
          <Button size="sm" title="back to" color="warning" variant="bordered" onClick={() => setOpenName(false)} isIconOnly>
            ↩
          </Button>
          <Button color="warning" variant="bordered" size="sm" onClick={updateUser}>Accept</Button>
        </h1>
      );
    } else {
      return (
        <h1>
          Name: {user.username}
          <Button title="Edit Name" color="warning" variant="bordered" onClick={() => setOpenName(true)} size="sm" isIconOnly>
            <EditIcon />
          </Button>
        </h1>
      );
    }
  };

  export const CountryEditor = ({ user, openCountry, setOpenCountry, newCountry, selectCountry, updateUser }) => {
    if (openCountry) {
      return (
        <h2>
          Country: 
          <CountryDropdown
            name='country'
            autoComplete='on'
            id='country'
            value={newCountry}
            onChange={selectCountry}
            className='select'
          />
          <Button color="warning" variant="bordered" title="back to" onClick={() => setOpenCountry(false)} isIconOnly> ↩ </Button>
          <Button onClick={updateUser} color="warning" variant="bordered">Accept</Button>
        </h2>
      );
    } else {
      return (
        <h2>
          Country: {user.nation}
          <Button isIconOnly color="warning" variant="bordered" title="Edit Country" onClick={() => setOpenCountry(true)}>
            <EditIcon />
          </Button>
        </h2>
      );
    }
  };

  export const CityEditor = ({ user, openCity, setOpenCity, newCity, selectCity, updateUser }) => {
    if (openCity) {
      return (
        <h2>
          City: 
          <RegionDropdown
            country={user.nation} // Asumiendo que necesitas el país para seleccionar la ciudad
            value={newCity}
            id='state'
            onChange={selectCity}
            className='group-select'
          />
          <Button isIconOnly color="warning" variant="bordered" title="back to" onClick={() => setOpenCity(false)}> ↩ </Button>
          <Button color="warning" variant="bordered" onClick={updateUser}>Accept</Button>
        </h2>
      );
    } else {
      return (
        <h2>
          City: {user.city}
          <Button isIconOnly color="warning" variant="bordered" title="Edit City" onClick={() => setOpenCity(true)}>
            <EditIcon />
          </Button>
        </h2>
      );
    }
  };
