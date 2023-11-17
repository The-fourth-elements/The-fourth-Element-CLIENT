import React from 'react';
import { CardCourseData } from './styles.module.scss';
async function getLandingData() {
	const response = await fetch(`${process.env.API_BACKEND}counter-contents`);
	return response.json();
}

export default async function CounterOfCourse() {
	const datafethc = await getLandingData();
	console.log(datafethc, 'soy la data');
	// const data = [10, 240, 76, 57, 47, 55];
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
	if(datafethc?.length < 1){
		return <>holi</>
	}
	return (
		<div className='flex flex-wrap justify-center w-full gap-[1rem] '>
			{Object.values(datafethc).map((value, index) => {
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
}

// export default CounterOfCourse;
