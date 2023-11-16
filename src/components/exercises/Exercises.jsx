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
import useExercisesResponsesStore from '@/zustand/store/ExercisesResponsesStore';


export default function Exercises({ idModule }) {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { module, getModule } = useSelectedModule();
	const { userResponses, getResponses } = useExercisesResponsesStore();

	const [exercisesDataLoaded, setExercisesDataLoaded] = useState(false);
	const [responsesLoaded, setResponsesLoaded] = useState(false);

	const [currentExercise, setCurrentExercise] = useState(null);



	useEffect(() => {
		getModule(idModule)
		setExercisesDataLoaded(true)
	}, []);

	useEffect(() => {
		setResponsesLoaded(false);
		const fetchResponsesAsync = async () => {
			  if (currentExercise) {
				await getResponses(id, currentExercise._id);
				setResponsesLoaded(true);
			  }
		
		  };
		
		  fetchResponsesAsync(); // Llama a la función asincrónica inmediatamen

	  
	}, [currentExercise])
	
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
		<Card className={containerVideos + ' bg-secondary-800  navcolor min-h-[81vh] pb-8 '}>
			<section className={div1 + ' parent bg-secondary-800'}>
				{ responsesLoaded ? 
					(<div className=' flex-col m-3 flex' id='reproductor'>
						{renderTextSection(currentExercise, userResponses)}
					</div>) : <h1 className='p-5 text-xl'>
								Seleccione un ejercicio
							</h1>
				}
			</section>
			<aside className={`${div2} bg-secondary-800 md:w-96 p-3`}>
				<nav
					className={`${navtContainer} flex flex-col bg-secondary rounded-xl`}>
					<ul className='m-2'>
						{exercisesDataLoaded ? (
							<Accordion
								itemClasses={{
									title: 'text-black text-medium',
								}}>
								{renderModuleExercises()}
							</Accordion>
						) : (
							<h1 className=''>
								Esperando a que se carguen los datos...
							</h1>
						)}
					</ul>
				</nav>
			</aside>
		</Card>
	);
}
