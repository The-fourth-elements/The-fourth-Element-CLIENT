
'use client';

import Nav from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './global.css';
import { Inter } from 'next/font/google';
import Provider from './provider.js';
import '../styles/globals.scss';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import "react-toastify/ReactToastify.min.css"; //no quitar, son las toast.


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'The fourth elements',
	description: 'The fourth element is a mental training course',
};

export default function RootLayout({ children }) {
	return ( //className dark para aplicar el tema a toda la pagina
		<html lang='es' className='dark'> 
			<body className={inter.className}>
				<AuthContextProvider>
					<Provider>
						<header>
							<Nav />
						</header>
						{children}
						<Footer />
					</Provider>
				<ToastContainer/>
				</AuthContextProvider>
			</body>
		</html>
	);
}
