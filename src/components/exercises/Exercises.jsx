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
import {
	fetchDataSingleModule,
	renderTextSection,
	renderDescription,
} from './fetchExercisesModule';
import { renderExercises } from './renderExercises';
import { useSelectedModule } from '@/zustand/store/selectedModule';
import { exercises } from './mockExercises';

export default function Exercises({ idModule }) {
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
	const [currentQuestion, setCurrentQuestion] = useState(null);
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

	const handleDataUpdate = () => {
		setDataUpdated(true);
	};

	const renderModuleExercises = exercises => {
		if (exercises) {
			return exercises.map((elem, exerciseIndex) => {
				console.log('elem en map', elem);
				if (access) {
					return renderExercises(exerciseIndex, elem, handleExerciseClick);
				}
			});
		}
	};

	const verifyProgressUser = async () => {
		console.log('VERIFY PROGRESS USER');
		try {
			const modulesProgress = user?.progress?.modules;
			const totalClasses = module.classModule.length;

			console.log('module.classModule', module.classModule);

			if (user?.role < 2) {
				if (!user?.progress) {
					console.log('HOLA1');

					console.log(user);
					const progress = await postData(
						`${process.env.API_BACKEND}startCourse/${id}`
					);
					console.log('HOLA');
					toastSuccess(progress?.message);
					getProfile(id);
				} else {
					console.log('HOLA2');

					const countClassesUser = modulesProgress.find(
						elem => elem._id === module._id
					)?.classes?.length;

					console.log(
						'totalClasses ',
						totalClasses,
						'countClassesUser ',
						countClassesUser
					);

					if (totalClasses !== countClassesUser) {
						console.log('HOLA3');

						const progress = await postData(
							`${process.env.API_BACKEND}startCourse/${id}`
						);
						console.log('HOLA4');

						toastInfo(progress?.message);
						getProfile(id);
					}
				}
			}
		} catch (error) {
			toastError(error);
		}
	};

	const handleExerciseClick = question => {
		setCurrentQuestion(question);
	};

	return (                                // h-[81vh]
			<Card className={containerVideos + ' navcolor md:h-[81vh]'} > 
				<main
					className={
						div1 + ' parent grid grid-row-1 md:grid-row-2 bg-foreground'
					}>
					<div
						className='  flex-col bg-primary m-3 flex'
						id='reproductor'>
						{renderTextSection(currentQuestion)}
						{currentQuestion ? (
							<Formik
								initialValues={{ answer: '' }}
								onSubmit={async (values, { resetForm }) => {
									try {
										// Agrega aquí la lógica para enviar la respuesta al servidor.
										// values.answer contiene la respuesta ingresada por el usuario.
										// Puedes usar un método como postData para enviar los datos al servidor.

										// Después de un envío exitoso, puedes realizar acciones como mostrar una notificación o limpiar el formulario.
										toastSuccess('Respuesta enviada con éxito');
										resetForm(); // Esto reiniciará el formulario para que el usuario pueda ingresar otra respuesta si es necesario.
									} catch (error) {
										toastError(
											'Error al enviar la respuesta. Inténtalo de nuevo.'
										);
									}
								}}>
								<Form className='flex flex-col '>
									<Textarea 
                  isRequired
                  classNames={{label: "text-white text-lg"}}
                  className='p-5'
										name='answer'
										label='Respuesta'
										labelPlacement='inside'
										placeholder='Escribe tu respuesta aquí'
									/>
									<Button className='w-fit px-3 py-1 m-0 mb-5 mx-auto bg-green-600 hover:bg-green-800' type='submit'>Enviar respuesta</Button>
								</Form>
							</Formik>
						) : (
							''
						)}
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
				<aside className={`${div2} bg-foreground md:w-96`}>
					<nav
						className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
						<ul className='m-2'>
							{true ? (
								<Accordion
									itemClasses={{
										title: 'text-black text-medium',
									}}>
									{renderModuleExercises(exercises)}
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
