import React from 'react';
import Image from 'next/image';

import { Package, Map, Film, Tag, } from 'lucide-react';

const NewPostPanel: React.FC = () => {
  return (
    <section id="create_post" className="bg-white flex flex-row w-full justify-between rounded-sm py-3 px-4 cursor-pointer">
		<div className="flex flex-row gap-3 items-center">
			<Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
			<h6 className="text-gray-500 font-normal text-xs">Post about something...</h6>
		</div>

		<div className="flex flex-row gap-4 items-center">
			<Package className="opacity-70" color="black" size={14}/>
			<Map className="opacity-70" color="black" size={14}/>
			<Film className="opacity-70" color="black" size={14}/>
			<Tag className="opacity-70" color="black" size={14}/>
		</div>
    </section>
  );
};

export default NewPostPanel;