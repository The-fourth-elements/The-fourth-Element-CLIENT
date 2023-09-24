"use client"

import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
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

import { useUsersStore } from "@/zustand/store/usersStore.js"


const columns = [
	{ name: 'NAME', uid: 'name' },
	{ name: 'PLAN', uid: 'plan' },
	{ name: 'STATUS', uid: 'status' },
	{ name: 'ACTIONS', uid: 'actions' },
];

export default function UsersSection() {
	const { users, getUsers, deleteUser } = useUsersStore();
	const [items, setItems] = useState();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [userIdToDelete, setUserIdToDelete] = useState('');

	const handleDelete = (userId) => {
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
	}, []);

	const [page, setPage] = React.useState(1);
	const rowsPerPage = 8;

	const pages = Math.ceil(users?.length / rowsPerPage);

	useEffect(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		const newItems = users?.slice(start, end);
		setItems(newItems);
	}, [users, page, rowsPerPage]);

	return users?.length === 0 && !items ? (
		<h1> loading</h1>
	) : (
		items?.length > 0 ? (
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
					<TableBody items={items}>
						{item => (
							<TableRow key={item._id}>
								{columnKey => (
									<TableCell>
										{renderCell(item, columnKey, handleDelete)}
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
						<Button autoFocus onClick={handleConfirmDelete}>
							Confirmar
						</Button>,
						<Button onClick={() => setIsModalOpen(false)}>Cancelar</Button>,
					]}
				/>
			</div>
		) : (
			<h1> NO HAY USUARIOS </h1>
		)
	);
}
