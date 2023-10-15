import { CldVideoPlayer } from 'next-cloudinary'
import 'next-cloudinary/dist/cld-video-player.css';

export const fetchData = async (modules) => {
    const fetchedModuleData = {};

    for (const module of modules) {
        const classDataArray = [];
        for (const elem of module.classModule) {
            try {
                const url = `${process.env.API_BACKEND}class/${elem._id}`;
                const response = await fetch(url);
                const classData = await response.json();
                classDataArray.push(classData);
            } catch (error) {
                console.error(
                    `Error al obtener datos de clase para el módulo ${module.id}:`,
                    error
                );
                toastError('No se pudieron obtener los modulos');
            }
        }
        fetchedModuleData[module.name] = classDataArray;
    }
    return fetchedModuleData
};



export const renderVideo = (modules, currentClass, moduleData) => {
    if (currentClass) {
        const selectedModule = modules.find(module =>
            module.classModule.some(classItem => classItem.name === currentClass)
        )?.name;
        const selectedClassData = moduleData[selectedModule]?.find(
            elem => elem.name === currentClass
        );
        if (selectedClassData) {

            return (
                <>
                    <video
                        src={selectedClassData?.video?.url}
                        controls
                        id='video'
                    />
                </>)
        }
    }
    return <p>Selecciona una clase para ver el video.</p>;
};

export const renderDescription = (currentClass, modules, moduleData) => {
    if (currentClass) {
        const selectedModule = modules.find(module =>
            module?.classModule?.some(classItem => classItem?.name === currentClass)
        )?.name;
        const selectedClassData = moduleData[selectedModule]?.find(
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

