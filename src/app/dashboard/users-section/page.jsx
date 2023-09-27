import UsersSection from '../../../components/usersSection/UsersSection';
import Filters from '@/components/Filters/Filters';


export default function page({ params }) {
	return (
		<>
			<Filters></Filters>
			<UsersSection/>
		</>
	);
}


