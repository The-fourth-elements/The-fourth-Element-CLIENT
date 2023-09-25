'use client';

import { modules, classes } from '@/utils/navigation';
import { Card, Link, Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { containerVideos, div1, div2, h2Title, acordionItem, navtContainer } from './ModulesView.module.scss';

export default function ModuleView() {
	const router = useRouter;


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
							{classes.map(({ video_url, name }, index) => (
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
