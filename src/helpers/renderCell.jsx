//renderCell estaba memoizada originalmente en UsersSection
'use client';

import React from 'react';

import { Button, User, Chip, Tooltip, Link } from '@nextui-org/react';
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

function detailHandler(id) {}

function renderCell(user, columnKey, deleteHandler, handleClick) {
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
						<Button
							href={'/dashboard/users-section/detail/' + user._id}
							as={Link}
							color='primary'
							variant='solid'>
							<EyeIcon />
						</Button>
						{/* <Button
							className='text-lg  cursor-pointer active:opacity-50'
							onPress={() => deleteHandler(user._id)}>
							
							<Link to />
						</Button> */}
					</Tooltip>
					<Tooltip content='Edit user'>
						<Button
							className='text-lg text-danger cursor-pointer active:opacity-50'
							href={'/dashboard/users-section/user-edit/' + user._id}
							as={Link}>
							<EditIcon />
						</Button>
					</Tooltip>
					<Tooltip color='danger' content='Delete user'>
						<Button
							className='text-lg text-danger cursor-pointer active:opacity-50'
							onPress={() => deleteHandler(user._id)}>
							<DeleteIcon />
						</Button>
					</Tooltip>
				</div>
			);
		default:
			return cellValue;
	}
}

export default renderCell;
