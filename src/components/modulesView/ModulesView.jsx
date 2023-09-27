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
import { getCookie, setCookie } from 'cookies-next'

export default function ModuleView() {
	const router = useRouter;
	const {data: session}  = useSession();
	console.log(session);
	
	const id = session?.token?.user?.id;
	if(id){
		setCookie("jsdklfsdjklfdsjfds", id);
		const holi  = getCookie("jsdklfsdjklfdsjfds")
		console.log(holi);
	}
	const { data: session } = useSession();
	const { modules, getModules } = useModulesStore();
	const [classList, setClassList] = useState([]);
	const [access, setAccess] = useState(false);

	useEffect(() => {
		getModules();
		// async function fetchData() {
		// 	if(session?.user?.name && !access){
		// 		await registerOrLogin();
		// 	}
		// }
		// fetchData(); // Llama a la función asincrónica
	}, [session]);
	const promiseList = modules.map(module => {
		return module.classModule.map(elem => {
			return fetch(`${process.env.API_BACKEND}class/${elem}`);
		});
	});

	const flattenedPromiseList = [].concat(...promiseList);

	console.log(flattenedPromiseList);
	// Usar Promise.all para esperar a que todas las promesas se completen
	Promise.all(flattenedPromiseList)
		.then(responses => {
			// Mapea las respuestas a las promesas de los datos JSON
			const jsonPromises = responses.map(response => response.json());

			// Usa Promise.all para esperar a que todas las promesas de datos JSON se resuelvan
			return Promise.all(jsonPromises);
		})
		.then(data => {
			console.log('Datos de todas las promesas resueltas: ', data);
			setClassList(data);
			// data ahora es una matriz de los datos JSON de las respuestas
			// Puedes trabajar con estos datos aquí
			console.log('classList ', classList);
			classList?.map(elem => console.log('elem.name', elem.name));

			// return (
			// 	<p>
			// 		CLASES: {classList?.map(elem => elem.name)}
			// 	</p>
			// );
		});

	console.log('COSO');
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
