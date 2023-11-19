'use client';

import Nav from '../components/navbar/Navbar';
import './global.css';
import AuthContextProvider from './context/authContext';
import Provider from './provider.js';
import '../styles/globals.scss';
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';
import 'react-toastify/ReactToastify.min.css';

export default function RootLayout({ children }) {
	return (
		<html lang='es' className='modern'>
			<title>The fourth element</title>
			<body>
				<AuthContextProvider>
					<Provider>
						<Nav />
						{children}
					</Provider>
					<ToastContainer />
				</AuthContextProvider>
			</body>
		</html>
	);
}
