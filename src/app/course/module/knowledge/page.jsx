'use client';
import RenderSelfKnowledge from '@/components/render-self-knowledge/RenderSelfKnowledge';
import React, { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	CircularProgress,
	useDisclosure,
} from '@nextui-org/react';
import { useSelectedModule } from '@/zustand/store/selectedModule';

function page() {
	const { moduleId } = localStorage;
	const [isLoading, setIsLoading] = useState(true);
	const { module, getModule } = useSelectedModule();

	useEffect(() => {
		getModule(moduleId).then(() => {
			setIsLoading(false);
		});
	}, []);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	if (isLoading) {
		return (
			<>
				<CircularProgress></CircularProgress>
			</>
		);
	}

	return (
		<div className='flex flex-col items-center mt-8 rounded-lg'>
			<Card className='w-full  sm:w-[85vw] md:w-[75vw] rounded-lg'>
				<CardHeader>
					<h3 className='w-fit mx-auto p-2 text-center '>
						Titulo para el usuario
					</h3>
				</CardHeader>
				<CardBody className=''>
					<p className=' md:w-[60%] sm:w-[90%] w-[100%] mx-auto p-5  bg-primary rounded-lg'>
						Esta es una charla introductoria a lo que verá el usuario cuando
						está viendo este autoconocimiento sin saber qué es. Puede explicarle
						qué es lo que vera y qué tendra que hacer para poder tener un mejor
						entendimiento del tema.
					</p>
				</CardBody>
				<CardFooter>
				{module?.selfKnowledge ? ( 
					<>
					<Button onClick={onOpen} className='mx-auto w-fit px-5'>
						Resgistrar 
					</Button>
					<RenderSelfKnowledge
						data={module?.selfKnowledge}
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						onOpen={onOpen}
					/>
					</>
					) : <p> No hay autorregistros en el módulo</p>}
				</CardFooter>
			</Card>
		</div>
	);
}

export default page;