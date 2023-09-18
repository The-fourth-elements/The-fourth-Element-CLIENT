'use client'
import React from 'react';
import Link from 'next/link';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import burger from '../../assets/svg/burger.svg';
import x from '../../assets/svg/x-mark.svg';
import { userAuth } from '@/app/context/authContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
	const router = useRouter
  const { logOut, user } = userAuth(); 
  const routes = [
    { label: 'Home', route: '/', className: '' },
    { label: 'About Us', route: '/about', className: '' },
    { label: 'Login', route: '/auth', className: '' },
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
    <>
      <nav className='Navbar'>
        <div className='Navbar-div'>
          <Link href='/' className='Navbar__logo'>
            <Image src={logo} priority alt='The fourth element logo' />
          </Link>
          <input type='checkbox' id='check' />
          <label htmlFor='check' className='burger'>
            <Image src={burger} alt='burger' id='burger' />
            <Image src={x} alt='x-mark' id='x' />
          </label>
          <ul className='Navbar__ul'>
            {routes.map(({ label, route, className }) => (
              <li key={route} className='Navbar__ul--li'>
                <Link href={route} className={'Navbar__ul--li-' + className}>
                  {label}
                </Link>
              </li>
            ))}
            {user && (
              <li className='Navbar__ul--li'>
                <button onClick={handleLogout} className='Navbar__ul--logout-button'>
                  Cerrar sesión
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
