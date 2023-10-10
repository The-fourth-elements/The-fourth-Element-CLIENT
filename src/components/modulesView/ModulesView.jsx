'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
	Card,
	Link,
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
import { LogarithmicScale } from 'chart.js';

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
	  fetchData();
	}, [modules, session, dataUpdated]);
  
	const fetchData = async () => {
	  const fetchedModuleData = {};
  
	  for (const module of modules) {
		const classDataArray = [];
		for (const elem of module.classModule) {
		  try {
			const url = `${process.env.API_BACKEND}class/${elem._id}`;
			const response = await fetch(url);
			const classData = await response.json();
			classDataArray.push(classData);
		  } catch (error) {
			console.error(
			  `Error al obtener datos de clase para el módulo ${module.id}:`,
			  error
			);
			toastError('No se pudieron obtener los modulos');
		  }
		}
		fetchedModuleData[module.name] = classDataArray;
	  }
	  setModuleData(fetchedModuleData);
	  setModulesDataLoaded(true);
	  console.log(moduleData, 'soy la data');
	};
  
	const handleDataUpdate = () => {
	  setDataUpdated(true);
	};
  
	useEffect(() => {
	  if (dataUpdated) {
		setDataUpdated(false);
	  }
	}, [dataUpdated]);
  
	const renderModuleClasses = (moduleData, moduleIndex) => {
		return moduleData[modules[moduleIndex].name]?.map((elem, classIndex) => {
		  const moduleProgress = user?.progress?.modules.find((module) =>
			module.moduleId === modules[moduleIndex]._id
		  );
	  
		  if (!moduleProgress) {
			return (
			  <AccordionItem
				key={classIndex}
				textValue={elem?.name}
				title={elem?.name}
				disabled={true}
			  >
				<div className="flex justify-between">
				  <span className="cursor-pointer">Entrar</span>
				</div>
				<span>Este módulo aún no se ha iniciado.</span>
			  </AccordionItem>
			);
		  }
	  
		  const classInfo = moduleProgress.classes.find(
			(classItem) => classItem.name === elem.name
		  );
	  
		  if (!classInfo) {
			return <p>Error: Clase no encontrada en el progreso.</p>;
		  }
	  
		  const unlockDate = new Date(classInfo.unlockDate);
		  const currentDate = new Date();
	
		  if (unlockDate > currentDate) {
			return (
			  <AccordionItem
				key={classIndex}
				textValue={elem?.name}
				title={elem?.name}
				disabled={true}
			  >
				<div className="flex justify-between">
				  <span className="cursor-pointer">Entrar</span>
				</div>
				<span>
				  Clase bloqueada hasta {unlockDate.toLocaleString()}.
				</span>
			  </AccordionItem>
			);
		  }
	  
		  return (
			<AccordionItem
			  key={classIndex}
			  textValue={elem?.name}
			  title={elem?.name}
			>
			  <div className="flex justify-between">
				<span
				  className="cursor-pointer"
				  onClick={() => handleClassClick(elem.name)}
				>
				  Entrar
				</span>
				{access && (
				  <>
					<EditIcon
					  className="cursor-pointer rounded-full transition-background hover:opacity-70"
					  width="30"
					  height="30"
					  onClick={onOpen}
					/>
					<ModalEditClass
					  classValues={elem}
					  isOpen={isOpen}
					  handleDataUpdate={handleDataUpdate}
					  onOpenChange={onOpenChange}
					></ModalEditClass>
				  </>
				)}
			  </div>
			</AccordionItem>
		  );
		});
	  };
	  
	  
	const renderVideo = () => {
		if (currentClass) {
		  const selectedModule = modules.find((module) =>
			module.classModule.some((classItem) => classItem.name === currentClass)
		  )?.name;
		  const selectedClassData = moduleData[selectedModule]?.find(
			(elem) => elem.name === currentClass
		  );
	
		  if (selectedClassData) {
			return <video src={selectedClassData?.video?.url} controls={true} />;
		  }
		}
		return <p>Selecciona una clase para ver el video.</p>;
	  };
	
	  const renderDescription = () => {
		if (currentClass) {
		  const selectedModule = modules.find((module) =>
			module?.classModule?.some((classItem) => classItem?.name === currentClass)
		  )?.name;
		  const selectedClassData = moduleData[selectedModule]?.find(
			(elem) => elem?.name === currentClass
		  );
		  if (selectedClassData) {
			return (
			  <>
				<h3 className="text-lg">Descripción</h3>
				<br />
				<p>{selectedClassData.description}</p>
				<br />
	
				<h3 className="p-2 m-3 cursor-pointer">
				  Power Point:
				  <a href={selectedClassData?.powerPoint?.url} target="_blank">
					Archivo
				  </a>
				</h3>
			  </>
			);
		  }
		}
		return <p>Selecciona una clase para ver la descripción.</p>;
	  };
	  const fetchClassByProgress = () => {
		const classDesblock = user?.progress?.modules.map((module) =>
		  module?.classes?.map((clase) => {
			const unlockDate = new Date(clase.unlockDate);
			console.log(clase, 'holi1');
			console.log(unlockDate, 'holi2');
			const currentDate = new Date();
			return {
			  ...clase,
			  locked: unlockDate > currentDate,
			};
		  })
		);
		console.log(classDesblock);
	  };
	  const verifyProgressUser = async () => {
		try {
		  if (!user?.progress) {
			console.log('hice la petición y creé el progreso del usuario');
			const progress = await postData(
			  `${process.env.API_BACKEND}startCourse/${id}`
			);
			console.log(progress);
			toastSuccess(progress?.message);
			getProfile(id);
		  }
		} catch (error) {
		  toastError(error);
		}
	  };
	  console.log(user);
  
	const handleClassClick = (className) => {
	  setCurrentClass(className);
	};
  
	return (
	  <>
		<Card className={containerVideos + ' navcolor'}>
		  <main
			className={div1 + ' parent grid grid-row-1 md:grid-row-2 bg-foreground'}
		  >
			<div className="bg-black h-unit-8xl m-3 flex justify-center">
			  {renderVideo()}
			</div>
			<Card className="flex p-3 bg-transparent shadow-none">
			  <h2
				className={
				  h2Title +
				  ' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'
				}
			  >
				{modules[0]?.name}
			  </h2>
			  <Accordion>
				<AccordionItem
				  className={
					acordionItem +
					' p-2 m-1 bg-transparent rounded md:m-0 text-background'
				  }
				  title="Recursos"
				  textValue={`${accordion}`}
				>
				  {renderDescription()}
				</AccordionItem>
			  </Accordion>
			</Card>
		  </main>
		  <aside className={`${div2} bg-foreground md:w-96`}>
			<nav className={`${navtContainer} flex flex-col bg-secondary m-3 rounded`}>
			  <ul className="m-2">
				{modulesDataLoaded ? (
				  modules.map(({ name, paid }, index) =>
					(!paid || role > 0) && (
					  <li className="m-2" key={index}>
						<Accordion>
						  <AccordionItem
							className={`${acordionItem} p-2 m-1 bg-transparent rounded md:m-0 text-background`}
							title={`Módulo: ${name}`}
							onPress={verifyProgressUser}
						  >
							<Accordion>{renderModuleClasses(moduleData, index)}</Accordion>
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
		  <button onClick={fetchClassByProgress}>holi</button>
		</Card>
	  </>
	);
  }