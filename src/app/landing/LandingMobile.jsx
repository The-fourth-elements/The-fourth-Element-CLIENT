import Image from 'next/image';
import landingImgMobile from '../../../public/img/landingImgMobile.jpg';
import videoPlaceholder from '../../../public/img/videoPlaceholder.png';

import './LandingMobileStyles.scss';
const LandingMobile = () => {
	return (
		<div>
			<div className='Container'>
				<div className='Container-banner'>
					<Image src={landingImgMobile} />
					<button className='Container-banner-text'>
						<h3>Conoce los 10 módulos</h3>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingMobile;
