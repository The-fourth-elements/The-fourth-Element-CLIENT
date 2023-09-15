import Image from "next/image";
import landingImg from "../../public/img/landingImg.jpg";

import './styles.scss';
const Landing = () => {
	return (
		<div>
			<div className="container">
				<div className="banner">
					<Image className="landingBanner" alt='landing image' src={landingImg} />
					<div className="landingBannerText">
						<p>TU ENTRENAMIENTO <br />
						 MENTAL Y CEREBRAL	<br />
						PARA POTENCIAR	<br />
						TU DESEMPEÑO	<br />
						DEPORTIVO</p>
					</div>
				</div>
				<div>
					<div className="welcomeText">
						<p>¡Bienvenidos a <h3 className="h3-inline"> The Fourth Element</h3>!  Durante 10</p>
						<p>semanas explorarás una plataforma educativa que</p>
						<p>fusiona <h3 className="h3-inline"> teoría y práctica </h3> en un enfoque único.</p>
						<p>Fundamentado en datos científicos, nuestro programa</p>
						<p>se nutre de la biología cerebral, neurociencias y</p>
						<p>psicología deportiva cognitivo-conductual.</p>
					</div>
				
				</div>
				<div className="buttonsContainer">
					<button>Get started (free trial)</button>
					<button>Grupos</button>
				</div>
				<div  className="takeATourContainer">
					<div className="takeATour" >Take a tour</div>
					{/* <img alt='' src='/undefined3.png' />
					<img alt='' src='/undefined4.png' />
					<img alt='' src='/undefined5.png' /> */}
				</div>
				<div>
					<div>The Fourth Element</div>
					<div>
						<p> está diseñado para...</p>
						<p></p>
						<p>Cualquier atleta comprometido con el alto</p>
						<p>rendimiento, ya sea en disciplinas individuales o de</p>
						<p>equipo. También, es una oportunidad valiosa para</p>
						<p>aquellos profesionales que rodean a los deportistas,</p>
						<p>como entrenadores, preparadores físicos, managers,</p>
						<p>kinesiólogos, nutricionistas, fisioterapeutas,</p>
						<p>psicólogos, y más.</p>
					</div>
				</div>

				<div>
					<img alt='' src='/undefined7.png' />
					<div>
						<p>The Fourth Element</p>
					</div>
					<img alt='' src='/undefined8.png' />
					
				</div>
				<img alt='' src='/undefined10.png' />
				<div />
				<div>
					<div>
						<p>Partners</p>
						<p>&nbsp;</p>
						<p>Media</p>
					</div>
				</div>
				<div>
					<div>
						<p>Email Us</p>
						<p>&nbsp;</p>
						<p>Coaches’ Guide</p>
					</div>
				</div>
				<div>
					<div>
						<p>{`Stay up to date with Train `}</p>
						<p>the Mind®</p>
					</div>
				</div>
				<div>Your email address</div>
				<div />
				<div>Get Updates</div>
				<div>
					<p>{`facebook        twitter        instagram        linkedin `}</p>
					<p>&nbsp;</p>
					<p>{` `}</p>
				</div>
				<div>Revoke consent</div>
				<div>© Train the mind 2023</div>
			</div>
		</div>
	);
};

export default Landing;
