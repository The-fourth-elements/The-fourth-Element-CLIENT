'use client';
import RenderSelfKnowledge from '@/components/render-self-knowledge/RenderSelfKnowledge';
import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { Button, CircularProgress, useDisclosure } from '@nextui-org/react';

const page = () => {
	const [knowledge, setKnowledge] = useState([
        {
          name: 'Motivacion',
          description: 'descripcion de ejemplo de la motivacion para un mockeo de datos',
          questions: [
            'pregutna nro1 : dkfdkjdkfjdskfjsdkfdsjk', 'pregunta numero 2 ; no me preguntes we'
          ]
        },
        {
          name: 'Persecpcion de la realidad segun alguien',
          description: 'jejejejjejeejej',
          questions: [ 'pregunta 1 seccion 2', 'jejejejejejejeje' ]
        }
      ]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { data, error, isLoading } = useFetch(
        `${process.env.API_BACKEND}users`
        );
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
			<Button onClick={onOpen}>abrir modal prueba</Button>
			<RenderSelfKnowledge
				data={knowledge}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onOpen={onOpen}
			/>
		</>
	);
};

export default page;
