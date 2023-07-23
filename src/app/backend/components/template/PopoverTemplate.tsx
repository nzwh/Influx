import React from 'react';

interface Props {
	classes?: string
	children?: React.ReactNode;
}

const PopoverTemplate: React.FC<Props> = ({ children, classes }) => {
  return (
    <aside 
			className={`absolute top-10 py-2 px-3 flex flex-col gap-1 bg-[#F9FAFD] text-black font-normal text-base rounded-sm border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-400 
			${classes}`}>
		{children}
	  </aside>
  );
};

export default PopoverTemplate;