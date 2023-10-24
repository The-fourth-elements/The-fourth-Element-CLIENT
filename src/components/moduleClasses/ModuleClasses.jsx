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
import { postData } from '@/hooks/postData';
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
				console.log("condicion useEffect ", moduleData?.length)

				if (moduleData?.length === 0) {
				console.log("condicion useEffect ", moduleData?.length)

					fetchDataSingleModule(module).then(data => {
						setModuleData(data);
						setModulesDataLoaded(true);
					})
				}

				verifyProgressUser()
			}
		}
	}, [firstEffectExecuted, module, session, dataUpdated]);

	useEffect(() => {
		if (dataUpdated) {
			setDataUpdated(false);
		}
	}, [dataUpdated]);

	const handleDataUpdate = () => {
		setDataUpdated(true);
	};

	const renderModuleClasses = moduleData => {
		if (moduleData) {
			return moduleData.map((elem, classIndex) => {
				console.log("elem" , elem);
				if (access) {
					// Render clases con acceso especial
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
						const moduleProgress = modulesUser?.map(module => {
							return module?.classes;
						});

						const classInfo = moduleProgress?.map(module => {
							return module?.find(classItem => {
								return classItem.name === elem.name;
							});
						});
						const classe = classInfo?.filter(clase => clase !== undefined);
						if (!moduleProgress) {
							// Este modulo aun no se ha iniciado.
							return renderClassNotProgress(classIndex, elem);
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
		console.log("VERIFY PROGRESS USER");
		try {
		  const modulesProgress = user?.progress?.modules;
		  const totalClasses = module.classModule.length;

		  console.log("module.classModule" , module.classModule);
	  
		  if (user?.role < 2) {
			if (!user?.progress) {
				console.log("HOLA1");

			  console.log(user);
			  const progress = await postData(
				`${process.env.API_BACKEND}startCourse/${id}`
			  );
			  console.log("HOLA");
			  toastSuccess(progress?.message);
			  getProfile(id);
			} else {
				console.log("HOLA2");

			  const countClassesUser = modulesProgress
				.find((elem) => elem._id === module._id)
				?.classes?.length;

				console.log("totalClasses ", totalClasses , "countClassesUser " , countClassesUser);
	  
			  if (totalClasses !== countClassesUser) {
				console.log("HOLA3");

				const progress = await postData(
				  `${process.env.API_BACKEND}startCourse/${id}`
				);
				console.log("HOLA4");

				toastInfo(progress?.message);
				getProfile(id);
			  }
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
			toastError('Algo ocurrio, por favor contacte a un administrador');
		}
	};

	return (
		<>
			<Card className={containerVideos + ' navcolor '}>
				<main
					className={
						div1 + ' parent grid grid-row-1 md:grid-row-2 bg-foreground'
					}>
					<div
						className='bg-black h-unit-8xl m-3 flex justify-center'
						id='reproductor'>
						{renderVideo(currentClass, moduleData)}
					</div>
					<Card className='flex p-3 bg-transparent shadow-none'>
						<h2
							className={
								h2Title +
								' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'
							}>
							{currentModule?.name ? `Módulo: ${currentModule?.name}` : ''}
						</h2>
						<Accordion>
							<AccordionItem
								className={
									acordionItem +
									' p-2 m-1 bg-transparent rounded md:m-0 text-background'
								}
								title='Recursos'
								textValue={`${accordion}`}>
								{renderDescription(currentClass, moduleData)}
							</AccordionItem>
						</Accordion>
					</Card>
				</main>
				<aside className={`${div2} bg-foreground md:w-96`}>
					<nav
						className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
						<ul className='m-2'>
							{modulesDataLoaded ? (
								<Accordion
									itemClasses={{
										title: 'text-black text-medium',
									}}>
									{renderModuleClasses(moduleData)}
								</Accordion>
							) : (
								<h1 className='text-black'>Esperando a que se carguen los datos...</h1>
							)}
						</ul>
					</nav>
				</aside>
			</Card>
		</>
	);
}
