'use client';
import RenderSelfKnowledge from '@/components/render-self-knowledge/RenderSelfKnowledge';
import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CircularProgress,
	useDisclosure,
} from '@nextui-org/react';

function page({ params }) {
	const { idModule } = params;
	//con este idModule debo traer los autoconocimiento delos modulos;
	const { data, error, isLoading } = useFetch(
		`${process.env.API_BACKEND}moduls/${idModule}`
	);
	console.log(data);
	const [knowledge, setKnowledge] = useState([
		{
			name: 'Motivacion',
			description:
				'descripcion de ejemplo de la motivacion para un mockeo de datos',
			questions: [
				'pregutna nro1 : dkfdkjdkfjdskfjsdkfdsjk',
				'pregunta numero 2 ; no me preguntes we',
			],
		},
		{
			name: 'Persecpcion de la realidad segun alguien',
			description: 'jejejejjejeejej',
			questions: ['pregunta 1 seccion 2', 'jejejejejejejeje'],
		},
	]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// const { data, error, isLoading } = useFetch(
	// 	`${process.env.API_BACKEND}users`
	// );
	if (isLoading) {
		return (
			<>
				<CircularProgress></CircularProgress>
			</>
		);
	}

	if (error && !isLoading) {
		return <>No se puedo renddiar nada</>;
	}
	return (
		<>
			<Card className='w-full'>
				<CardHeader>
					<h3 className='w-full text-center'>Titulo para el usuario</h3>
				</CardHeader>
				<CardBody className=''>
					<p className='bg-white text-black w-[50%]'>
						Esta es una charla introductoria a lo que vera el usuario cuando
						este viendo este autoconocimientoo sin saber que es, puede
						explicarle que es lo que vera y que tendra que hacer para poder
						tener un mejor entendimiento del tema.
					</p>
				</CardBody>
			</Card>
			<Button onClick={onOpen}>abrir modal prueba</Button>
			<RenderSelfKnowledge
				data={knowledge}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onOpen={onOpen}
			/>
		</>
	);
}

export default page;
