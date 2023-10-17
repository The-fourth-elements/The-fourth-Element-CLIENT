
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const ModalChanges = ({funcion, pregunta, cerrador, ...props}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
        <>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                        <h2>{pregunta}
                        </h2>
                    </ModalHeader>
                  <ModalFooter>
                  <Button color="danger" variant="light" onPress={cerrador}>
                      Cerrar
                    </Button>
                    <Button color="primary" onPress={funcion}>
                      Accept
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    };
  
  export default ModalChanges;