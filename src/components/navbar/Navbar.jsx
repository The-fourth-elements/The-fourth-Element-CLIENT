import Link from 'next/link';
import './styles.scss';
import Image from 'next/image';
import logo from '../../../public/logo.svg';
import burger from '../../assets/svg/burger.svg';
import x from '../../assets/svg/x-mark.svg';

const Navbar = () => {
	const routes = [
		{ label: 'Home', route: '/', className: '' },
		{ label: 'About Us', route: '/about', className: '' },
		{ label: 'Login', route: '/login', className: '' },
		{ label: 'SignUp', route: '/signup', className: '' },
	];
	return (
		<>
			<nav className='Navbar'>
				<div className='Navbar-div'>
					<Link href='/' className='Navbar__logo'>
						<Image src={logo} priority alt='The fourth element logo'></Image>
					</Link>
					<input type='checkbox' id='check' />
					<label htmlFor='check' className='burger'>
						<Image src={burger} alt='burger' id='burger' />
						<Image src={x} alt='x-mark' id='x' />
					</label>
					<ul className='Navbar__ul'>
						{routes.map(({ label, route, className }) => {
							return (
								<li key={route} className='Navbar__ul--li'>
									<Link href={route} className={'Navbar__ul--li-' + className}>
										{label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
