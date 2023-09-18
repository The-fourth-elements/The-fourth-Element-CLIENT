import Link from 'next/link';
import Image from 'next/image';

import Facebook from '../../assets/svg/facebook.svg';
import Instagram from '../../assets/svg/instagram.svg';
import Linkedin from '../../assets/svg/linkedin.svg';
import Twitter from '../../assets/svg/twitter.svg';

import "./FooterStyles.scss"

const FooterMobile = () => {


    const links = [
		{
			label: 'Partners',
			route: '/partners',
		},
		{
			label: 'Email Us',
			route: '/emailUs',
		},
		{
			label: 'Stay up to date with Train the Mind ®',
			route: '/stayUp',
		},
	];
	const links2 = [
		{
			label: 'Media',
			route: '/media',
		},
		{
			label: "Coaches' Guide",
			route: '/coaches',
		},
	];
	return (
		


			<div className='Footer-container'>
				<div className='Footer-container-footer-links'>
					<ul>
						{links.map(({ label, route }) => (
							<li key={route}>
								<Link href={route}>{label}</Link>
							</li>
						))}
					</ul>
					<ul>
						{links2.map(({ label, route }) => (
							<li key={route}>
								<Link href={route}>{label}</Link>
							</li>
						))}
						<div>
							<input
								placeholder='Your email address'
								className='inputFooter'></input>

							<button className='footerButton'>Get updates</button>
						</div>
					</ul>
				</div>

				<div className='Footer-container-footer-icons'>
					<a
						href='https://www.facebook.com'
						target='_blank'
						rel='noopener noreferrer'
						className='iconLink'>
						<Image src={Facebook} alt='iconFacebook' className='icons'></Image>
					</a>
					<a
						href='https://www.instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						className='iconLink'>
						<Image src={Twitter} alt='iconInstagram' className='icons'></Image>
					</a>
					<a
						href='https://www.instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						className='iconLink'>
						<Image
							src={Instagram}
							alt='iconInstagram'
							className='icons'></Image>
					</a>
					<a
						href='https://www.instagram.com'
						target='_blank'
						rel='noopener noreferrer'
						className='iconLink'>
						<Image src={Linkedin} alt='iconInstagram' className='icons'></Image>
					</a>
				</div>
				<div className='Footer-container-brand-container'>
					<h3>Revoke consent</h3>

					<h1>Train the Mind®</h1>
				</div>
			</div>
	);
};

export default FooterMobile;
