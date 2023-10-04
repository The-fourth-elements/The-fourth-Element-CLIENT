//renderCell estaba memoizada originalmente en UsersSection
'use client';

import React from 'react';

import { Button, User, Chip, Tooltip, Link } from '@nextui-org/react';
import { EditIcon } from '../assets/svg-jsx/EditIcon';
import { DeleteIcon } from '../assets/svg-jsx/DeleteIcon';
import { EyeIcon } from '../assets/svg-jsx/EyeIcon';
import Image from 'next/image';
import RestoreIcon from '../assets/svg/RestoreIcon.svg';

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


function renderCell(user, columnKey, deleteHandler, restoreHandler, handleClick) {
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
		case 'actions':
			return (
				<div className='relative flex items-center gap-2'>
					<Tooltip content='Details'>
						<Button
							href={'/dashboard/users-section/detail/' + user._id}
							as={Link}
							className='modern bg-primary text-lg text-black'
							variant='solid'>
							<EyeIcon />
						</Button>
						
					</Tooltip>
					<Tooltip content='Edit user'>
						<Button
							className='modern bg-primary-500 text-lg cursor-pointer active:opacity-50 text-black'
							href={'/dashboard/users-section/user-edit/' + user._id}
							as={Link}>
							<EditIcon />
						</Button>
					</Tooltip>
					{user.deleted ? (
						<Tooltip color='foreground' content='Restore user'>
							<Button
								className='modern text-lg cursor-pointer active:opacity-50'  
								onPress={() => restoreHandler(user.email)}>
								<Image src={RestoreIcon} alt='Restore' className='w-5' />
							</Button>
						</Tooltip>
					) : (
						<Tooltip color='danger' content='Delete user'>
							<Button
								className='modern text-lg cursor-pointer active:opacity-50 content'
								onPress={() => deleteHandler(user._id)}>
								<DeleteIcon />
							</Button>
						</Tooltip>
					)}
				</div>
			);
		default:
			return cellValue;
	}
}

export default renderCell;
