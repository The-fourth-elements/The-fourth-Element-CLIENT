'use client';
import React from 'react';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import {
	Navbar,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarMenuItem,
	Button,
	NavbarBrand,
} from '@nextui-org/react';
import { toastError } from '@/helpers/toast';

export default function Nav() {
	const { status, data: session, update } = useSession();

	// const status = 'authenticated';

	const router = useRouter;
	const routes = [
		{ label: 'Home', route: '/' },
		{ label: 'About Us', route: '/about' },
	];

	const handleLogout = async () => {
		try {
			await signOut();
			router.push('/auth');
		} catch (error) {
			toastError('Ocurrio un error en el cierre de sesión');
		}
	};

	return (
		<Navbar className='navcolor h-40 bg-primary p-3 '>
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

			<NavbarContent className='hidden sm:flex gap-4 ' justify='end'>
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
				{status === 'unauthenticated' ? (
					<NavbarMenuItem>
						<Link className='w-full text-l text-foreground' href='/auth'>
							Login
						</Link>
					</NavbarMenuItem>
				) : (
					<NavbarMenuItem>
						<Link
							className='w-full text-l text-foreground'
							href='/auth'
							onClick={handleLogout}>
							Logout
						</Link>
					</NavbarMenuItem>
				)}
			</NavbarMenu>

			{status === 'authenticated' ? (
				<NavbarContent>
					<NavbarItem>
						<Button
							href={'/dashboard'}
							as={Link}
							
							variant='flat'
							>
							Dashboard
						</Button>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color='warning'
							href='/'
							variant='flat'
							className='text-l'
							onClick={handleLogout}>
							Log Out
						</Button>
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
