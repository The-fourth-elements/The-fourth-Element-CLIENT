'use client'
import { useEffect } from 'react';
import PolarChart from '@/components/metrics/Polar';
// import FilterKnowRegisterOfUser from '@components/';

const UserRecords = ({ user, session, className }) => {
	useEffect(() => {
		if (!user?.progress) {
		}
	}, []);



	const data = {
		labels: [
			'Eating',
			'Drinking',
			'Sleeping',
			'Designing',
			'Coding',
			'Cycling',
			'Running',
		],
		datasets: [
			{
				label: 'My First Dataset',
				data: [7,3,5,2,2,5,5],
				fill: true,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgb(255, 99, 132)',
				pointBackgroundColor: 'rgb(255, 99, 132)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(67, 21, 31)',
			},
			{
				label: 'My Second Dataset',
				data: [1, 5, 2, 2, 6, 7, 1],
				fill: true,
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgb(54, 162, 235)',
				pointBackgroundColor: 'rgb(54, 162, 235)',
				pointBorderColor: '#fff',
				pointHoverBackgroundColor: '#fff',
				pointHoverBorderColor: 'rgb(54, 162, 235)',
			},
		],
	};

	const options = {
		elements: {
			line: {
				borderWidth: 3,
			},
		},
	};

	return (
		<div className={className}>
			<PolarChart data={data} options={options} />
		</div>
	);
};

export default UserRecords;
