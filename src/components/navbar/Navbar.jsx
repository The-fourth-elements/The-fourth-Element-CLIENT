'use client';
import React from 'react';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../src/assets/svg/logo.svg';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
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
import { useUserProfile } from '@/zustand/store/userProfile';
import { getCookie } from 'cookies-next';

export default function Nav() {
	const { status, data: session } = useSession();
	const router = useRouter();
	const { getProfile, user } = useUserProfile();
	const cookie = getCookie('jsdklfsdjklfdsjfds');

	useEffect(() => {
		getProfile(cookie);
	}, [session]);

	const handleLogout = async () => {
		try {
			deleteCookie('jsdklfsdjklfdsjfds');
			await signOut();
			router.push('/auth');
		} catch (error) {
			toastError('Ocurrio un error en el cierre de sesión');
		}
	};
	let routesNav = [
		{ label: 'Acerca', route: '/about' },
		{ label: 'Precios', route: '/prices' },
	];
	if (user?.role === 1) {
		routesNav = routesNav.filter(route => route.route !== '/prices');
	}
	const routes = routesNav;
	return (
		<Navbar
			isBordered
			className=' bg-background justify-items-stretch p-3 w-full fix-Header sm:h-44 h-36'>
			<NavbarContent className='sm:hidden' justify='start'>
				<NavbarMenuToggle className='text-foreground' />
			</NavbarContent>

			<NavbarContent className='sm:hidden pr-3' justify=''>
				<NavbarBrand>
					<Link href='/' className='Navbar__logo'>
						<Image
							className='h-auto'
							src={logo}
							priority
							alt='The fourth element logo'
						/>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className='hidden sm:flex gap-4 ' justify='start'>
				<NavbarBrand>
					<Link href='/' className='Navbar__logo'>
						<Image
							className=' mt-5 ml-8 h-auto'
							src={logo}
							priority
							alt='The fourth element logo'
						/>
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className='flex justify-evenly items-center gap-10 mb-7 sm:mb-9 md:mb-12'
				justify='end'>
				<NavbarContent className='hidden sm:flex gap-10 w-fit ' justify='end'>
					{routes.map(({ label, route, index }) => (
						<NavbarMenuItem key={`${route}-${index}`}>
							<Link
								className='text-l whitespace-no-wrap text-foreground text-sm'
								href={route}>
								<p>{label}</p>
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarContent>

				<NavbarMenu className='top-40'>
					{routes.map(({ label, route, index }) => {
						return (
							<NavbarMenuItem key={`${route}-${index}`}>
								<Link className='w-full text-l' href={route}>
									{label}
								</Link>
							</NavbarMenuItem>
						);
					})}
				</NavbarMenu>

				{status === 'authenticated' ? (
					<NavbarItem>
						<Dropdown>
							<DropdownTrigger>
								<User
									className='cursor-pointer w-fit h-fit'
									avatarProps={
										user?.profile_img?.secure_url
											? { src: user?.profile_img?.secure_url }
											: session?.token?.picture?.length > 5
											? { src: session.token.picture }
											: { src: session?.token?.user?.image_profile }
									}
								/>
							</DropdownTrigger>
							<DropdownMenu aria-label='Static Actions'>
								<DropdownItem key='profile' textValue='profile'>
									<Link href={'/profile'}>Mi cuenta</Link>
								</DropdownItem>
								{session?.token?.user?.role >= 2 ? (
									<DropdownItem
										onClick={() => router.push('/dashboard')}
										textValue='profile'>
										Panel
									</DropdownItem>
								) : (
									<DropdownItem
										onClick={() => router.push('/course')}
										textValue='profile'>
										Curso
									</DropdownItem>
								)}

								<DropdownItem
									key='logout'
									className='text-danger'
									color='danger'
									onClick={handleLogout}
									textValue='profile'>
									Cerrar sesión
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarItem>
				) : (
					<NavbarItem>
						<Button
							as={Link}
							color='foreground'
							href='/auth'
							variant='flat'
							className=' bg-primary text-foreground rounded-full px-9 h-fit py-1.5 '>
							Login
						</Button>
					</NavbarItem>
				)}
			</NavbarContent>
		</Navbar>
	);
}
