import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const CustomModal = ({ title, content, actions , ...props}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>{content}</ModalBody>
              <ModalFooter>{actions}</ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
