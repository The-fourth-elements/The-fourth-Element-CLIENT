'use client';
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
// import '@/components/createClass/CreateClassStyles.scss'
import '../components/createClass/CreateClassStyles.scss';
import QuizForm from '@/components/QuizForm/QuizForm';

const ModalEditClass = ({ idQuiz , isOpenModal, onOpenChangeModal }) => {


	return (
		<>
			<Modal
				isOpen={isOpenModal}
				onOpenChange={onOpenChangeModal}
				backdrop='blur'
				size='5xl'
				>
				<ModalContent>
					{onClose => (
						<>
							<ModalHeader className='flex flex-col gap-1 '>
								Editar Quiz
							</ModalHeader>
							<ModalBody>
								<QuizForm update={true} idQuiz={idQuiz}/>
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

export default ModalEditClass;
