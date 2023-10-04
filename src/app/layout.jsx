
'use client';

import Nav from '../components/navbar/Navbar';
import './global.css';
import { Inter } from 'next/font/google';
import AuthContextProvider from './context/authContext';
import Provider from './provider.js';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import "react-toastify/ReactToastify.min.css"; //no quitar, son las toast.


export default function RootLayout({ children }) {
	return ( //className dark para aplicar el tema a toda la pagina
		<html lang='es' className='modern'> 
			<body>
				<AuthContextProvider>
					<Provider>
						<header>
							<Nav />
						</header>
						{children}
					</Provider>
				<ToastContainer/>
				</AuthContextProvider>
			</body>
		</html>
	);
}
