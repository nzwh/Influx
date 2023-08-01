"use client"

import React, { useState, useRef } from 'react';
import OutsideClick from '@/src/app/backend/hooks/OutsideClick';

type Directories = [string, JSX.Element, (() => void)];

interface Props {
  classes: string;
  trigger: React.ReactNode;
  elements: Directories[];
}

const Popover: React.FC<Props> = ({ classes, trigger, elements }) => {

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
          const [string, icon, onClick] = element;
          return (
            <div onClick={onClick} 
              className="text-gray-600 flex flex-row gap-2 items-center hover:bg-gray-200 py-1 px-2 justify-start cursor-pointer select-none transition-colors duration-200">
              {icon}
              <h6 className="text-xs font-normal">{string}</h6>
            </div>
          )
        })}
        </div>

      </aside>
      )}
    </div>
  );
};

export default Popover;