import {
	Modal,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalFooter,
	Button,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import PreviewSelfSection from './PreviewSelfSection';

const PreviewSelf = ({ isOpen, onOpen, onOpenChange, data }) => {
	const [sectionPreview, setSectionPreview] = useState(0);
	const [disableBack, setDisableBack] = useState(false);
	const [disableNext, setDisableNext] = useState(false);
	const sections = data.length;
	const handleSectionChange = (nextOrBack) => {
		const newPreview = sectionPreview + nextOrBack;
		if (newPreview >= 0 && newPreview < sections) {
		  setSectionPreview(newPreview);
		  setDisableBack(newPreview === 0);
		  setDisableNext(newPreview === sections - 1);
		}
	  };
	return (
		<Modal
			isOpen={isOpen}
			onOpen={onOpen}
			onOpenChange={onOpenChange}
			size='4xl'>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader>
							<h3 className='text-xl'>Preview</h3>
						</ModalHeader>
						<ModalBody>
							<div className='flex flex-col max-h-full min-h-[30vh] justify-center h-[80vh] '>
								<PreviewSelfSection
									data={data[sectionPreview]}/>
							</div>
						</ModalBody>
						<ModalFooter className='flex justify-between bg-black'>
							<div className='flex gap-6'>
								<Button
									onClick={() => {
										handleSectionChange(-1);
									}}
									disabled={disableBack}>
									Anterior
								</Button>
								<Button
									onClick={() => {
										handleSectionChange(+1);
									}}
									disabled={disableNext}>
									Siguiente
								</Button>
							</div>
							<Button onClick={onClose}>Cerrar</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default PreviewSelf;
