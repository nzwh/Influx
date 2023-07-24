"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

import { Inbox, Megaphone, Plus, Search, ShoppingBag, SquareSlash, LogOut } from 'lucide-react';

import usePostActions from "@/src/app/backend/hooks/usePostActions";
import CreatePostPopup from '@/src/app/backend/components/dialogs/CreatePostPopup';
import TopbarNavPopover from '@/src/app/backend/components/popovers/TopbarNavPopover';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

import supabase from '@/src/app/backend/supabase';

const TopbarNav: React.FC = () => {
  let activeD = JSON.parse(sessionStorage.getItem('token')!)
  
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

  const [ query, setQuery ] = useState('');
  const router = useRouter();
  const { handleAddPost, handleDeletePost } = usePostActions();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${query}`);
    }
  };

  const [isTopbarNavPopoverOpen, setIsTopbarNavPopoverOpen] = useState(false);

  const handleToggleDropDown = () => {
    setIsTopbarNavPopoverOpen((previous) => !previous);
  };

  const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
  
  const handleCreatePostPopupOpen = () => {
    setIsCreatePostPopupOpen(true);
  };
  const handleCreatePostPopupClose = () => {
    setIsCreatePostPopupOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/home')
      sessionStorage.removeItem('token');
    } catch (error) {
      alert(error)
    }
  }

  const handleCloseTopbarNavPopover = () => {
    setIsTopbarNavPopoverOpen(false);
    };

  if (user && user.length > 0) {
    return (
      <nav className="bg-[#F9FAFD] // h-12 w-full // flex flex-row justify-between items-center // border-b-[1px] px-[12%] fixed z-[50]">
        <section className="flex flex-row items-center gap-4 w-auto">
          <Link href="/">
            <Image src="/root/influx.svg" alt="Logo" width={40} height={0} />
          </Link>
          <div className="bg-gray-200 text-gray-600 // h-6 px-3 // flex flex-row justify-between items-center gap-2 // rounded-full cursor-pointer">
            <div className="flex flex-row items-center gap-2">
              <Search size={12} strokeWidth={3}/>
              <input className="text-gray-800 w-44 text-xs font-light bg-transparent focus:outline-none" type="text" placeholder="Look for anything..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
            </div>
            <SquareSlash size={12} strokeWidth={3}/>
          </div>
        </section>
        <section className="flex flex-row items-center gap-2">
          <div onClick={handleCreatePostPopupOpen} className="bg-gray-200 text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 
            // rounded-full cursor-pointer // hover:bg-slate-900 hover:text-violet-300 transition-colors duration-200">
            <Plus size={12} strokeWidth={3} />
            <h6 className="text-xs font-regular leading-3">New</h6>
          </div>
          {isCreatePostPopupOpen && ( 
            <CreatePostPopup passType={1} isOpen={isCreatePostPopupOpen} onClose={handleCreatePostPopupClose} onSubmit={handleAddPost} />
          )}
          <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-1.5 // flex items-center // rounded-full cursor-pointer
            // hover:bg-gray-300 transition-colors duration-200">
            <Inbox size={14} strokeWidth={3}/>
          </Link>
          <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-1.5 // flex items-center // rounded-full cursor-pointer
            // hover:bg-gray-300 transition-colors duration-200">
            <Megaphone size={14} strokeWidth={3} />
          </Link>
          <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 // rounded-full cursor-pointer
            // hover:bg-gray-300 transition-colors duration-200">
            <ShoppingBag size={12} strokeWidth={3} />
            <h6 className="text-xs font-regular leading-3">12 items</h6>
          </Link>
          &nbsp;

        <div className="flex justify-center">
          <Image onClick={handleToggleDropDown} className="cursor-pointer rounded-full" src={activeData.icon} alt="User Icon" width={30} height={30} />
            {/* <div className="cursor-pointer rounded-full relative bg-[url('/root/temp.jpg')] bg-cover w-6 h-6"></div> */}
          {isTopbarNavPopoverOpen && <TopbarNavPopover handleLogOut={handleLogout} isOpen={isTopbarNavPopoverOpen} onClose={handleCloseTopbarNavPopover} />}
        </div>

      </section>
      </nav>
    );
  } else {
    console.log("User data is not available yet.");
  }
};

export default TopbarNav;