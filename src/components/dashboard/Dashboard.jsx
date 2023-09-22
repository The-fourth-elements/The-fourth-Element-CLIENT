'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Container, section1, section2, section3 } from './styles.module.scss';
import Metric from '@/components/metrics/Pie';
import { metricData, setData } from '@/helpers/getterMetrics';
import { useEffect, useState } from 'react';
import { useUserDetail } from '../../store/userDetail';

const dashboard = () => {
	const { getUsers, users } = useUserDetail();
	const option1 = metricData('Usuarios');

	const [userMetrics, setUserMetrics] = useState({
		labels: [],
		data: [],

	});

	useEffect(() => {
		if (users.length <= 0) {
			getUsers().then(updatedUsers => {
				const metrics = calculateMetrics(updatedUsers);
				console.log(metrics);
				setUserMetrics(metrics);
				console.log(metrics);

			});
		} else {
			const metrics = calculateMetrics(users);
			console.log(metrics);
			setUserMetrics(metrics)
			console.log(userMetrics);
		}
	}, []);

	const calculateMetrics = (users) => {
		const activeUsers = users?.filter((user) => !user.deleted);
	  
		let roleCounts = [0, 0, 0, 0];
	  
		activeUsers?.forEach((user) => {
		  if (user.role) {
			roleCounts[user.role]++;
		  } else {
			roleCounts[0]++;
		  }
		});
		const labels = ['Rol 0', 'Rol 1', 'Rol 2', 'Rol 3'];
		const data = roleCounts;
		const metricData = setData(labels, 'Usuarios', data)
		return metricData;
	};

	return (
		<>
			<Card className='min-h-screen'>
				<header className='p-5'>
					<h1 className=''>YO SOY EL SENIOR SOY HENRY</h1>
				</header>
				<CardBody>
					<div className={Container}>
						<section className={section1}>
							<h2>Usuarios: </h2>
							{userMetrics?.labels?.length >=1 && (
								<Metric data={userMetrics} options={option1}></Metric>
							)}
						</section>
						<section className={section2}>
							<h2>Usuarios: </h2>
							{userMetrics?.labels?.length >=1 && (
								<Metric data={userMetrics} options={option1}></Metric>
							)}
						</section>
						<section className={section3}>
							<h2>Usuarios: </h2>
							{userMetrics?.labels?.length >=1 && (
								<Metric data={userMetrics} options={option1}></Metric>
							)}
						</section>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default dashboard;
