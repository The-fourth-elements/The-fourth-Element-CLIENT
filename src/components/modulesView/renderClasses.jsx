import {
	AccordionItem,
	Modal,
	ModalContent,
	ModalBody,
	ModalFooter,
	Button,
} from '@nextui-org/react';
import QuizRender from '../QuizRender/QuizRender';
import { EditIcon } from '@/assets/svg-jsx/EditIcon';
import ModalEditClass from '@/helpers/ModalEditClass';

export const renderClassDefault = (
	isOpen,
	onOpen,
	onOpenChange,
	classIndex,
	elem,
	handleClassClick,
	currentClass
) => {
	return (
		<AccordionItem key={classIndex} textValue={elem?.name} title={elem?.name}>
			<div className='flex justify-between'>
				<span
					className='cursor-pointer'
					onClick={() => handleClassClick(elem.name)}>
					Entrar
				</span>
				{elem?.name === currentClass && <span onClick={onOpen}>quiz</span>}
				<Modal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					backdrop='blur'
					size='5xl'>
					<ModalContent>
						{onClose => (
							<>
								<ModalBody>
									<QuizRender quiz={elem?.quiz} onClose={onClose}></QuizRender>
								</ModalBody>
								<ModalFooter>
									<Button color='danger' variant='light' onPress={onClose}>
										cerrar
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</AccordionItem>
	);
};

export const renderClassLock = (classIndex, elem, unlockDate) => {
	return (
		<AccordionItem
			key={classIndex}
			textValue={elem?.name}
			title={elem?.name}
			disabled={true}>
			<div className='flex justify-between'>
				<span className='cursor-pointer'>Entrar</span>
			</div>
			<span>
				Clase bloqueada hasta {unlockDate.toLocaleString().slice(0, -3)}
			</span>
		</AccordionItem>
	);
};

export const renderClassSpecialRole = (
	classIndex,
	elem,
	handleClassClick,
	onOpen,
	isOpen,
	handleDataUpdate,
	onOpenChange
) => {
	return (
		<AccordionItem key={classIndex} textValue={elem?.name} title={elem?.name}>
			<div className='flex justify-between'>
				<span
					className='cursor-pointer'
					onClick={() => handleClassClick(elem.name)}>
					Entrar
				</span>

				<EditIcon
					className='cursor-pointer rounded-full transition-background hover:opacity-70'
					width='30'
					height='30'
					onClick={onOpen}
				/>
				<ModalEditClass
					classValues={elem}
					isOpenModal={isOpen}
					handleDataUpdate={handleDataUpdate}
					onOpenChangeModal={onOpenChange}></ModalEditClass>
			</div>
		</AccordionItem>
	);
};

export const renderClassNotProgress = (classIndex, elem) => {
	return (
		<AccordionItem
			key={classIndex}
			textValue={elem?.name}
			title={elem?.name}
			disabled={true}>
			<div className='flex justify-between'>
				<span className='cursor-pointer'>Entrar</span>
			</div>
			<span>Este módulo aún no se ha iniciado.</span>
		</AccordionItem>
	);
};
