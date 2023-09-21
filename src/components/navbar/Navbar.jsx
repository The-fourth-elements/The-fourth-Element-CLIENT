'use client'
import React from 'react';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import { userAuth } from '../../app/context/authContext';
import { useRouter } from 'next/navigation';

import {
  Navbar,
  NavbarContent, 
  NavbarItem, 
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Link, 
  Button,
  NavbarBrand
} from "@nextui-org/react";

export default function Nav() {

  const router = useRouter;
  const { logOut, user } = userAuth(); 
  const access = true; // Provisorio hasta tener la variable de acceso del usuario para hacer el renderizado condicional
  const routes = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about' }
  ];

  const handleLogout = async () => {
    try {
      await logOut();
	    router.push('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Navbar isBordered className="h-40 bg-foreground p-3">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className='text-background'/>
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <Link href='/' className='Navbar__logo'>
            <Image src={logo} priority alt='The fourth element logo' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Link href='/' className='Navbar__logo' >
            <Image src={logo} priority alt='The fourth element logo' />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {routes.map(({ label, route, index }) => (
            <NavbarMenuItem key={`${route}-${index}`}>
              <Link
                className="w-full text-xl text-background"
                color={
                  index === 2 ? "warning" : index === routes.length - 1 ? "danger" : "foreground"
                }
                href={route}
              >
                {label}
              </Link>
            </NavbarMenuItem>
        ))}
      </NavbarContent>

      <NavbarMenu className='top-40'>
          {routes.map(({ label, route, index }) => (
            <NavbarMenuItem key={`${route}-${index}`}>
              <Link
                className="w-full text-xl"
                color={
                  index === 2 ? "warning" : index === routes.length - 1 ? "danger" : "foreground"
                }
                href={route}
              >
                {label}
              </Link>
            </NavbarMenuItem>
          ))}
          {
          access ?
          <NavbarMenuItem>
            <Link className="w-full text-xl text-foreground" href="/login">
              Login
            </Link> 
          </NavbarMenuItem> :
          null
          }
      </NavbarMenu>

      {
        access ?
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="foreground" href="/auth" variant="flat" className='text-xl border border-solid border-1 border-blue-500'>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="warning" href="/auth" variant="flat" className='text-xl'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent> :
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="warning" href="/" variant="flat" className='text-xl'>
              Log Out
            </Button>
          </NavbarItem>
        </NavbarContent>
      }
    </Navbar>
  );
}
