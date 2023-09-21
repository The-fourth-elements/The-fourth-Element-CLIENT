'use client';

import React from 'react';

import useFetch from '@/hooks/useFetch';
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
} from '@nextui-org/react';

import { columns, users } from './data';


import { EditIcon } from '../../assets/svg-jsx/EditIcon';
import { DeleteIcon } from '../../assets/svg-jsx/DeleteIcon';
import { EyeIcon } from '../../assets/svg-jsx/EyeIcon';

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
                    {cellValue ? "Paid" : "Free"}
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






export default function UsersSection() {

    const obj1 = useFetch('http://localhost:3001/users');

    const [page, setPage] = React.useState(1);
    const rowsPerPage = 8;
  
    const pages = Math.ceil(obj1?.data?.length / rowsPerPage);
  
    const items = React.useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
  
      return obj1?.data?.slice(start, end);
    }, [page, obj1?.data]);


	

	

	return obj1.isLoading ? (
		<h1> loading</h1>
	) : (
			<Table  className='dark text-foreground'
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
							align={column.uid === 'actions' ? 'center' : 'start'}>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				{/* <TableBody items={obj1.data}> */}
				<TableBody items={items}>
					{item => (
						<TableRow key={item._id}>
							{columnKey => (
								<TableCell>{renderCell(item, columnKey)}</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
	);
}
