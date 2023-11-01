import Link from 'next/link';
import React from 'react'

import './FooterStyles.scss';

const FooterDesktop = () => {
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
			label: 'Mantente al día con The Fourth Element',
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
		<>
			<div className='footerLinksContainer w-full' id='os'>
				<div className='linksContainer w-full'>
					<ul className='footerLinks w-full'>
						{links.map(({ label, route }) => (
							<li key={route}>
								<Link href={route}>{label}</Link>
							</li>
						))}
					</ul>
					<ul className='footerLinks'>
						{links2.map(({ label, route }) => (
							<li key={route}>
								<Link href={route}>{label}</Link>
							</li>
						))}
						<li>
							<div className='flex flex-col space-y-4'>
							<input
								placeholder='Your email address'
								className='inputFooter'></input>
							</div>
						</li>
					</ul>
				</div>
			</div>
			{/* <div className='brandContainer'>
				<h3>Revoke consent</h3>

				<h1>Train the Mind®</h1>
			</div> */}
		</>
	);
};

export default FooterDesktop;
