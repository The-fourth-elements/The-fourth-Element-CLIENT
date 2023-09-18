import Image from 'next/image';
import landingImgMobile from '../../assets/img/landingImgMobile.jpg';
import landingImgMobile2 from '../../assets/img/landingImgMobile2.jpg';
import landingImgMobile3 from '../../assets/img/landingImgMobile3.jpg';
import landingImgMobile4 from '../../assets/img/landingImgMobile4.jpg';

import videoPlaceholder from '../../assets/img/videoPlaceholder.png';


import './LandingMobileStyles.scss';
import Link from 'next/link';
const LandingMobile = () => {

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

		</div>
	);
};

export default LandingMobile;
