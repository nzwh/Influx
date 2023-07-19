import React from 'react';
import { MoveUpRight } from 'lucide-react';

interface Props {
	title?: string;
	children?: React.ReactNode;
}

const PanelTemplate: React.FC<Props> = ({ title, children }) => {
  return (
    <aside id="explore" className="bg-white flex flex-col w-full rounded-sm p-4 gap-4 filter drop-shadow-2xl">

		{ title && (
		<div className="flex flex-row justify-between items-center">
			<h6 className="text-gray-800 font-normal text-xs">{title}</h6>
			<MoveUpRight color="black" size={12}/>
		</div>
		)}

		{children}
	</aside>
  );
};

export default PanelTemplate;