import React, { ReactNode } from 'react';
import { Button } from 'design-web';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full mx-4 md:mx-0"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4">
          <Button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
