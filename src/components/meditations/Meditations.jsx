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



export default function Meditations({ idModule }) {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	const role = session?.token?.user?.role;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { module, getModule } = useSelectedModule();
	// const { exercises, getExercises } = useExercisesStore();


	const { user, getProfile } = useUserProfile();
	const { modules, getModules, getQuiz } = useModulesStore();
	const [moduleData, setModuleData] = useState([]);
	const [modulesDataLoaded, setModulesDataLoaded] = useState(false);
	const [currentMeditation, setCurrentMeditation] = useState(null);
	const [access, setAccess] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [dataUpdated, setDataUpdated] = useState(false);
	const [currentModule, setCurrentModule] = useState('');
	const [firstEffectExecuted, setFirstEffectExecuted] = useState(false);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);


	/*useEffect(() => {
		getModule(idModule).then(() => {
			setFirstEffectExecuted(true);
		});
	}, []);

	useEffect(() => {
		if (firstEffectExecuted) {
			if (session) {
				if (session?.token?.user) {
					const { role } = session.token.user;
					role > 2 && setAccess(true);
					const id = session?.token?.user?.id;
					getProfile(id);
				}
				console.log('condicion useEffect ', moduleData?.length);

				if (moduleData?.length === 0) {
					console.log('condicion useEffect ', moduleData?.length);

					// fetchDataSingleModule(module).then(data => {
					// 	setModuleData(data);
					// 	setModulesDataLoaded(true);
					// });
				}

				verifyProgressUser();
			}
		}
	}, [firstEffectExecuted, module, session, dataUpdated]);

	useEffect(() => {
		if (dataUpdated) {
			setDataUpdated(false);
		}
	}, [dataUpdated]);
*/
	const handleDataUpdate = () => {
		setDataUpdated(true);
	};

	const renderModuleMeditations = () => {
		if (meditations) {
			return meditations.map((elem, meditationIndex) => {
					return renderMeditations(meditationIndex, elem, handleMeditationClick);
			});
		}
	};

	

	const handleMeditationClick = meditation => {
		setCurrentTrackIndex(0)
		console.log("currentTrackIndex " , currentTrackIndex);
		setCurrentMeditation(meditation);
	};

	return (                                // h-[81vh]
			<Card className={containerVideos + ' bg-white navcolor md:h-[81vh]'} > 
				<main
					className={
						div1 + ' parent  bg-foreground  mt-12'
					}>
					<BackToCourseBtn></BackToCourseBtn>
						
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
						<Accordion>
							<AccordionItem
								className={
									acordionItem +
									' p-2 m-1 bg-transparent rounded md:m-0 text-background'
								}
								title='Recursos'
								textValue={`${accordion}`}></AccordionItem>
						</Accordion>
					</Card>
				</main>
				<aside className={`${div2} bg-foreground md:w-96  mt-12`}>
					<nav
						className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
						<ul className='m-2'>
							{true ? (
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
