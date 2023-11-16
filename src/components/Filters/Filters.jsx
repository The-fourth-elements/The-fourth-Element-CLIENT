'use client';
import { useUsersStore } from '@/zustand/store/usersStore';
import { useState, useEffect } from 'react';
import { Select, SelectSection, SelectItem, Button } from '@nextui-org/react';
import { useAllCountrys } from '@/zustand/store/allCountrys';
import './styles.scss';
import { useAllSports } from '@/zustand/store/allSports';

const Filters = () => {
	const { users, orderUsersName, getDeletedUsers } = useUsersStore();
	const [showDeletedUsers, setShowDeletedUsers] = useState(true);

	const { allSports, getSports } = useAllSports();
	let { getCountrys, allCountrys } = useAllCountrys();
	const { filterUsers } = useUsersStore();
	let [orderName, setOrderName] = useState('');

	const handleOrderName = event => {
		const selectOrderName = event.target.value;
		setOrderName(selectOrderName);
		orderUsersName(selectOrderName);
		console.log(users);
	};

	useEffect(() => {
		getCountrys();
		getSports();
	}, []);

	let [filterNationality, setFilterNationality] = useState('all');
	let [filterPlan, setFilterPlan] = useState('all');
	let [filterSport, setFilterSport] = useState('all');

	const handleGetDeletedUsers = () => {
		setShowDeletedUsers(!showDeletedUsers);
		getDeletedUsers(showDeletedUsers);
	};

	const handleFilterNationality = event => {
		const selectedNationality = event.target.value;
		setFilterNationality(selectedNationality);
	};

	const handleFilterPlan = event => {
		const selectedTypePlan = event.target.value;
		setFilterPlan(selectedTypePlan);
	};

	const handleFilterSport = event => {
		const selectedSport = event.target.value;
		setFilterSport(selectedSport);
		console.log(allSports);
	};

	useEffect(() => {
		filterUsers(filterNationality, filterPlan, filterSport);
	}, [filterNationality, filterPlan, filterSport]);
	
	return (
		<div className='mainFilter'>
			{Array.isArray(allCountrys) && (
				<div className='diver'>
					<label htmlFor=''>FILTER POR PAIS</label>
					<select
						className='select'
						label='Select a country'
						onChange={handleFilterNationality}
						value={filterNationality}>
						<option defaultValue={'all'} value='all'>
							Todos
						</option>
						{allCountrys.map(country => (
							<option value={country?._id} key={country?._id}>
								{country?.name}
							</option>
						))}
					</select>
				</div>
			)}
			<div className='diver'>
				<label htmlFor=''>FILTRAR POR PLAN</label>
				<select
					className='select'
					label='Select a plan'
					onChange={handleFilterPlan}
					value={filterPlan}>
					<option value='all'>Todos</option>
					<option value='free'>Plan Gratis</option>
					<option value='pay'>Plan Pago</option>
					<option value='moderators'>Moderador</option>
				</select>
			</div>
			<div className='diver'>
				<label htmlFor=''>ORDER BY NAME</label>
				<select
					className='select'
					label='Select a name'
					onChange={handleOrderName}
					value={orderName}>
					<option value='nameDesc'>A - Z</option>
					<option value='nameAsc'>Z - A</option>
				</select>
			</div>
			{Array.isArray(allSports) && (
				<div className='diver'>
					<label htmlFor=''>FILTRAR POR DEPORTE</label>
					<select
						className='select'
						label='Select a sport'
						onChange={handleFilterSport}
						value={filterSport}>
						<option value='all'>Todos</option>
						{allSports.map(deporte => (
							<option key={deporte?._id} value={deporte?._id}>
								{deporte?.name}
							</option>
						))}
					</select>
				</div>
			)}
			<Button className=' select w-fit mt-5 max-h-[30px] ml-[10px]' onClick={handleGetDeletedUsers}>
				{showDeletedUsers ? 'Ver usuarios eliminados' : 'Ver usuarios existentes'}
			</Button>
		</div>
	);
};

export default Filters;
