import React, { useRef, useState, useEffect } from 'react';

import Popover from '@/src/app/backend/components/layouts/PopoverTemplate';
import { ToTitleCase } from '@/src/app/backend/hooks/ToConvert'
import { Cog, LogOut, User } from 'lucide-react';

import OutsideClick from '@/src/app/backend/hooks/OutsideClick';

interface Props {
  data: string[];
  prevData: string[];
  onSubmit: (data: string[]) => void;
  onClose: () => void;
}

const CheckboxPopover: React.FC<Props> = ({ prevData, onSubmit, onClose, data }) => {

  const [formData, setFormData] = useState<string[]>(prevData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFormData((prevFormData) => [...prevFormData, event.target.name]);
    } else {
      setFormData((prevFormData) => prevFormData.filter((item) => item !== event.target.name));
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const modalRef = useRef<HTMLDivElement | null>(null);
  OutsideClick(modalRef, onClose);

  return (
    <Popover classes="w-full top-8 h-[28vh] min-h-40 justify-items flex flex-col">
      <div className="flex flex-col justify-between gap-2 w-full overflow-auto h-full" ref={modalRef}>
        <div className="flex flex-col gap-2">
        {data.map((method: string) => (
          <div className="flex flex-row items-center gap-2">
          <input type="checkbox" id={method} name={method} checked={formData.includes(method)} onChange={handleInputChange} />
          <label htmlFor={method} className="text-xs font-normal">{ToTitleCase(method)}</label>
          </div>
        ))}
        </div>
        <div className="text-[0.625rem] font-light bg-slate-900 hover:bg-slate-800 text-violet-300 rounded-sm transition-colors duration-200 items-center justify-center flex cursor-pointer" onClick={handleSubmit}>Save</div>
      </div>
    </Popover>
  )
}

export default CheckboxPopover;