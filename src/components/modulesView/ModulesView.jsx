'use client';

import { modules } from '@/utils/navigation';
import { Card, Link, Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { containerVideos, div1, div2, h2Title, acordionItem, navtContainer } from './ModulesView.module.scss';
import { useSession } from 'next-auth/react';
import { postData } from '@/hooks/postData';
import { useEffect, useState } from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import  Jwt from 'jsonwebtoken';

export default function ModuleView() {
	const router = useRouter;
	const { data: session } = useSession();

	const [access, setAccess] = useState(false)
	const registerOrLogin = async () => {
		  try {
			const { email, name, image } = session.user;
		  ///para iniciar sesion o para registrarse.
		  const body = { username: name, email, provider: true };
		  //esperar la respuesta, de si esta registrado;
		  

			try {
				const res = await postData(`${process.env.API_BACKEND}auth`, body);
				if(res.includes('error')){
					throw new Error('duplicado')
				}
			} catch (error) {

				const response = await postData(`${process.env.API_BACKEND}login`, body);
				const decodedToken = Jwt.decode(response?.token);
					const userId = decodedToken.data;
					destroyCookie(null, "id")
					setCookie(null, "id", userId)
					setAccess(true)
			}
			
			
		  } catch (error) {
			
		  }
		
	  };
	
	  useEffect(() => {
		async function fetchData() {
			if(session?.user?.name && !access){
				await registerOrLogin();
			}
		}
		fetchData(); // Llama a la función asincrónica
	  }, [session]);
	return (
		<>
			<Card className={containerVideos + ' navcolor'}>
				<main
					className={
						div1 + ' parent grid grid-row-1 md:grid-row-2 bg-foreground'
					}>
					<div className='bg-black h-unit-8xl m-3 flex justify-center'>
						<video src="http://res.cloudinary.com/dyvnku5c4/video/upload/v1695594830/Video/bwj7edqtcl81xmurpdci.mp4" controls={true}/>
					</div>
					<Card className='flex p-3 bg-transparent shadow-none'>
						<h2 className={ h2Title + ' flex p-2 justify-center md:justify-start text-2xl text-background bg-transparent rounded'}>
							{modules[0].name}
						</h2>
						<Accordion>
							<AccordionItem className= {acordionItem + ' p-2 m-1 bg-transparent rounded md:m-0 text-background'} title='Recursos'>
                                <h3 className='text-lg'>Description</h3>
                                <br />
								<p>{modules[0].description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facilis deserunt reiciendis illo debitis eum repellat quas. A eligendi amet illo magnam nemo sed similique hic, deserunt harum? Quos, pariatur!</p>
                                <br />
                                <Link href='#' className='flex justify-center bg-transparent rounded'>
                                    <h3 className='p-2 m-3 cursor-pointer'>
                                        Power Point Module: {modules[0].name}
                                    </h3>
                                </Link>
							</AccordionItem>
						</Accordion>
					</Card>
				</main>
				<aside className={ div2 + ' bg-foreground md:w-96 '}>
					<nav className={navtContainer + ' flex flex-col bg-secondary m-3 rounded'}>
						<ul className='m-2'>
							{modules.map(({ video_url, name }) => (
								<li className='m-2' key={name}>
									<Link
										video_url={video_url}
										className={`flex p-2 bg-boxGreyHard rounded hover:bg-background hover:text-foreground cursor-pointer ${
											router.asPath === video_url && ' text-white'
										}`}>
										{name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</aside>
			</Card>
		</>
	);
}
