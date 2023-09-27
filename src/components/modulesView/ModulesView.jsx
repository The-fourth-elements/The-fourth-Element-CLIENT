'use client';

import { modules, classes } from '@/utils/navigation';
import { Card, Link, Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import {
	containerVideos,
	div1,
	div2,
	h2Title,
	acordionItem,
	navtContainer,
} from './ModulesView.module.scss';
import { useSession } from 'next-auth/react';
import { getCookie, setCookie } from 'cookies-next';
import { useModulesStore } from '@/zustand/store/modulesStore';
import { useState, useEffect } from 'react';

export default function ModuleView() {
	const router = useRouter;
	const { data: session } = useSession();
	console.log(session);

	const id = session?.token?.user?.id;
	if (id) {
		setCookie('jsdklfsdjklfdsjfds', id);
		const holi = getCookie('jsdklfsdjklfdsjfds');
		console.log(holi);
	}
	const { modules, getModules } = useModulesStore();
	const [classList, setClassList] = useState([]);
	const [access, setAccess] = useState(false);

	/*
		clase : {id, nombre, video, powerpoint };
		modules : {[clase], }
		
	*/

	let modulesWithClass = [];
	useEffect(() => {
		getModules();
		// async function fetchData() {
		// 	if(session?.user?.name && !access){
		// 		await registerOrLogin();
		// 	}
		// }
		// fetchData(); // Llama a la función asincrónica
	}, []);

	/*useEffect(() => {
		const promiseList = modules.map((module) => {
		  return module.classModule.map((elem) => {
			const url = `${process.env.API_BACKEND}class/${elem}`;
			return fetch(url);
		  });
		});
	  
		const flattenedPromiseList = [].concat(...promiseList);
	  
		// Usar Promise.all para esperar a que todas las promesas se completen
		Promise.all(flattenedPromiseList)
		  .then((responses) => {
			const jsonPromises = responses.map((response) => response.json());
			return Promise.all(jsonPromises);
		  })
		  .then((data) => {
			setClassList(data);
		  });
	  }, [modules]); // Agrega 'modules' como dependencia
	  

	const promiseList = modules.map(module => {
		return module.classModule.map(elem => {
			const url = `${process.env.API_BACKEND}class/${elem}`;
			return fetch(url);
		});
	});*/

	useEffect(() => {
		const moduleData = {}; // Objeto para almacenar los datos de las clases por módulo
	  
		const promiseList = modules.map((module) => {
		  const classDataArray = [];
	  
		  return Promise.all(
			module.classModule.map((elem) => {
			  const url = `${process.env.API_BACKEND}class/${elem}`;
			  return fetch(url)
				.then((response) => response.json())
				.then((classData) => {
				  classDataArray.push(classData);
				})
				.catch((error) => {
				  console.error(`Error al obtener datos de clase para el módulo ${module.id}:`, error);
				});
			})
		  )
		  .then(() => {
			moduleData[module.name] = classDataArray; // Usa el nombre del módulo como clave en moduleData
		  });
		});
	  
		Promise.all(promiseList)
		  .then(() => {
			// moduleData ahora contiene los datos de las clases por módulo
			console.log("moduleData: ", moduleData);
			// Puedes hacer lo que necesites con moduleData aquí
		  });
	  }, [modules]);
	  

	/*const flattenedPromiseList = [].concat(...promiseList);

	// Usar Promise.all para esperar a que todas las promesas se completen
	Promise.all(flattenedPromiseList)
		.then(responses => {
			const jsonPromises = responses.map(response => response.json());
			return Promise.all(jsonPromises);
		})
		.then(data => {
			setClassList(data);
		});

	console.log('COSO');*/
	return (
		<>
			<Card className={containerVideos + ' navcolor'}>
				<main
					className={
						div1 + ' parent grid grid-row-1 md:grid-row-2 bg-foreground'
					}>
					<div className='bg-black h-unit-8xl m-3 flex justify-center'>
						<video
							src='http://res.cloudinary.com/dyvnku5c4/video/upload/v1695594830/Video/bwj7edqtcl81xmurpdci.mp4'
							controls={true}
						/>
					</div>
					<Card className='flex p-3 bg-transparent shadow-none'>
						<h2
							className={
								h2Title +
								' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'
							}>
							{modules[0]?.name}
						</h2>
						<Accordion>
							<AccordionItem
								className={
									acordionItem +
									' p-2 m-1 bg-transparent rounded md:m-0 text-background'
								}
								title='Recursos'>
								<h3 className='text-lg'>Description</h3>
								<br />
								<p>
									{modules[0]?.description} Lorem ipsum dolor sit amet
									consectetur adipisicing elit. Perspiciatis facilis deserunt
									reiciendis illo debitis eum repellat quas. A eligendi amet
									illo magnam nemo sed similique hic, deserunt harum? Quos,
									pariatur!
								</p>
								<br />
								<Link
									href='#'
									className='flex justify-center bg-transparent rounded'>
									<h3 className='p-2 m-3 cursor-pointer'>
										Power Point Module: {modules[0]?.name}
									</h3>
								</Link>
							</AccordionItem>
						</Accordion>
					</Card>
				</main>
				<aside className={div2 + ' bg-foreground md:w-96 '}>
					<nav
						className={
							navtContainer + ' flex flex-col bg-secondary m-3 rounded'
						}>
						<ul className='m-2'>
							{modules.map(({ video_url, name }, index) => (
								<li className='m-2' key={index}>
									<Accordion>
										<AccordionItem
											className={
												acordionItem +
												' p-2 m-1 bg-transparent rounded md:m-0 text-background'
											}
											title={`Módulo: ${name}`}>
											<p> CLASES: {classList?.map(elem => elem.name)}</p>
										</AccordionItem>
									</Accordion>
								</li>
							))}
						</ul>
					</nav>
				</aside>
			</Card>
		</>
	);
}
