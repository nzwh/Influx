import React, { useState } from 'react';
import Image from 'next/image';

// Layouts
import Panel from '@/src/app/backend/components/layouts/PanelLayout';

// Popups
import CreatePost from '@/src/app/backend/components/dialogs/CreatePostPopup';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

// Hooks, Icons & Classes
import { Glasses, Megaphone, Tag } from 'lucide-react';
import { UserClass } from '@/libraries/structures';

const NewPost: React.FC = () => {

  const { user } = useGlobalContext();
 
	const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
	const [postType, setPostType] = useState(0);

  const handleTypeClick = (type: number, popup: boolean) => {
    setIsCreatePostPopupOpen(popup);
    setPostType(type);
  }

  return (
    <main>

    <Panel classes="flex-row px-4 py-2 gap-4 cursor-pointer">
    <div className="flex flex-row gap-3 items-center w-full" 
    onClick={() => handleTypeClick(1, true)}>
      <Image className="rounded-full" src={user.icon} alt="User Icon" width={22} height={22} />
      <h6 className="text-gray-500 font-light text-xs">Post about something...</h6>
    </div>

    <div className="flex flex-row gap-1 items-center">
      <div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
      onClick={() => handleTypeClick(1, true)}>
        <Megaphone className="text-gray-800" size={14}/>
      </div>

      <div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
      onClick={() => handleTypeClick(2, true)}>
        <Glasses className="text-gray-800" size={14}/>
      </div>

      <div className="p-2 rounded-sm hover:bg-slate-200 transition-colors duration-200" 
      onClick={() => handleTypeClick(3, true)}>
        <Tag className="text-gray-800" size={14}/>
      </div>
    </div>
    </Panel>

    {isCreatePostPopupOpen && ( 
      <CreatePost isOpen={isCreatePostPopupOpen} onClose={() => handleTypeClick(0, false)} type={postType} user={user} />
    )}
    
    </main>
  );
};

export default NewPost;