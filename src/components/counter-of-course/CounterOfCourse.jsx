import React from 'react';
import { CardCourseData } from './styles.module.scss';

async function getLandingData() {
    try {
		const response = await fetch(`${process.env.API_BACKEND}counter-contents`, {cache: 'no-store', method: "GET"});
		if(response.status >= 400){
			throw new Error("No se pudo obtener el conteo", response?.status);
		}
		return response.json();
	} catch (error) {
		return {estos: 4, son: 3, datos: 38, ficticions: 2,charlas: 47}
	}
}

async function CounterOfCourse() {
	const dataFetched = await getLandingData();
    const dataString = [
        'Módulos',
        'Clases',
        'Ejercicios',
        'audios y meditaciones',
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
    if (!dataFetched || Object.values(dataFetched)?.length < 1) {
        return <h3 className='bg-black'>Ocurrió un error obteniendo los datos</h3>;
    }

    return (
        <div className='flex flex-wrap justify-center w-full gap-[1rem] '>
            {Object.values(dataFetched).map((value, index) => (
                <div
                    key={index}
                    className={CardCourseData}
                    style={{ backgroundColor: colors[index] }}>
                    <span>{value}</span>
                    <p>{dataString[index]}</p>
                </div>
            ))}
        </div>
    );
}

export default CounterOfCourse;