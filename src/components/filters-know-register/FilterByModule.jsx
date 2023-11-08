import React, { useState } from 'react';
import { Checkbox } from '@nextui-org/react';
import { useFilterKnowRegister } from '@/zustand/store/filterKnowRegister';

const FilterByModule = ({ className, modules }) => {
	const { setModulesToShowed } = useFilterKnowRegister();
	const detectChange = event => {
		const { value, checked } = event.target;
		setModulesToShowed(value, checked);
	};
	if (!modules) {
		return <>Ocurrio un error</>;
	}
	if (modules?.lenght < 1) {
		return <>Aun no hay modulos</>;
	}
	return (
		<div className={`flex flex-wrap items-center p-3 gap-4 justify-center ${className}`}>
			{modules?.map(({ _id, name, startingDate }) => {
				return (
					<Checkbox
						key={startingDate}
						id={_id}
						value={_id}
						name={name}
						onChange={detectChange}>
						{name}
					</Checkbox>
				);
			})}
		</div>
	);
};

export default FilterByModule;
