import React from 'react';
import { CardCourseData } from './styles.module.scss';

const CounterOfCourse = () => {
	//6 datos === cajitas, mokeo data con object.keys y values;
	//hacer un estado global para esto. a futuro.
	const data = [10, 240, 76, 57, 47, 55];
	const dataString = [
		'Módulos',
		'Clases',
		'Ejercicios',
		'audios & meditaciones',
		'charlas en vivo con Estanislao Bachrach',
		'autoregistro de destrezas mentales en entrenamientos y competencias',
	];
	const colors = [
		'#F29222',
		'#F2D122',
		'#F25422',
		'#F2B822',
		'#F27922',
		'#F2B822',
	];
	return (
		<div className='flex flex-wrap justify-center w-full gap-[1rem] '>
			{data.map((value, index) => {
				return (
					<React.Fragment key={index}>
						<div
							className={CardCourseData}
							style={{ backgroundColor: colors[index] }}>
							<span>{value}</span>
							<p>{dataString[index]}</p>
						</div>
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default CounterOfCourse;
