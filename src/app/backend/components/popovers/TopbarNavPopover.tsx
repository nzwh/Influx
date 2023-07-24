import React from 'react';
import Link from 'next/link';

import Popover from '@/src/app/backend/components/template/PopoverTemplate';
import { Cog, LogOut, User } from 'lucide-react';
import useModal from "@/src/app/backend/hooks/useModalDrop";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleLogOut: () => void;
}

const TopbarNavPopover: React.FC<Props> = ({ handleLogOut, isOpen, onClose }) => {
  const { modalRef } = useModal({ isOpen, onClose });

  const handleOptionClick = () => {
    onClose();
  };

  return (
    <Popover classes="top-10">
      <div ref={modalRef}>
        <Link href="/profile" onClick={handleOptionClick} className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200">
          <User size={12} strokeWidth={3}/>
          <h6 className="text-xs font-normal">Profile</h6>
        </Link>
        <Link href="/settings" onClick={handleOptionClick} className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200">
          <Cog size={12} strokeWidth={3}/>
          <h6 className="text-xs font-normal">Settings</h6>
        </Link> 
        <div onClick={handleLogOut} className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200">
          <LogOut size={12} strokeWidth={3}/>
          <h6 className="text-xs font-normal">Log Out</h6>
        </div>
      </div>
    </Popover>
  )
}

export default TopbarNavPopover;