import UsersSection from '../../../../components/usersSection/UsersSection';



export default function page({ params }) {
	return (
		<>
			<UsersSection userType={params.userType}/>
		</>
	);
}


