'use client';
import { useState, useEffect } from 'react';
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

import { renderExercises, renderTextSection } from './renderExercises';
import { useSelectedModule } from '@/zustand/store/selectedModule';
import { useExercisesStore } from '@/zustand/store/exercisesStore';
import BackToCourseBtn from '@/helpers/BackToCourseBtn';

export default function Exercises({ idModule }) {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	const role = session?.token?.user?.role;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { module, getModule } = useSelectedModule();
	const { exercises, getExercises } = useExercisesStore();

	const { user, getProfile } = useUserProfile();
	const { modules, getModules, getQuiz } = useModulesStore();
	const [moduleData, setModuleData] = useState([]);
	const [exercisesDataLoaded, setExercisesDataLoaded] = useState(false);
	const [currentQuestion, setCurrentQuestion] = useState(null);
	const [access, setAccess] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [dataUpdated, setDataUpdated] = useState(false);
	const [currentModule, setCurrentModule] = useState('');
	const [firstEffectExecuted, setFirstEffectExecuted] = useState(false);

	useEffect(() => {
		getModule(idModule)
		setExercisesDataLoaded(true)
	}, []);

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

	const renderModuleExercises = () => {
		if (module.exercises) {
			return module.exercises.map((elem, exerciseIndex) => {
				console.log('elem en map', elem);
				return renderExercises(exerciseIndex, elem, handleExerciseClick);
			});
		}
	};

	const handleExerciseClick = questions => {
		setCurrentQuestion(questions);
	};

	useEffect(() => {
		console.log('currentQuestion ', currentQuestion);
	}, [currentQuestion]);

	return (
		// h-[81vh]
		<Card className={containerVideos + ' bg-white navcolor md:h-[81vh]'}>
			<section className={div1 + ' parent  bg-foreground  mt-12'}>

				<div className='  flex-col bg-primary m-3 flex' id='reproductor'>
					{renderTextSection(currentQuestion)}
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
