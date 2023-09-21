'use client';

import React from 'react';
import { useEffect, useState } from "react"

import useFetch from '@/hooks/useFetch';
import { useUsersStore } from "../../store/usersStore"
// import renderCell from '../../helpers/renderCell.jsx'; no se aplican las modificaciones de estilos si renderCell es un componente aparte

import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Tooltip,
	getKeyValue,
	Link,
	Pagination,
    Button
} from '@nextui-org/react';

// import { columns, users } from './data';

import { EditIcon } from '../../assets/svg-jsx/EditIcon';
import { DeleteIcon } from '../../assets/svg-jsx/DeleteIcon';
import { EyeIcon } from '../../assets/svg-jsx/EyeIcon';

const statusColorMap = {
	active: 'success',
	paused: 'danger',
	vacation: 'warning',
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
					name={cellValue + ' ' + user.lastName}
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

const userRoles = {
	0: 'Free',
	1: 'Paid',
	2: 'Moderator',
	3: 'Administrator',
};

const columns = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'PLAN', uid: 'plan' },

	{ name: 'STATUS', uid: 'status' },
	{ name: 'ACTIONS', uid: 'actions' },
];



export default function UsersSection() {
    const {users, getUsers, deleteUser} = useUsersStore()
    const [items, setItems] = useState();

    useEffect(()=> {
        getUsers()
    }, [])


	const [page, setPage] = React.useState(1);
	const rowsPerPage = 8;

	const pages = Math.ceil(users?.length / rowsPerPage);

	useEffect(() => {
        // getUsers()

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        console.log(users);
        const newItems = users?.slice(start, end);
    
        setItems(newItems);
      }, [users, page, rowsPerPage]);

	return users.length === 0 ? (
		<h1> loading</h1>
	) : (
		<div>
			<Table
				className='dark text-foreground'
				classNames={{
					table: 'min-h-[50vh]',
				}}
				aria-label='Example table with custom cells'
				bottomContent={
					<div className='flex w-full justify-center'>
						<Pagination
							isCompact
							showControls
							showShadow
							color='primary'
							page={page}
							total={pages}
							onChange={page => setPage(page)}
						/>
					</div>
				}>
				<TableHeader columns={columns}>
					{column => (
						<TableColumn
							key={column.uid}
							align={
								column.uid === 'actions' || column.uid === 'plan'
									? 'center'
									: 'start'
							}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				{/* <TableBody items={obj1.data}> */}
				<TableBody items={items}>
					{item => (
						<TableRow key={item._id}>
							{columnKey => (
								<TableCell>{renderCell(item, columnKey, deleteUser)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
