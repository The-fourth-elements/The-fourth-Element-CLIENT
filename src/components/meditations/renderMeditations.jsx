import { AccordionItem, Button, Pagination } from '@nextui-org/react';
import { useState } from 'react';

export const renderMeditations = (
	meditationIndex,
	elem,
	handleMeditationClick
) => {
	return (
		<AccordionItem
			key={meditationIndex}
			textValue={elem?.name}
			title={elem?.name}>
			<div className='flex justify-between items-center'>
				<Button
					className='cursor-pointer rounded-full'
					onPress={() => handleMeditationClick(elem)}>
					Entrar
				</Button>
			</div>
		</AccordionItem>
	);
};

export const renderTrack = (currentMeditation, currentTrackIndex, setCurrentTrackIndex) => {
	console.log("currentMeditation", currentMeditation);
	if (
		currentMeditation?.tracks
		
	) {
		return (
			<div className='flex flex-col justify-between h-full items-center'>
				<h1>{currentMeditation.name}</h1>
				<h2>{currentMeditation.description}</h2>

				<audio className=' w-full sm:w-11/12 md:w-3/5'  controls controlsList="nodownload" src={currentMeditation.tracks[currentTrackIndex].url}></audio>
				<div>
					<Pagination
					showControls
						total={currentMeditation.tracks.length}
						page={currentTrackIndex + 1}
						classNames={{
							item: "w-8 h-8 text-small rounded-none bg-transparent",
											cursor:
											  " modern primary-500  text-white font-bold",
							wrapper:
								'gap-0 overflow-visible h-8 rounded border border-divider',
							
							
						}}
						onChange={newPage => setCurrentTrackIndex(newPage - 1)}
					/>
				</div>
			</div>
		);
	} else {
		return <p>Seleccione una meditación</p>;
	}
};
