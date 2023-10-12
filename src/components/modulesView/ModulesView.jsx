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
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import { toastError, toastSuccess } from '@/helpers/toast';
import ModalEditClass from '@/helpers/ModalEditClass';
import { postData } from '@/hooks/postData';
import { useUserProfile } from '@/zustand/store/userProfile';
import { fetchData, renderVideo, renderDescription } from './fetchDataModules';

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
					return (
						<AccordionItem
							key={classIndex}
							textValue={elem?.name}
							title={elem?.name}>
							<div className='flex justify-between'>
								<span
									className='cursor-pointer'
									onClick={() => handleClassClick(elem.name)}>
									Entrar
								</span>

								<EditIcon
									className='cursor-pointer rounded-full transition-background hover:opacity-70'
									width='30'
									height='30'
									onClick={onOpen}
								/>
								<ModalEditClass
									classValues={elem}
									isOpen={isOpen}
									handleDataUpdate={handleDataUpdate}
									onOpenChange={onOpenChange}></ModalEditClass>
							</div>
						</AccordionItem>
					);
				} else {
					if (user) {
						const moduleProgress = user?.progress?.modules?.find(
							module => {
								return module[moduleIndex]?.moduleId === modules[moduleIndex]._id}
						);
						const classInfo = moduleProgress?.map((module)=>{
							return module?.classes?.find(
								classItem => {
									return classItem.name === elem.name
								}
							);
						})
						if (!moduleProgress) {
							// Este módulo aún no se ha iniciado.
							return (
								<AccordionItem
									key={classIndex}
									textValue={elem?.name}
									title={elem?.name}
									disabled={true}>
									<div className='flex justify-between'>
										<span className='cursor-pointer'>Entrar</span>
									</div>
									<span>Este módulo aún no se ha iniciado.</span>
								</AccordionItem>
							);
						}
						const unlockDate = new Date(classInfo[0]?.unlockDate);
						const currentDate = new Date();

						if (unlockDate > currentDate) {
							// Clase bloqueada hasta una fecha futura.
							console.log(unlockDate, '<== unlock', '===> ahorra', currentDate);
							return (
								<AccordionItem
									key={classIndex}
									textValue={elem?.name}
									title={elem?.name}
									disabled={true}>
									<div className='flex justify-between'>
										<span className='cursor-pointer'>Entrar</span>
									</div>
									<span>
										Clase bloqueada hasta {unlockDate.toLocaleString()}.
									</span>
								</AccordionItem>
							);
						}
						// Si ninguna de las condiciones anteriores se cumple, la clase está disponible.
						return (
							<AccordionItem
								key={classIndex}
								textValue={elem?.name}
								title={elem?.name}>
								<div className='flex justify-between'>
									<span
										className='cursor-pointer'
										onClick={() => handleClassClick(elem.name)}>
										Entrar
									</span>
								</div>
							</AccordionItem>
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
		const module = modules.find(module => {
			const classEqual = module.classModule.find(
				clase => clase.name === className
			);
			return classEqual;
		});
		if (module) {
			setCurrentModule(module.name);
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
					<div className='bg-black h-unit-8xl m-3 flex justify-center'>
						{renderVideo(modules, currentClass, moduleData)}
					</div>
					<Card className='flex p-3 bg-transparent shadow-none'>
						<h2
							className={
								h2Title +
								' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'
							}>
							{currentModule ? `Módulo: ${currentModule}` : ''}{' '}
							{/* Renderizar el módulo seleccionado */}
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
