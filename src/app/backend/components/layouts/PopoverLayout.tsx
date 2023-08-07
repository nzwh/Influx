'use client' // * Uses interactable components

import React, { useState, useRef } from 'react';
import OutsideClick from '@/src/app/backend/hooks/useOutsideClick';

interface Props {
  classes: string;
  trigger: React.ReactNode;
  elements: [string, JSX.Element, (() => void)][]
}

const PopoverLayout: React.FC<Props> = ({ classes, trigger, elements }) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handlePopoverToggle = () => {
    setIsPopoverOpen((previous) => !previous);
  };
  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  const popoverRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(popoverRef, handlePopoverClose);
  
  return (
    <div className="flex justify-center relative">
      <div onClick={handlePopoverToggle}>
        {trigger}
      </div>

      {isPopoverOpen && (
      <aside 
        className={`absolute py-2 px-3 flex flex-col gap-1 bg-[#F9FAFD] text-black font-normal text-base rounded-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-400 
        ${classes}`}>

        <div ref={popoverRef}>
        {elements.map((element, index) => {
          const [name, icon, onClick] = element;
          return (
            <li key={index} onClick={onClick} 
              className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200">
              {icon}
              <h6 className="text-xs font-normal">{name}</h6>
            </li>
          )
        })}
        </div>

      </aside>
      )}
    </div>
  );
};

export default PopoverLayout;