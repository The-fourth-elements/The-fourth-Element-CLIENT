'use client'
import Filters from '@/components/Filters/Filters';
import UsersSection from '../../../components/usersSection/UsersSection';



export default function page({ params }) {
	return (
		<>
			<Filters />
			<UsersSection />

		</>
	);
}
