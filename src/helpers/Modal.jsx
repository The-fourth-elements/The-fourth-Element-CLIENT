import { useState } from 'react';
import { Modal, Button } from '@nextui-org/react';

const ModalChangeRole = ({ onClose, open }) => {
    const [isAccepted, setIsAccepted] = useState(false);
  
    return (
      <Modal
        open={open}
        onClose={onClose}
        title="Are you sure you want to change the role?"
      >
        <div>
          <p>
            This action is irreversible. Are you sure you want to change the role?
          </p>
  
          <div className="flex justify-center items-center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setIsAccepted(true);
                onClose();
              }}
            >
              Accept
            </Button>
  
            <Button
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

export default ModalChangeRole;