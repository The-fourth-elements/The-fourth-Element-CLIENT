'use client';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Container, section1, section2, section3 } from './styles.module.scss';
import Metric from '@/components/metrics/Pie';
import { metricData, setData } from '@/helpers/getterMetrics';
import { useEffect, useState } from 'react';
import { useUsersStore } from '../../zustand/store/usersStore';
import { generateMetric } from '@/helpers/generateMetric';
import { toastError } from '@/helpers/toast';
import BarChart from '../metrics/Bar';

const dashboard = () => {
	const { getUsers, users, countriesCount, getCountOfUsersPerCountry, agesCount, getCountOfUsersPerAge } = useUsersStore();
	const option = metricData('Usuarios');

	const [userMetrics, setUserMetrics] = useState({
		labels: [],
		data: [],
	});
	

	const fetchUsers = async() => {
		await getCountOfUsersPerAge()
	}

	useEffect(() => {
		if(Object.keys(agesCount).length < 1){
			fetchUsers()
		}
		if (users?.length <= 0) {
			getUsers()?.then(updatedUsers => {
				const metrics = calculateMetrics(updatedUsers);

				setUserMetrics(metrics);
			});
			
			getCountOfUsersPerCountry()?.then().catch((error)=> toastError('No se pudo conseguir el conteo de paises'))
		} else {
			const metrics = calculateMetrics(users);
			setUserMetrics(metrics);
		}
		if(Object.keys(countriesCount)?.length < 0){
			getCountOfUsersPerCountry()?.then(
				data=>console.log(data)
			);
		}
		
	}, [users, countriesCount, agesCount]);
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
	const [data1, option1] = generateMetric(countriesCount, 'Usuarios por pais')
	const [data2, option2] = generateMetric(agesCount, 'nuevo')
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
							{data1?.labels?.length >= 1 && (
								<BarChart data={data1} options={option1}></BarChart>
							)}
						</section>
						<section className={section3}>
							<h2>Usuarios por edad: </h2>
							{data2?.labels?.length >= 1 && (
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
