import { Button } from '@nextui-org/react';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import {
	AnimatedCountryDropdown,
	AnimatedRegionDropdown,
} from '@/components/animated-components/DropdownSelectorRegion';

export const CountrySelect = ({
	stringCountry,
	openCountry,
	newCountry,
	selectCountry,
	handleChangeCountry,
	updateUserCountry,
	user,
}) => (
	<div>
		{openCountry ? (
			<h2>
				País:
				<AnimatedCountryDropdown
					country={newCountry}
					onChange={selectCountry}
					className={'max-w-full p-2 rounded-md'}
				/>
			</h2>
		) : (
			<h2>
				País: {user?.nation?.name}
				<Button
					className='button'
					isIconOnly
					color='warning'
					variant='bordered'
					title='Edit Country'
					onClick={handleChangeCountry}>
					<EditIcon />
				</Button>
			</h2>
		)}
	</div>
);

export const CitySelect = ({
	openCity,
	stringCity,
	newCountry,
	newCity,
	selectCity,
	handleChangeCity,
	updateUserCity,
	handleChangeCountry,
	openCountry,
	updateUserCountry,
	user,
}) => (
	<div>
		{openCountry ? (
			<h2>
				Ciudad:
				<AnimatedRegionDropdown
					country={newCountry}
					value={newCity}
					onChange={selectCity}
					className='w-full p-2 rounded-checked:bg-red-500 '
				/>
				<Button
					className='button'
					isIconOnly
					color='warning'
					variant='bordered'
					title='back to'
					onClick={handleChangeCountry}>
					↩
				</Button>
				<Button color='warning' variant='bordered' onClick={updateUserCountry}>
					Accept
				</Button>
			</h2>
		) : openCity ? (
			<h2>
				Ciudad:
				<AnimatedRegionDropdown
					country={newCountry}
					value={newCity}
					onChange={selectCity}
					className='max-w-full p-2 rounded-checked:bg-red-500 '
				/>
				<Button
					className='button'
					isIconOnly
					color='warning'
					variant='bordered'
					title='back to'
					onClick={handleChangeCity}>
					↩
				</Button>
				<Button color='warning' variant='bordered' onClick={updateUserCity}>
					Accept
				</Button>
			</h2>
		) : (
			<h2>
				Ciudad: {user?.city?.name}
				<Button
					className='button'
					color='warning'
					isIconOnly
					variant='bordered'
					title='Edit City'
					onClick={handleChangeCity}>
					<EditIcon />
				</Button>
			</h2>
		)}
	</div>
);
