'use client';
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@nextui-org/react';
import FormCreator from './FormCreator'
import {modalHeight} from './formStyles.module.scss'


const ModalSelf = () => {
	const { onOpen, isOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Abrir modal</Button>
			<Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} backdrop='opaque'>
				<ModalContent className={`${modalHeight}`} >
					{onClose => (
						<>
							<ModalHeader><h3 className={`w-full text-center text-2xl`}  >Autoconocimiento</h3></ModalHeader>
							<ModalBody className='h-full bg-black relative'>
                                <FormCreator />
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={onClose}>Salir</Button>
                            </ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalSelf;
