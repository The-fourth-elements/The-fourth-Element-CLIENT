'use client'
import { useDisclosure, } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useSelectedModule } from '@/zustand/store/selectedModule';
import { getCookie } from 'cookies-next';
import RenderAutoRegistro from '../AutoRegistroRender/AutoRegistroRender';
import './AutoRegistroView.scss'

const AutoRegistroView = () => {
	let moduleId;

	const { module, getModule } = useSelectedModule();
	const [type, setType] = useState('')


	useEffect(() => {
		if (typeof window !== 'undefined') {
			moduleId = getCookie('moduleId');
		}
		if(module){
			if(Object.keys(module).length === 0){
				getModule(moduleId).then(() => {
		});
			}
			
		}

		
	}, [module]);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<article className='articleAutoView'>
				<header>
					<h2 className=''>
						Autoregistro de tu rendimiento
					</h2>
				</header>
				<section className=''>
					{module?.selfRegister?.length > 0 && (
						<>
							<div className='sectionCompetencia' onClick={() => {onOpen()
									setType("competencia")}}>
							<button  className='buttonCompetencia'>
								Resgistrar Competencia
							</button>
							<p>En esta seccion podras guardar el registro de tu rendimiento en las competencias y las razones de ello</p>
							</div>	
							<div className='sectionEntrenamiento' onClick={() => {onOpen()
									setType("negligencia")}}>
							<button  className='buttonEntrenamiento'>
								Resgistrar Negligencia
							</button>
							<p>En esta seccion podras guardar el registro de tu rendimiento en los entrenamientos y las razones de ello</p>
							</div>
							
							<RenderAutoRegistro
								className='renderAutoRegistro'
								type = {type}
								data={module?.selfRegister}
								isOpen={isOpen}
								onOpenChange={onOpenChange}
								onOpen={onOpen}
							/>
						</>		
					
					
						
					)}
				</section>
				<footer> 
				</footer>
			<button onClick={() => console.log(module)}> clickeame</button>
		</article>
	);
}

export default AutoRegistroView;