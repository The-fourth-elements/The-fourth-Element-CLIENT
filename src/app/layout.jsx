import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/Footer/Footer'

'use client';

import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import {} from 'react-toastify/dist/ReactToastify.css'


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'The fourth elements',
	description: 'The fourth element is a mental training course',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthContextProvider>
					<header>
						<Navbar />
					</header>
					{children}
          <Footer/>
				</AuthContextProvider>
				<ToastContainer/>
			</body>
		</html>
	);
}
