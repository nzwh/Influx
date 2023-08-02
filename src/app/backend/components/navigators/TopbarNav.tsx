"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

import supabase from '@/src/app/backend/model/supabase';
import { Cog, Inbox, LogOut, Megaphone, Plus, Search, ShoppingBag, SquareSlash, User } from 'lucide-react';

import CreatePostPopup from '../dialogs/CreatePostPopup';
import Popover from '@/src/app/backend/components/layouts/PopoverLayout';
import { useGlobalContext } from '@/src/app/backend/hooks/GlobalContext';

const TopbarNav: React.FC = () => {

  const router = useRouter();
  const { user } = useGlobalContext();

  // Redirect to search page with the query
  const [query, setQuery] = useState('');
  const handleSearchQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${query}`);
    }
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
      localStorage.removeItem('token');
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <nav className="bg-[#F9FAFD] h-12 w-full flex flex-row justify-between items-center border-b-[1px] px-[12%] fixed z-[40]">
      <section className="flex flex-row items-center gap-4 w-auto">
        <Link href="/">
          <Image src="/root/influx.svg" alt="Logo" width={40} height={0} />
        </Link>
        <div className="bg-gray-200 text-gray-600 h-6 px-3 flex flex-row justify-between items-center gap-2 rounded-full cursor-pointer">
          <div className="flex flex-row items-center gap-2">
            <Search size={12} strokeWidth={3}/>
            <input className="text-gray-800 w-44 text-xs font-light bg-transparent focus:outline-none" type="text" placeholder="Look for anything..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearchQuery} />
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
      <Link href="/" className="bg-gray-200 text-gray-600 h-6 py-1 px-1.5 flex items-center rounded-full cursor-pointer
          hover:bg-gray-300 transition-colors duration-200">
        <Inbox size={14} strokeWidth={3}/>
      </Link>
      <Link href="/" className="bg-gray-200 text-gray-600 h-6 py-1 px-1.5 flex items-center rounded-full cursor-pointer
        hover:bg-gray-300 transition-colors duration-200">
        <Megaphone size={14} strokeWidth={3} />
      </Link>
      <Link href="/" className="bg-gray-200 text-gray-600 h-6 py-1 px-2.5 flex items-center gap-1 rounded-full cursor-pointer
        hover:bg-gray-300 transition-colors duration-200">
        <ShoppingBag size={12} strokeWidth={3} />
        <h6 className="text-xs font-regular leading-3">12 items</h6>
      </Link>
      &nbsp;
      
      {/* Opens a popover */}
      <Popover classes={"top-8"} 
        trigger={
          <Image className="cursor-pointer rounded-full" src={user.icon} alt="User Icon" width={30} height={30} />
        }
        elements={[
          ["Profile", <User size={12} strokeWidth={3}/>, () => router.push(`/profile`)],
          ["Settings", <Cog size={12} strokeWidth={3}/>, () => router.push(`/settings`)],
          ["Logout", <LogOut size={12} strokeWidth={3}/>, handleLogout]
        ]} 
      />
    
    </section>
    </nav>
  );
};

export default TopbarNav;