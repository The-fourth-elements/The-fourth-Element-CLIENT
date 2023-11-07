'use client';
import { Select, SelectItem } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useFilterKnowRegister } from '@/zustand/store/filterKnowRegister';
import FilterBetweenDates from '@/components/filters-between-dates/FilterBetweenDates';

const FilterKnowRegister = () => {
	const { filtersActive, setFilter } = useFilterKnowRegister();
	const filters = [
		{ id: 1, value: 'Modulo' },
		{ id: 2, value: 'Fecha' },
	];
	const [selectedFilters, setSelectedFilters] = useState(new Set());

	const handleSelectionChange = e => {
		const values = e.target.value.split(',').filter(value => value != '');
		setSelectedFilters(new Set(values));
		if (values.length < 1) {
			setFilter('Modulo', false);
			setFilter('Fecha', false);
			return;
		}
		filters.forEach(({ value }) => {
			const filterIsActive = filtersActive[value];
			const filterIsSelected = values.includes(value);
			filterIsActive !== filterIsSelected && setFilter(value, filterIsSelected);
		});
	};
	return (
		<div className='flex flex-col items-center'>
			<Select
				label='Filtros'
				selectionMode='multiple'
				placeholder='Seleccione un filtro'
				selectedKeys={selectedFilters}
				onChange={handleSelectionChange}
				className='max-w-[90%]'>
				{filters.map(({ id, value }) => {
					return (
						<SelectItem key={value} id={id} value={value}>
							{value}
						</SelectItem>
					);
				})}
			</Select>
            {filtersActive.Fecha && (<FilterBetweenDates/>)}
		</div>
	);
};

export default FilterKnowRegister;
