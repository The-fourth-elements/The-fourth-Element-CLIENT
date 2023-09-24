//renderCell estaba memoizada originalmente en UsersSection
'use client';


import React from 'react';

import {
	Button,
	User,
	Chip,
	Tooltip,

} from '@nextui-org/react';

import { EditIcon } from '../assets/svg-jsx/EditIcon';
import { DeleteIcon } from '../assets/svg-jsx/DeleteIcon';
import { EyeIcon } from '../assets/svg-jsx/EyeIcon';

const statusColorMap = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
};

const userRoles = {
	0: 'Free',
	1: 'Paid',
	2: 'Moderator',
	3: 'Administrator',
};



function renderCell(user, columnKey, deleteHandler) {
	const cellValue = user[columnKey];

	switch (columnKey) {
		case 'name':
			return (
				<User
					classNames={{
						name: 'text-3xl',
						description: 'text-lg text-default-800',
					}}
					avatarProps={{ radius: 'lg', src: user.profile_img, size: 'lg' }}
					description={user.email}
					name={user.username}
					size='xl'>
					{user.email}
				</User>
			);
		case 'plan':
			return (
				<div className='flex flex-col'>
					<p className='text-bold text-lg capitalize text-default-800'>
						{userRoles[user.role]}
					</p>
				</div>
			);
		case 'status':
			return (
				<Chip
					className='capitalize'
					color={user.status ? statusColorMap.active : statusColorMap.vacation}
					size='lg'
					variant='flat'>
					{cellValue ? 'Online' : 'Offline'}
				</Chip>
			);
		case 'actions':
			return (
				<div className='relative flex items-center gap-2'>
					<Tooltip content='Details'>
						<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
							<EyeIcon />
						</span>
					</Tooltip>
					<Tooltip content='Edit user'>
						<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
							<EditIcon />
						</span>
					</Tooltip>
					<Tooltip color='danger' content='Delete user'>
						<Button className='text-lg text-danger cursor-pointer active:opacity-50' onPress={ () => deleteHandler(user._id)}>
							<DeleteIcon />
						</Button>
					</Tooltip>
				</div>
			);
		default:
			return cellValue;
	}
}

export default renderCell
