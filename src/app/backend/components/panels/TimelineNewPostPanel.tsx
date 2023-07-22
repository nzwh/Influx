import React, { useState } from 'react';
import Image from 'next/image';

import CreatePostPopup from '@/src/app/backend/components/dialogs/CreatePostPopup';
import { Post as PostInterface } from '@/libraries/structures';
import { Glasses, Megaphone, Tag } from 'lucide-react';

interface Props {
	onCreatePost: (post: PostInterface) => void;
}

const TimelineNewPost: React.FC<Props> = ({ onCreatePost }) => {

	const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
	const [postType, setPostType] = useState(0);
  
  const handleCreatePostPopupOpen = () => {
    setIsCreatePostPopupOpen(true);
  };
  const handleCreatePostPopupClose = () => {
    setIsCreatePostPopupOpen(false);
  };

	const handlePostTypeInit = (type : number) => {
		setPostType(type);
	}
	const handleFormSubmit = (data: any) => {
		onCreatePost(data);
  };

  return (
		<main>
    <section className="bg-white flex flex-row w-full justify-between rounded-sm py-2 px-4 cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-400">
		<div className="flex flex-row gap-3 items-center w-full" onClick={() => { 
			handleCreatePostPopupOpen(); 
			handlePostTypeInit(1); 
		}}>
			<Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
			<h6 className="text-gray-500 font-light text-xs">Post about something...</h6>
		</div>

		<div className="flex flex-row gap-1 items-center">
			<div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
			onClick={() => { 
				handleCreatePostPopupOpen(); 
				handlePostTypeInit(1); 
			}}>
				<Megaphone className="text-gray-800" size={14}/>
			</div>

			<div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
			onClick={() => { 
				handleCreatePostPopupOpen(); 
				handlePostTypeInit(2); 
			}}>
				<Glasses className="text-gray-800" size={14}/>
			</div>

			<div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
			onClick={() => { 
				handleCreatePostPopupOpen(); 
				handlePostTypeInit(3); 
			}}>
				<Tag className="text-gray-800" size={14}/>
			</div>
		</div>
    </section>

		{isCreatePostPopupOpen && ( 
			<CreatePostPopup onClose={() => { 
				handleCreatePostPopupClose(); 
				handlePostTypeInit(0); 
			}} onSubmit={handleFormSubmit} type={postType} />
		)}
		</main>
  );
};

export default TimelineNewPost;