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
import { useSelectedModule } from '@/zustand/store/selectedModule';


function page({ params }) {
	const { idModule } = params;
	const [isLoading, setIsLoading] = useState(true)	
	const {module, getModule} = useSelectedModule()


	useEffect(() => {
		getModule(idModule).then(() => {
			setIsLoading(false);
		  });

	}, [])
	

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	
	if (isLoading) {
		return (
			<>
				<CircularProgress></CircularProgress>
			</>
		);
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
						este viendo este autoconocimiento sin saber que es, puede
						explicarle que es lo que vera y que tendra que hacer para poder
						tener un mejor entendimiento del tema.
					</p>
				</CardBody>
			</Card>
			<Button onClick={onOpen}>abrir modal prueba</Button>
			<RenderSelfKnowledge
				data={module?.selfKnowledge}
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onOpen={onOpen}
			/>
		</>
	);
}

export default page;
