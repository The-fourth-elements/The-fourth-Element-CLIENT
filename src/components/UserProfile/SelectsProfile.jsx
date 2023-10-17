"use client"
import { Button } from '@nextui-org/react';
import { EditIcon } from "@/assets/svg-jsx/EditIcon";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

  export const CountrySelect = ({stringCountry, openCountry, newCountry, selectCountry, handleChangeCountry, updateUserCountry }) => (
    <div>
      {openCountry ? (
        <h2>
          País:
          <CountryDropdown
            name='country'
            autoComplete='on'
            id='country'
            value={newCountry}
            onChange={selectCountry}
            className='select'
          />

        </h2>
      ) : (
        <h2>
          País: {newCountry}
          <Button className='button' isIconOnly color="warning" variant="bordered" title="Edit Country" onClick={handleChangeCountry}>
            <EditIcon />
          </Button>
        </h2>
      )}
    </div>
  );

  export const CitySelect = ({ openCity, stringCity, newCountry, newCity, selectCity, handleChangeCity, updateUserCity, handleChangeCountry, openCountry, updateUserCountry }) => (
    <div>
      {openCountry ? 
      (
        <h2>
          Ciudad:
          <RegionDropdown
            country={newCountry}
            value={newCity}
            id='state'
            onChange={selectCity}
            className='group-select'
          />
          <Button className='button' isIconOnly color="warning" variant="bordered" title="back to" onClick={handleChangeCountry}> ↩ </Button>
          <Button color="warning" variant="bordered" onClick={updateUserCountry}> Accept </Button>
        </h2>
      )
      :openCity ? (
        <h2>
          Ciudad:
          <RegionDropdown
            country={newCountry}
            value={newCity}
            id='state'
            onChange={selectCity}
            className='group-select'
          />
          <Button className='button' isIconOnly color="warning" variant="bordered" title="back to" onClick={handleChangeCity}> ↩ </Button>
          <Button color="warning" variant="bordered" onClick={updateUserCity}> Accept </Button>
        </h2>
      ) : (
        <h2>
          Ciudad: {newCity}
          <Button className='button' color="warning" isIconOnly variant="bordered" title="Edit City" onClick={handleChangeCity}>
            <EditIcon />
          </Button>
        </h2>
      )}
    </div>
  );