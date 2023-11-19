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
import { getCookie, setCookie } from 'cookies-next';

export default function Nav() {
	const { status, data: session } = useSession();
	const router = useRouter();
	const { getProfile, user } = useUserProfile();
	const cookie = getCookie('jsdklfsdjklfdsjfds');

	useEffect(() => {
		if (cookie) {
			getProfile(cookie);
		} else if (session?.token?.user?.id) {
			const id = session?.token?.user?.id;
			setCookie('jsdklfsdjklfdsjfds', id);
			getProfile(id);
		}
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
			className=' bg-background justify-between p-3 w-full fix-Header sm:h-44 h-36'>
			<NavbarBrand className='sm:hidden' justify='start'>
				<NavbarMenuToggle className='text-foreground' />
			</NavbarBrand>

			<NavbarContent className='sm:hidden pr-3' justify=''>
				<NavbarItem>
					<Link href='/' className='Navbar__logo' aria-label='home'>
						<Image
							className='h-auto'
							src={logo}
							priority
							alt='The fourth element logo'
						/>
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarBrand className='hidden sm:flex gap-4 ' justify='start'>
				<Link href='/' className='Navbar__logo'>
					<Image
						className=' mt-5 ml-8 h-auto'
						src={logo}
						priority
						alt='The fourth element logo'
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent className='hidden sm:flex gap-10 w-full flex-end mx-5' justify='end'>
				{routes.map(({ label, route, index }) => (
					<li key={route + index}>
						<Link
							className='text-l whitespace-no-wrap text-foreground text-sm'
							href={route}
							aria-label={label}>
							{label}
						</Link>
					</li>
				))}
			</NavbarContent>

			<NavbarMenu className='top-36'>
				{routes.map(({ label, route, index }) => {
					return (
						<li key={route + index}>
							<Link
								key={route + index}
								className='w-full text-l'
								href={route}
								aria-label={label}>
								{label}
							</Link>
						</li>
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
					<Button
						as={Link}
						color='foreground'
						href='/auth'
						variant='flat'
						className=' bg-primary text-foreground rounded-full px-9 h-fit py-1.5 w-fit'>
						Login
					</Button>
			)}
		</Navbar>
	);
}
