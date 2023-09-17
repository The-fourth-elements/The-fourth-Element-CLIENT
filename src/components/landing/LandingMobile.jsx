import Image from 'next/image';
import landingImgMobile from '../../../public/img/landingImgMobile.jpg';
import landingImgMobile2 from '../../../public/img/landingImgMobile2.jpg';
import landingImgMobile3 from '../../../public/img/landingImgMobile3.jpg';
import landingImgMobile4 from '../../../public/img/landingImgMobile4.jpg';

import videoPlaceholder from '../../../public/img/videoPlaceholder.png';

import Facebook from '../../assets/svg/facebook.svg';
import Instagram from '../../assets/svg/instagram.svg';
import Linkedin from '../../assets/svg/linkedin.svg';
import Twitter from '../../assets/svg/twitter.svg';
import { useEffect } from 'react';

import './LandingMobileStyles.scss';
import Link from 'next/link';
const LandingMobile = () => {

	useEffect(() => {
        // Deshabilita el scroll en el cuerpo de la página cuando se monta el componente
        document.body.style.overflow = 'hidden';

        // Asegúrate de habilitar el scroll nuevamente cuando el componente se desmonte
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
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
		<div className='Container'>
			<div className='Container-div'>
				<Image src={landingImgMobile} alt='landing mobile' />
				<button className='Container-div-text'>
					<h3>Conoce los 10 módulos</h3>
				</button>
			</div>

			<div className='Container-div'>
				<Image src={landingImgMobile2} alt='landing mobile' />
				<h1 className='Container-div-text-2'>
					TU ENTRENAMIENTO MENTAL CEREBRAL PARA POTENCIAR TU DESEMPEÑO DEPORTIVO
				</h1>
			</div>

			<div className='Container-div'>
				<Image src={landingImgMobile3} alt='landing mobile' />
				<div className='Container-div-text-3'>
					<Link href='route'>Objetivos</Link>
					<Link href='route'>Fórmula</Link>
					<Link href='route'>Vas a aprender</Link>
					<Link href='route'>Dirigido a</Link>
					<Link href='route'>Base científica</Link>
					<Link href='route'>Quienes somos</Link>
					<Link href='route'>Testimonios</Link>
					<Link href='route'>Beneficios</Link>
					<Link href='route'>Precios</Link>
				</div>
			</div>

			<div className='Container-div'>
				<Image src={landingImgMobile4} alt='landing mobile' />

				<div className='Container-div-videos'>
					<h1>Take a tour</h1>
					<Image alt='placeholder image' src={videoPlaceholder} />
					<Image alt='placeholder image' src={videoPlaceholder} />
					<Image alt='placeholder image' src={videoPlaceholder} />
				</div>
			</div>

			<div className='Container-div'>
				<div className='Container-div-footer-links'>
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

				<div className='Container-div-footer-icons'>
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
				<div className='Container-div-brand-container'>
					<h3>Revoke consent</h3>

					<h1>Train the Mind®</h1>
				</div>
			</div>
		</div>
	);
};

export default LandingMobile;
