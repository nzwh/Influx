import { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const useModal = ({ isOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (modalRef.current === event.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handler = (event: any) => handleClickOutside(event);
    if (isOpen) {
      document.addEventListener('mousedown', handler);
    } else {
      document.removeEventListener('mousedown', handler);
    }

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return { modalRef, handleClickOutside };
};

export default useModal;