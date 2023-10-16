'use client';
import { useState, useEffect } from 'react';
import {
	Card,
	Accordion,
	AccordionItem,
	accordion,
	useDisclosure,
	Modal,
	ModalContent,
	ModalBody,
	ModalFooter,
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
import { fetchData, renderVideo, renderDescription } from './fetchDataModules';
import {
	renderClassDefault,
	renderClassLock,
	renderClassNotProgress,
	renderClassSpecialRole,
} from './renderClasses';

export default function ModuleView() {
	const { data: session } = useSession();

	const id = session?.token?.user?.id;
	const role = session?.token?.user?.role;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
	}
	const { user, getProfile } = useUserProfile();
	const { modules, getModules } = useModulesStore();
	const [moduleData, setModuleData] = useState({});
	const [modulesDataLoaded, setModulesDataLoaded] = useState(false);
	const [currentClass, setCurrentClass] = useState(null);
	const [access, setAccess] = useState(false);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [dataUpdated, setDataUpdated] = useState(false);
	const [currentModule, setCurrentModule] = useState('');
	useEffect(() => {
		getModules();
	}, []);

	useEffect(() => {
		if (session) {
			if (session?.token?.user) {
				const { role } = session.token.user;
				role > 2 && setAccess(true);
				const id = session?.token?.user?.id;
				getProfile(id);
			}
		}
		fetchData(modules).then(data => setModuleData(data));
		setModulesDataLoaded(true);
	}, [modules, session, dataUpdated]);

	useEffect(() => {
		if (dataUpdated) {
			setDataUpdated(false);
		}
	}, [dataUpdated]);

	const handleDataUpdate = () => {
		setDataUpdated(true);
	};

	const renderModuleClasses = (moduleData, moduleIndex) => {
		if (moduleData) {
			return moduleData[modules[moduleIndex].name]?.map((elem, classIndex) => {
				if (access) {
					//no bloquear clases para el usuario.
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
						const unlockDate = new Date(classe[0]?.unlockDate);
						const currentDate = new Date();

						if (unlockDate > currentDate) {
							// Clase bloqueada hasta una fecha futura.

							return renderClassLock(classIndex, elem, unlockDate);
						}
						// Si ninguna de las condiciones anteriores se cumple, la clase está disponible.

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
			const modulesProgress = user?.progress?.modules;
			const countModulesUser = modulesProgress.length;
			const countClassesUser = modulesProgress.reduce((totalClass, module) => {
				return totalClass + module?.classes?.length;
			}, 0);
			const totalModules = modules.length;

			const totalClasses = modules?.reduce((totalClass, module) => {
				return totalClass + module?.classModule?.length;
			}, 0);

			if (user?.role < 2) {
				if (!user?.progress) {
					const progress = await postData(
						`${process.env.API_BACKEND}startCourse/${id}`
					);
					toastSuccess(progress?.message);
					getProfile(id);
				} else if (
					totalModules !== countModulesUser ||
					totalClasses !== countClassesUser
				) {
					const progress = await postData(
						`${process.env.API_BACKEND}startCourse/${id}`
					);
					toastInfo(progress?.message);
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
		const module = modules.find(module => {
			const classEqual = module.classModule.find(
				clase => clase.name === className
			);
			return classEqual;
		});
		if (module) {
			setCurrentModule(module);
		} else {
			toastError('Algo ocurrio, porfavor contactese con un administrador');
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
						{renderVideo(modules, currentClass, moduleData)}
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
								{renderDescription(currentClass, modules, moduleData)}
							</AccordionItem>
						</Accordion>
					</Card>
				</main>
				<aside className={`${div2} bg-foreground md:w-96`}>
					<nav
						className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
						<ul className='m-2'>
							{modulesDataLoaded ? (
								modules.map(
									({ name, paid }, index) =>
										(!paid || role > 0) && (
											<li className='m-2' key={index}>
												<Accordion>
													<AccordionItem
														className={`${acordionItem} p-2 m-1 bg-transparent rounded md:m-0 text-background`}
														title={`Módulo: ${name}`}
														onPress={verifyProgressUser}>
														<Accordion>
															{moduleData &&
																renderModuleClasses(moduleData, index)}
														</Accordion>
													</AccordionItem>
												</Accordion>
											</li>
										)
								)
							) : (
								<h1>Esperando a que se carguen los datos...</h1>
							)}
						</ul>
					</nav>
				</aside>
			</Card>
		</>
	);
}
