'use client';
import { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import {
	Card,
	Accordion,
	AccordionItem,
	accordion,
	useDisclosure,
	Textarea,
	Button,
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
import { toastError, toastInfo, toastSuccess } from '@/helpers/toast';
import { postData } from '@/hooks/postData';
import { useUserProfile } from '@/zustand/store/userProfile';

import { renderMeditations, renderTrack } from './renderMeditations';
import { useSelectedModule } from '@/zustand/store/selectedModule';
import { useExercisesStore } from '@/zustand/store/exercisesStore';
import { meditations } from './mockMeditations';
import BackToCourseBtn from '@/helpers/BackToCourseBtn';
import useMeditationsStore from '@/zustand/store/meditationsStore';



export default function Meditations({ idModule }) {
	
	const { module, getModule } = useSelectedModule();

	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	const role = session?.token?.user?.role;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}

	const [modulesDataLoaded, setModulesDataLoaded] = useState(false);
	const [currentMeditation, setCurrentMeditation] = useState(null);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);


	useEffect(() => {
		getModule(idModule)
		setModulesDataLoaded(true);
		
	}, []);


	const renderModuleMeditations = () => {
		if (module?.meditation?.length > 0) {
			return module.meditation.map((elem, meditationIndex) => {
					return renderMeditations(meditationIndex, elem, handleMeditationClick);
			});
		}
	};

	

	const handleMeditationClick = meditation => {
		setCurrentTrackIndex(0)
		setCurrentMeditation(meditation);
	};

	return (                                // h-[81vh]
			<Card className={containerVideos + ' bg-white navcolor md:h-[81vh]'} > 
				<section
					className={
						div1 + ' parent  bg-foreground  mt-12'
					}>
						
					<div
						className='min-h-[15rem] h-[25vh]  flex-col bg-primary m-3 flex p-5'
						id='reproductor'>
						{renderTrack(currentMeditation, currentTrackIndex, setCurrentTrackIndex)}
						
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
							{modulesDataLoaded ? (
								<Accordion
									itemClasses={{
										title: 'text-black text-medium',
									}}>
									{renderModuleMeditations()}
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
