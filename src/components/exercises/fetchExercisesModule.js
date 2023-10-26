

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
