// import React, { useEffect, useState } from 'react';
// import {
// 	ModalContent,
// 	Modal,
// 	ModalHeader,
// 	ModalBody,
// 	ModalFooter,
// 	Button,
// 	useDisclosure,
// } from '@nextui-org/react';
// import '../components/createClass/CreateClassStyles.scss';
// import MeditationForm from '@/components/meditationForm/MeditationForm'; // Asume que tienes un componente MeditationForm
// //import { getMeditation } from '@/zustand/actions/meditationStoreActions';  Asume que tienes una función similar para obtener datos de meditaciones

// const ModalCreateMeditation = ({
// 	idMeditation,
// 	isOpenModal,
// 	onOpenChangeModal,
// 	onClose,
// }) => {
// 	const [meditationData, setMeditationData] = useState(null);

// 	useEffect(() => {
// 		// Función asincrónica para obtener los datos de la meditación (si es necesario)
// 		async function fetchMeditationData() {
// 			try {
// 				const data = await getMeditation(idMeditation);
// 				setMeditationData(data);
// 				console.log(data);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		}

// 		// Llamar a la función para cargar los datos (si es necesario)
// 		if (idMeditation) {
// 			fetchMeditationData();
// 		}
// 	}, [idMeditation]);

// 	return (
// 		<Modal
// 			isOpen={isOpenModal}
// 			onOpenChange={onOpenChangeModal}
// 			backdrop='blur'
// 			size='5xl'
// 			onClose={onClose}
// 		>
// 			<ModalContent>
// 				{onClose => (
// 					<>
// 						<ModalHeader className='flex flex-col gap-1 '>
// 							{meditationData ? 'Editar Meditación' : 'Crear Meditación'}
// 						</ModalHeader>
// 						<ModalBody>
// 							{/* Pasar meditationData como prop a MeditationForm */}
// 							<MeditationForm
// 							/>
// 						</ModalBody>
// 						<ModalFooter>
// 							<Button color='danger' variant='light' onPress={onClose}>
// 								Cancelar
// 							</Button>
// 						</ModalFooter>
// 					</>
// 				)}
// 			</ModalContent>
// 		</Modal>
// 	);
// };

// export default ModalCreateMeditation;
