import { Pagination } from '@nextui-org/react';
import React, { useState } from 'react';

export const RenderTracksForm = tracks => {
    const tracksArray = tracks.tracks
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	if (tracksArray.length > 0) {
		return (
			<div className='space-y-4 flex flex-col justify-between h-full items-center w-full'>
						<audio
							className='w-full'
							controls
							controlsList='nodownload'
							src={tracksArray[currentTrackIndex]?.url}></audio>

				<Pagination
					showControls
					total={tracksArray.length}
					page={currentTrackIndex + 1}
					classNames={{
						item: "",
											cursor:
											  " text-white font-bold",
						wrapper:
								'gap-0 overflow-visible h-8 rounded border border-divider',
					}}
					onChange={newPage => setCurrentTrackIndex(newPage - 1)}
				/>
			</div>
		);
	} else {
		return <p>Cargue un track</p>;
	}
};
