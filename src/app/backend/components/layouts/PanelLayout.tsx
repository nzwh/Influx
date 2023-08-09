// 'use server'

import React from 'react';
import { MoveUpRight } from 'lucide-react';

interface Props {
	title?: string;
	expand?: boolean;
	classes?: string
	children?: React.ReactNode;
}

const PanelLayout: React.FC<Props> = ({ title, expand, children, classes }) => {
  return (
    <aside 
			className={`bg-white text-black font-normal text-base flex w-full rounded-sm shadow-xl hover:shadow-2xl transition-shadow duration-400 
			${classes}`}>
		{ title || expand ? (
		<div className="flex flex-row justify-between items-center">
			{ title && (
				<h6 className="text-gray-800 font-normal text-xs">{title}</h6>
			)}
			{ expand && (
				<MoveUpRight color="black" size={12}/>
			)}
		</div>
		) : null }
		{children}
	</aside>
  );
};

export default PanelLayout;