import LandingDesktop from '../components/landing/LandingDesktop';
import Footer from '@/components/footer/FooterDesktop';

const ServerComponent = async() => {
	return (
		<>
			<LandingDesktop />
			<Footer></Footer>
		</>
	);
};

export default ServerComponent;
