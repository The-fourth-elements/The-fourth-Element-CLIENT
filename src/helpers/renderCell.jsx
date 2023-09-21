//renderCell estaba memoizada originalmente en UsersSection
'use client';


import React from 'react';

import {
	
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


function renderCell (user, columnKey) {
    const cellValue = user[columnKey];

    switch (columnKey) {
        case 'name':
            return (
                <User
                    classNames={{
                        name: 'text-3xl',
                        description: 'text-lg text-default-800',
                    }}
                    avatarProps={{ radius: 'lg', src: user.avatar, size: 'lg' }}
                    description={user.email}
                    name={cellValue}
                    size='xl'>
                    {user.email}
                </User>
            );
        case 'role':
            return (
                <div className='flex flex-col'>
                    <p className='text-bold text-lg capitalize'>{cellValue}</p>
                    <p className='text-bold text-lg capitalize text-default-800'>
                        {user.team}
                    </p>
                </div>
            );
        case 'status':
            return (
                <Chip
                    className='capitalize'
                    color={statusColorMap[user.status]}
                    size='lg'
                    variant='flat'>
                    {cellValue}
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
                        <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            );
        default:
            return cellValue;
    }
};

export default renderCell
