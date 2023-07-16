import React from 'react';
import Image from 'next/image';

import { Glasses, Megaphone, Tag } from 'lucide-react';

const NewPostPanel: React.FC = () => {
  return (
    <section id="create_post" className="bg-white flex flex-row w-full justify-between rounded-sm py-2 px-4 cursor-pointer filter drop-shadow-2xl">
		<div className="flex flex-row gap-3 items-center">
			<Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
			<h6 className="text-gray-500 font-normal text-xs">Post about something...</h6>
		</div>

		<div className="flex flex-row gap-1 items-center">
			<div className="p-2 rounded-sm hover:bg-slate-100 transition-colors duration-200">
				<Megaphone className="text-gray-800" size={14}/>
			</div>
			<div className="p-2 rounded-sm hover:bg-slate-100 transition-colors duration-200">
				<Glasses className="text-gray-800" size={14}/>
			</div>
			<div className="p-2 rounded-sm hover:bg-slate-100 transition-colors duration-200">
				<Tag className="text-gray-800" size={14}/>
			</div>
		</div>
    </section>
  );
};

export default NewPostPanel;