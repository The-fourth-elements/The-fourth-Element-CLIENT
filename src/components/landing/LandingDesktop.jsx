import Image from 'next/image';
import landingImg from '../../assets/img/landingImg.jpg';
import videoPlaceholder from '../../assets/img/videoPlaceholder.png';

import './LandingDesktopStyles.scss';
import Link from 'next/link';

const LandingDesktop = () => {
	return (
		<div>
			<div className='Container'>
				<div className='Container-banner'>
					<Image alt='landing image' src={landingImg} />
					<div className='Container-banner-text'>
						<h1>
							TU ENTRENAMIENTO MENTAL Y CEREBRAL PARA POTENCIAR <br />
							TU DESEMPEÑO <br />
							DEPORTIVO
						</h1>
					</div>
				</div>
				<div className='Container-welcome-text'>
					<p>
						¡Bienvenidos a <b>The Fourth Element</b>! Durante 10 semanas explorarás una
						plataforma educativa que fusiona teoría y práctica en un enfoque
						único. Fundamentado en datos científicos, nuestro programa se nutre
						de la biología cerebral, neurociencias y psicología deportiva
						cognitivo-conductual.
					</p>
				</div>

				<div className='Container-take-a-tour-container'>
					<div className='Container-take-a-tour-container-images'>
						{/* <Image alt='placeholder image' src={videoPlaceholder} /> */}
						{/* video estatico de youtube */}
						{/* <video src={} /> */}
						<iframe id='Staticvideo' width="" height="" src="https://www.youtube.com/embed/CQu6vs58tOg?si=uyurBDNXDWgaTdyD" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

					</div>
				</div>
				<div className='Container-buttons'>
					<button>
						<Link href='/course'>Acceder ahora</Link>
					</button>
					<button>
						<Link href='/groups'>Módulo 1 gratis</Link>
					</button>
				</div>
				<div className='Container-description'>
					<p>
						Cualquier atleta comprometido con el alto rendimiento, ya sea en
						disciplinas individuales o de equipo. También, es una oportunidad
						valiosa para aquellos profesionales que rodean a los deportistas,
						como entrenadores, preparadores físicos, managers, kinesiólogos,
						nutricionistas, fisioterapeutas, psicólogos, y más.
					</p>
				</div>
			</div>
		</div>
	);
};

export default LandingDesktop;
