'use client';
import { useModulesStore } from '@/zustand/store/modulesStore';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@nextui-org/react';

const SelectModule = ({moduleSelected}) => {
	const { modules, getModules } = useModulesStore();
	useEffect(() => {
		if (modules?.length === 0) {
			getModules();
		}
	}, []);
    
	return (
		<Select className='mt-6 mb-6' label='Seleccionar Módulo'>
			{modules?.map((f, index) => {
				return (
					<SelectItem key={index} value={f?._id} onClick={()=>{moduleSelected(f?._id)}}>
						Modulo {index + 1}
					</SelectItem>
				);
			})}
		</Select>
	);
};

export default SelectModule;
