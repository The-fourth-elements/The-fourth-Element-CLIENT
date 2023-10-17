import React, { useEffect, useState } from 'react';
import {
	ModalContent,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
} from '@nextui-org/react';
import '../components/createClass/CreateClassStyles.scss';
import QuizForm from '@/components/QuizForm/QuizForm';
import { getQuiz } from '@/zustand/actions/modulesStoreActions';

const ModalEditQuiz = ({
	idQuiz,
	isOpenModal,
	onOpenChangeModal,
	update,
	onClose,
}) => {
	const [quizData, setQuizData] = useState(null);

	useEffect(() => {
		// Función asincrónica para obtener los datos del quiz
		async function fetchQuizData() {
			try {
				const data = await getQuiz(idQuiz);
				setQuizData(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}

		// Llamar a la función para cargar los datos
		fetchQuizData();
	}, [idQuiz]);

	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onOpenChange={onOpenChangeModal}
				backdrop='blur'
				size='5xl'
				onClose={onClose}>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1 '>
								{update ? 'Editar Quiz' : 'Crear Quiz'}
							</ModalHeader>
							<ModalBody>
								{/* Pasar quizData como prop a QuizForm */}
								<QuizForm
									data={quizData}
									onClose={onClose}
									update={update}
									idQuiz={idQuiz}
								/>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Cancelar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalEditQuiz;
