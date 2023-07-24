import React from 'react';

import Popover from '@/src/app/backend/components/template/PopoverTemplate';
import { Pencil, Trash2 } from 'lucide-react';

import useModal from "@/src/app/backend/hooks/useModalDrop";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleEditPost: () => void;
  handleDeletePost: () => void;
}

const PostPopover: React.FC<Props> = ({ isOpen, onClose, handleEditPost, handleDeletePost }) => {

  const { modalRef } = useModal({ isOpen, onClose });

  return (
    <Popover classes="top-6 z-[10] w-fit">
      <div ref={modalRef}>
      <div className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200" onClick={handleEditPost}>
        <Pencil size={12} strokeWidth={3}/>
        <h6 className="text-xs font-normal">Edit</h6>
      </div>
      <div className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200" onClick={handleDeletePost}>
        <Trash2 size={12} strokeWidth={3}/>
        <h6 className="text-xs font-normal">Delete</h6>
      </div>
      </div>
    </Popover>
  )
}
export default PostPopover;