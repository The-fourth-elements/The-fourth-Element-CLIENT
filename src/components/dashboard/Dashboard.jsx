'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Container, section1, section2, section3 } from './styles.module.scss';
import Metric from '@/components/metrics/Pie';
import { metricData, setData } from '@/helpers/getterMetrics';
import { useEffect, useState } from 'react';
import { useUsersStore } from '../../zustand/store/usersStore';
import { generateMetric } from '@/helpers/generateMetric';

const dashboard = () => {
	const { getUsers, users, countriesCount, getCountOfUsersPerCountry } = useUsersStore();
	const option = metricData('Usuarios');

	const [userMetrics, setUserMetrics] = useState({
		labels: [],
		data: [],
	});

	useEffect(() => {
		if (users?.length <= 0) {
			getUsers()?.then(updatedUsers => {
				const metrics = calculateMetrics(updatedUsers);

				setUserMetrics(metrics);
			});
			getCountOfUsersPerCountry()?.then(
				data=>console.log(data)
			)
		} else {
			const metrics = calculateMetrics(users);
			setUserMetrics(metrics);
		}
	}, [users, countriesCount]);
	const calculateMetrics = users => {
		const activeUsers = users?.filter(user => !user.deleted);

		let roleCounts = [0, 0, 0, 0];

		activeUsers?.forEach(user => {
			if (user.role) {
				roleCounts[user.role]++;
			} else {
				roleCounts[0]++;
			}
		});
		const labels = ['Rol 0', 'Rol 1', 'Rol 2', 'Rol 3'];
		const data = roleCounts;
		const metricData = setData(labels, 'Usuarios', data);
		return metricData;
	};
	const tuJson = {
		"Antigua and Barbuda": 2,
		"Australia": 1,
		"Austria": 1,
		"Argentina": 3,
		"Brazil": 5,
		"Canada": 4,
		"Chile": 2,
		"China": 8,
		"France": 6,
		"Germany": 7,
		"India": 10,
		"Italy": 6,
		"Japan": 4,
		"Mexico": 3,
		"Netherlands": 2,
		"New Zealand": 1,
		"Spain": 4,
		"Switzerland": 2,
		"United Kingdom": 7,
		"United States": 15
		// Puedes seguir agregando más países si es necesario
	  };

	const [data1, option1] = generateMetric(tuJson, 'Frutillita')
	const [data2, option2] = generateMetric(tuJson, 'nuevo')

	return (
		<>
			<Card className='min-h-screen'>
				<header className='p-5'>
					<h1 className=''>Panel de Administrador</h1>
				</header>
				<CardBody>
					<div className={Container}>
						<section className={section1}>
							<h2>Usuarios: </h2>
							{userMetrics?.labels?.length >= 1 && (
								<Metric data={userMetrics} options={option}></Metric>
							)}
						</section>
						<section className={section2}>
							<h2>Usuarios por país: </h2>
							{userMetrics?.labels?.length >= 1 && (
								<Metric data={data1} options={option1}></Metric>
							)}
						</section>
						<section className={section3}>
							<h2>Usuarios por edad: </h2>
							{userMetrics?.labels?.length >= 1 && (
								<Metric data={data2} options={option2}></Metric>
							)}
						</section>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default dashboard;
