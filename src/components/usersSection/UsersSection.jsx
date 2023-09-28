'use client';

import React, { useState, useEffect } from 'react';
import {
	Card,
	Text,
	Button,
	Skeleton,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Pagination,
} from '@nextui-org/react';
import renderCell from '../../helpers/renderCell.jsx';
import CustomModal from '../../helpers/CustomModal.jsx';
import { useRouter } from 'next/router';

import { useUsersStore } from '@/zustand/store/usersStore.js';

import './UsersSection.scss';

const columns = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'PLAN', uid: 'plan' },
	{ name: 'STATUS', uid: 'status' },
	{ name: 'ACTIONS', uid: 'actions' },
];

export default function UsersSection() {
	const [isLoading, setIsLoading] = useState(true);
	const { users, getUsers, deleteUser } = useUsersStore();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState('');
	// const router = useRouter()
	const handleClick = () => {
		// router.push(`/dashboard/users-section/user-edit/6515526af3ae6387c3766af3`);
	  };
	const handleDelete = userId => {
		setUserIdToDelete(userId);
		setIsModalOpen(true);
	};

	const handleConfirmDelete = () => {
		// Eliminar el usuario de la base de datos
		deleteUser(userIdToDelete);
		setIsModalOpen(false);
	};

	useEffect(() => {
		getUsers();
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	}, []);

	const [page, setPage] = React.useState(1);
	const rowsPerPage = 8;

	const pages = Math.ceil(users?.length / rowsPerPage);


	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
	
		return users?.slice(start, end);
	  }, [page, users]);

	return (
		<div className='mainDiv'>
			{isLoading && (
				<Card className='h-[100vh] space-y-5 p-4' radius='2xl'>
					<p className='uppercase font-bold'>Loading Users</p>
					<Skeleton className='rounded-lg'>
						<div className='h-24 bg-default-300'></div>
					</Skeleton>
				</Card>
			)}
			{!isLoading &&
				(users?.length > 0 ? (
					<div>
						<Table
							className='dark text-foreground'
							classNames={{
								table: 'min-h-[91.4vh]',
							}}
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
							<TableBody items={items}>
								{item => (
									<TableRow key={item._id}>
										{columnKey => (
											<TableCell>
												{renderCell(item, columnKey, handleDelete, handleClick)}
											</TableCell>
										)}
									</TableRow>
								)}
							</TableBody>
						</Table>
						<CustomModal
							isOpen={isModalOpen}
							onClose={() => setIsModalOpen(false)}
							closeButton
							title='Confirmar eliminación'
							content='¿Está seguro de que desea eliminar este usuario?'
							actions={[
								<Button autoFocus onClick={handleConfirmDelete} color="danger">
									Confirmar
								</Button>,
								<Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
							]}
						/>
					</div>
				) : (
					<h1 className='nousers'>No hay usuarios</h1>
				))}
		</div>
	);
}
