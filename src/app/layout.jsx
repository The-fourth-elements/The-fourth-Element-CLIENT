import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import './global.css';
import { Inter } from 'next/font/google';
import Provider from './provider.js';
import '../styles/globals.scss';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';
import 'tailwindcss/tailwind.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'The fourth elements',
	description: 'The fourth element is a mental training course',
};

export default function RootLayout({ children }) {
	return (
		<html lang='es'>
			<body className={inter.className}>
				<AuthContextProvider>
					<Provider>
						<header>
							<Navbar />
						</header>
						{children}
						<Footer />
					</Provider>
				</AuthContextProvider>
				<ToastContainer />
			</body>
		</html>
	);
}
