'use client'
import Filters from '@/components/Filters/Filters';
import UsersSection from '../../../components/usersSection/UsersSection';
import Orders from '@/components/Orders/Orders';


export default function page({ params }) {
	return (
		<>
			{/* <Orders/> */}
			<Filters />
			<UsersSection />

		</>
	);
}
