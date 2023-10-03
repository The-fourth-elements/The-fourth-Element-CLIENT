import Image from 'next/image';
import landingImg from '../../assets/img/landingImg.jpg';
import videoPlaceholder from '../../assets/img/videoPlaceholder.png';
import './LandingDesktopStyles.scss';
// import Link from 'next/link';

const LandingDesktop = () => {
	return (
		<div>
			<div className='Container'>
				<div className='Container-banner'>
					<Image alt='landing image' src={landingImg} />
					<div className='Container-banner-text'>
						<h3>
							TU ENTRENAMIENTO MENTAL Y CEREBRAL PARA POTENCIAR <br />TU DESEMPEÑO <br />
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
					<h3><b>The Fourth Element</b> está diseñado para...</h3>
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
