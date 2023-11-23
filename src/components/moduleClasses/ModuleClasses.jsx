'use client';
import { useState, useEffect } from 'react';
import {
	Card,
	Accordion,
	AccordionItem,
	accordion,
	useDisclosure,
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
import { postData } from '@/hooks/fetchData';
import { useUserProfile } from '@/zustand/store/userProfile';
import {
	fetchDataSingleModule,
	renderVideo,
	renderDescription,
} from './fetchDataModule';
import {
	renderClassDefault,
	renderClassLock,
	renderClassNotProgress,
	renderClassSpecialRole,
} from './renderClasses';
import { useSelectedModule } from '@/zustand/store/selectedModule';

export default function ModuleClasses({ idModule }) {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	const role = session?.token?.user?.role;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { module, getModule } = useSelectedModule();

	const { user, getProfile } = useUserProfile();
	const { modules, getModules, getQuiz } = useModulesStore();
	const [moduleData, setModuleData] = useState([]);
	const [modulesDataLoaded, setModulesDataLoaded] = useState(false);
	const [currentClass, setCurrentClass] = useState(null);
	const [access, setAccess] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [dataUpdated, setDataUpdated] = useState(false);
	const [currentModule, setCurrentModule] = useState('');
	const [firstEffectExecuted, setFirstEffectExecuted] = useState(false);

	useEffect(() => {
		getModule(idModule).then(() => {
			setFirstEffectExecuted(true);
		});
		verifyProgressUser();
	}, []);

	useEffect(() => {
		if (firstEffectExecuted) {
			if (session) {
				if (session?.token?.user) {
					const { role } = session.token.user;
					role > 1 && setAccess(true);
					const id = session?.token?.user?.id;
					getProfile(id);
				}

				fetchDataSingleModule(module).then(data => {
					setModuleData(data);
					setModulesDataLoaded(true);
				});

				verifyProgressUser();
			}
		}
	}, [firstEffectExecuted, module, session, dataUpdated]);

	useEffect(() => {
		if (dataUpdated) {
			setDataUpdated(false);
		}
	}, [dataUpdated, user]);

	const handleDataUpdate = () => {
		setDataUpdated(true);
	};
	const renderModuleClasses = moduleData => {
		if (moduleData) {
			return moduleData.map((elem, classIndex) => {
				if (access) {
					return renderClassSpecialRole(
						classIndex,
						elem,
						handleClassClick,
						onOpen,
						isOpen,
						handleDataUpdate,
						onOpenChange
					);
				} else {
					if (user) {
						const modulesUser = user?.progress?.modules;
						const moduleProgress = modulesUser?.map(module => module?.classes);

						const classInfo = moduleProgress?.map(module =>
							module?.find(classItem => classItem?.name === elem?.name)
						);
						const classIsInProgress = classInfo?.some(c => c !== undefined);

						if (!moduleProgress || !classIsInProgress) {
							return renderClassLock(classIndex, elem);
						}
						return renderClassDefault(
							isOpen,
							onOpen,
							onOpenChange,
							classIndex,
							elem,
							handleClassClick,
							currentClass
						);
					}
				}
			});
		}
	};

	const verifyProgressUser = async () => {
		try {
			if (user?.role < 2) {
				if (!user?.progress) {
					const progress = await postData(
						`${process.env.API_BACKEND}startCourse/${id}`
					);
					toastSuccess(progress?.message);
					getProfile(id);
				}
			}
		} catch (error) {
			toastError(error);
		}
	};

	const handleClassClick = className => {
		setCurrentClass(className);
		setCurrentModule(className);

		if (moduleData) {
			setCurrentModule(module);
		} else {
			toastError('Algo ocurrió, por favor contacte a un administrador');
		}
	};

	return (
		<Card className={containerVideos + ' bg-secondary-700 navcolor '}>
			<section className={div1 + '  parent grid grid-rows-1 md:grid-rows-2'}>
				<div
					className='  border-[0.75rem] border-secondary-800 bg-secondary-800 h-unit-8xl flex justify-center'
					id='reproductor'>
					{renderVideo(currentClass, moduleData)}
				</div>
				<Card className='flex p-3 bg-transparent shadow-none border-secondary-800 sm:border-r-[0.75rem]'>
					<Accordion>
						<AccordionItem
							className={
								acordionItem +
								' p-2 m-1 bg-secondary-800 rounded md:m-0 text-white'
							}
							title='Recursos'
							textValue={`${accordion}`}>
							{renderDescription(currentClass, moduleData)}
						</AccordionItem>
					</Accordion>
				</Card>
			</section>
			<aside className={`${div2} bg-secondary-800 p-[0.8rem] md:w-96 `}>
				<nav
					className={`${navtContainer} flex flex-col bg-secondary  rounded-xl`}>
					<ul className='m-2'>
						{modulesDataLoaded ? (
							<Accordion
								itemClasses={{
									title: 'text-black text-medium',
								}}>
								{renderModuleClasses(moduleData)}
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
