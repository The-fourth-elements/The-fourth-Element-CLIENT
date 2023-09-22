'use client'
import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { Container, section1, section2, section3 } from './styles.module.scss'
import Metric from '@/components/metrics/Pie'
const dashboard = () => {
	return (
		<>
			<Card>
				<header className='p-5'>
					<h1 className=''>YO SOY EL SENIOR SOY HENRY</h1>
				</header>
				<CardBody>
					<div className={Container}>
					<section className={section1}>
						<h2>Usuarios: </h2>
						<Metric></Metric>
					</section>
					<section className={section2}>
						<h2>Usuarios: </h2>
						<Metric></Metric>
					</section>
					<section className={section3}>
						<h2>Usuarios: </h2>
						<Metric></Metric>
					</section>
					</div>
					
				</CardBody>
			</Card>
		</>
	);
};

export default dashboard;
