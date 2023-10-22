import 'next-cloudinary/dist/cld-video-player.css';
export const fetchDataSingleModule = async module => {
	const fetchedModuleData = [];
	
	try {
		for (const elem of module.classModule) {
			const url = `${process.env.API_BACKEND}class/${elem._id}`;
			const response = await fetch(url);

			if (response.ok) {
				const classData = await response.json();
				console.log("classData", classData);
				fetchedModuleData.push(classData);
			} else {
				console.error(
					`Error al obtener datos de clase para el módulo ${module._id}. Código de respuesta: ${response.status}`
				);
			}
		}
	} catch (error) {
		console.error(
			`Error general al obtener datos del módulo ${module._id}:`,
			error
		);
	}

	console.log('fetchDataSingleModule', fetchedModuleData);

	return fetchedModuleData;
};

export const renderVideo = (currentClass, moduleData) => {
	if (currentClass) {
		const selectedClassData = moduleData?.find(
			elem => elem.name === currentClass
		);
		if (selectedClassData) {
			return (
				<>
					<video src={selectedClassData?.video?.url} controls id='video' />
				</>
			);
		}
	}
	return <p>Selecciona una clase para ver el video.</p>;
};

export const renderDescription = (currentClass, moduleData) => {
	if (currentClass) {
		
		const selectedClassData = moduleData?.find(
			elem => elem?.name === currentClass
		);
		if (selectedClassData) {
			return (
				<>
					<h3 className='text-lg'>Descripción</h3>
					<br />
					<p>{selectedClassData.description}</p>
					<br />

					<h3 className='p-2 m-3 cursor-pointer'>
						Power Point:
						<a href={selectedClassData?.powerPoint?.url} target='_blank'>
							Archivo
						</a>
					</h3>
				</>
			);
		}
	}
	return <p>Selecciona una clase para ver la descripción.</p>;
};
