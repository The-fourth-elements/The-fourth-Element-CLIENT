'use client';

import { modules } from '@/utils/navigation';
import { Card, Link, Accordion, AccordionItem } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { containerVideos, div1, div2 } from './ModulesView.module.scss';

export default function ModuleView() {
	const router = useRouter;
    

	return (
		<>
			<Card className={containerVideos + ' navcolor'}>
				<main
					className={
						div1 + ' parent grid grid-row-1 md:grid-row-2 items-center'
					}>
					<div className='bg-white w-96 h-unit-8xl m-3 flex justify-center'></div>
					<Card className='flex p-3'>
						<h2 className='flex p-3 justify-center md:justify-start text-2xl'>
							{modules[0].name}
						</h2>
						<Accordion className='text-xs'>
							<AccordionItem className='p-2' title='Description'>
								{modules[0].description}
							</AccordionItem>
						</Accordion>
						<Link className='flex justify-center'>
							<h3 className='p-3 text-foreground cursor-pointer'>
								Power Point Module: {modules[0].name}
							</h3>
						</Link>
					</Card>
				</main>
				<aside className={ div2 + ' bg-white w-full md:w-96 m-1'}>
					<nav>
						<ul>
							{modules.map(({ video_url, name }) => (
								<li className='m-2' key={name}>
									<Link
										video_url={video_url}
										className={`flex p-2 bg-secondary rounded hover:bg-background hover:text-foreground cursor-pointer ${
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
