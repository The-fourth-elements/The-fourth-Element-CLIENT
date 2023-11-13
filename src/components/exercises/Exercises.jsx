'use client';
import { useState, useEffect } from 'react';
import {
	Card,
	Accordion,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { setCookie } from 'cookies-next';
import { useModulesStore } from '@/zustand/store/modulesStore';
import {
	containerVideos,
	div1,
	div2,
	h2Title,
	acordionItem,
	navtContainer,
} from './ModulesView.module.scss';


import { renderExercises, renderTextSection } from './exercisesHelpers';
import { useSelectedModule } from '@/zustand/store/selectedModule';


export default function Exercises({ idModule }) {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { module, getModule } = useSelectedModule();
	const [exercisesDataLoaded, setExercisesDataLoaded] = useState(false);
	const [currentExercise, setCurrentExercise] = useState(null);



	useEffect(() => {
		getModule(idModule)
		setExercisesDataLoaded(true)
	}, []);

	
	

	const handleDataUpdate = () => {
		setDataUpdated(true);
	};

	const renderModuleExercises = () => {
		if (module.exercises) {
			return module.exercises.map((elem, exerciseIndex) => {
				return renderExercises(exerciseIndex, elem, handleExerciseClick);
			});
		}
	};

	const handleExerciseClick = exercise => {
		setCurrentExercise(exercise);
	};

	return (
		// h-[81vh]
		<Card className={containerVideos + ' bg-white navcolor '}>
			<section className={div1 + ' parent  bg-foreground  mt-12'}>

				<div className='  flex-col bg-primary m-3 flex' id='reproductor'>
					{renderTextSection(currentExercise)}
				</div>

				<Card className='flex p-3 bg-transparent shadow-none'>
					<h2
						className={
							h2Title +
							' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'
						}>
						{module?.name ? `Módulo: ${module?.name}` : ''}
					</h2>
					
				</Card>
			</section>
			<aside className={`${div2} bg-foreground md:w-96  mt-12`}>
				<nav
					className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
					<ul className='m-2'>
						{exercisesDataLoaded ? (
							<Accordion
								itemClasses={{
									title: 'text-black text-medium',
								}}>
								{renderModuleExercises()}
							</Accordion>
						) : (
							<h1 className='text-black'>
								Esperando a que se carguen los datos...
							</h1>
						)}
					</ul>
				</nav>
			</aside>
		</Card>
	);
}
