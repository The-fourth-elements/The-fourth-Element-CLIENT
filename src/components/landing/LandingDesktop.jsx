import Image from 'next/image';
import landingImg from '../../../public/img/landingImg.jpg';
import videoPlaceholder from '../../../public/img/videoPlaceholder.png';
import LandingDesktopStyles from './LandingDesktopStyles.scss';
import Link from 'next/link';
import Facebook from '../../assets/svg/facebook.svg';
import Instagram from '../../assets/svg/instagram.svg';
import Linkedin from '../../assets/svg/linkedin.svg';
import Twitter from '../../assets/svg/twitter.svg';

const LandingDesktop = () => {
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
		<div>
			<div className='Container'>
				<div className='Container-banner'>
					<Image alt='landing image' src={landingImg} />
					<div className='Container-banner-text'>
						<h3>
							TU ENTRENAMIENTO MENTAL Y CEREBRAL PARA POTENCIAR TU DESEMPEÑO
							DEPORTIVO
						</h3>
					</div>
				</div>
				<div className='Container-welcome-text'>
					<p>
						¡Bienvenidos a <b> The Fourth Element</b>! Durante 10 semanas
						explorarás una plataforma educativa que fusiona
						<b> teoría y práctica </b> en un enfoque único. Fundamentado en
						datos científicos, nuestro programa se nutre de la biología
						cerebral, neurociencias y psicología deportiva cognitivo-conductual.
					</p>
				</div>
				<div className='Container-take-a-tour-container'>
					<div className='Container-take-a-tour-container-text'>
						Take a tour
					</div>
					<div className='Container-take-a-tour-container-images'>
						<Image alt='placeholder image' src={videoPlaceholder} />
						<Image alt='placeholder image' src={videoPlaceholder} />
						<Image alt='placeholder image' src={videoPlaceholder} />
					</div>
				</div>
				<div className='Container-buttons'>
					<button>Get started (free trial)</button>
					<button>Grupos</button>
				</div>
				<div className='Container-description'>
					<p>The Fourth Element está diseñado para... </p>
					<p>
						Cualquier atleta comprometido con el alto rendimiento, ya sea en
						disciplinas individuales o de equipo. También, es una oportunidad
						valiosa para aquellos profesionales que rodean a los deportistas,
						como entrenadores, preparadores físicos, managers, kinesiólogos,
						nutricionistas, fisioterapeutas, psicólogos, y más.
					</p>
				</div>
				
				
				<div className='footerLinksContainer'>
						<div className='linksContainer'>
							<ul className='footerLinks'>
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
							</ul>
							<input
								placeholder='Your email address'
								className='inputFooter'></input>
							<div className='buttonContainer'>
								<button className='footerButton'>Get updates</button>
							</div>
						</div>
				</div>
			</div>
			<div className='iconsContainer'>
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
					<Image src={Instagram} alt='iconInstagram' className='icons'></Image>
				</a>
				<a
					href='https://www.instagram.com'
					target='_blank'
					rel='noopener noreferrer'
					className='iconLink'>
					<Image src={Linkedin} alt='iconInstagram' className='icons'></Image>
				</a>
			</div>
			<div className='brandContainer'>
				<h3>Revoke consent</h3>

                <h1>Train the Mind®</h1>
			</div>
		</div>
		
	);
};

export default LandingDesktop;
