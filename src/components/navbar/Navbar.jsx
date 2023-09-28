'use client';
import React from 'react';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarMenuItem,
	Button,
	NavbarBrand,
	User,
} from '@nextui-org/react';
import { toastError } from '@/helpers/toast';
import { deleteCookie } from 'cookies-next';

export default function Nav() {
	const { status, data: session, update } = useSession();

	// const status = 'authenticated';

	const router = useRouter();
	const routes = [
		{ label: 'Home', route: '/' },
		{ label: 'About Us', route: '/about' },
	];

	const handleLogout = async () => {
		try {
			deleteCookie('jsdklfsdjklfdsjfds');
			await signOut();
			router.push('/auth');
		} catch (error) {
			toastError('Ocurrio un error en el cierre de sesión');
		}
	};
	console.log(session?.token);

	return (
		<Navbar className='navcolor h-40 bg-primary p-3 w-full'>
			<NavbarContent className='sm:hidden' justify='start'>
				<NavbarMenuToggle className='text-foreground' />
			</NavbarContent>

			<NavbarContent className='sm:hidden pr-3' justify='center'>
				<NavbarBrand>
					<Link href='/' className='Navbar__logo'>
						<Image src={logo} priority alt='The fourth element logo' />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4' justify='start'>
				<NavbarBrand>
					<Link href='/' className='Navbar__logo'>
						<Image src={logo} priority alt='The fourth element logo' />
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4 ' justify='center'>
				{routes.map(({ label, route, index }) => (
					<NavbarMenuItem key={`${route}-${index}`}>
						<Link
							className='w-full text-l text-foreground'
							color={
								index === 2
									? 'warning'
									: index === routes.length - 1
									? 'danger'
									: 'foreground'
							}
							href={route}>
							{label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarContent>

			<NavbarMenu className='top-40'>
				{routes.map(({ label, route, index }) => (
					<NavbarMenuItem key={`${route}-${index}`}>
						<Link
							className='w-full text-l'
							color={
								index === 2
									? 'warning'
									: index === routes.length - 1
									? 'danger'
									: 'foreground'
							}
							href={route}>
							{label}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>

			{status === 'authenticated' ? (
				<NavbarContent justify='end'>
					<NavbarItem>
						<Dropdown>
							<DropdownTrigger>
								<User
									avatarProps={
										// session?.token?
										session?.token?.picture?.length > 5 ? ({src:session.token.picture}):({src:session?.token?.user?.image_profile })
									}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Static Actions'>
								<DropdownItem key='profile'>
									<Link href={'/profile'}>Mi cuenta</Link>
								</DropdownItem>
								{session?.token?.user?.role >= 2 ? (
									<DropdownItem onClick={() => router.push('/dashboard')}>
										Panel
									</DropdownItem>
								) : (
									<DropdownItem onClick={() => router.push('/course')}>
										Curso
									</DropdownItem>
								)}
								<DropdownItem key='settings'>
									<Link href={'/profile/settings'}>Editar cuenta</Link>
								</DropdownItem>

								<DropdownItem
									key='logout'
									className='text-danger'
									color='danger'
									onClick={handleLogout}>
									Cerrar sesión
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				</NavbarContent>
			) : (
				<NavbarContent justify='end'>
					<NavbarItem className='hidden lg:flex'>
						<Button
							as={Link}
							color='foreground'
							href='/auth'
							variant='flat'
							className='  text-l text-foreground border-solid border-1 border-blue-500'>
							Login
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color='warning'
							href='/auth'
							variant='flat'
							className='text-l'>
							Sign Up
						</Button>
					</NavbarItem>
				</NavbarContent>
			)}
		</Navbar>
	);
}
