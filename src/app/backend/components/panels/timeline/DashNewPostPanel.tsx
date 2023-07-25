import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CreatePostPopup from '@/src/app/backend/components/dialogs/CreatePostPopup';
import Panel from '@/src/app/backend/components/template/PanelTemplate';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";
import { PostInterface } from '@/libraries/structures';
import { Glasses, Megaphone, Tag } from 'lucide-react';

interface Props {
	onCreatePost: (post: PostInterface) => void;
}

const DashNewPost: React.FC<Props> = ({ onCreatePost }) => {
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  let router = useRouter();
  
  useEffect(() => {
    if(sessionStorage.getItem('token')) {
      activeD = JSON.parse(sessionStorage.getItem('token')!)
      console.log(activeD.user.id)
    }
    else {
      router.push('/home')
    }
  }, [])
  
  const { user, fetchUser} = useFetchUser({ type: 'userId', userId: activeD.user.id as string });
  const activeData = user[0];

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
    <Panel classes="flex-row px-4 py-2 gap-4 cursor-pointer">
    <div className="flex flex-row gap-3 items-center w-full" onClick={() => { 
      handleCreatePostPopupOpen(); 
      handlePostTypeInit(1); 
    }}>
      <Image className="rounded-full" src={activeData ? activeData.icon : "/root/temp.jpg"} alt="User Icon" width={22} height={22} />
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
    </Panel>

    {isCreatePostPopupOpen && ( 
      <CreatePostPopup isOpen={isCreatePostPopupOpen} onClose={() => { 
        handleCreatePostPopupClose(); 
        handlePostTypeInit(0); 
      }} onSubmit={handleFormSubmit} passType={postType} />
    )}
    </main>
  );
};

export default DashNewPost;