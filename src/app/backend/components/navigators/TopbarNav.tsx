"use client"

import React, { useState } from 'react';
import { useRouter, redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

// Layouts
import Popover from '@/src/app/backend/components/layouts/PopoverLayout';
import Wrapper from '@/src/app/backend/components/layouts/WrapperLayout';

// Panels & Popups
import CreatePostPopup from '@/src/app/backend/components/dialogs/CreatePostPopup';
import LoggingOutPopup from '@/src/app/backend/components/dialogs/LoggingOutPopup';

// Hooks & Classes
import Supabase from '@/src/app/backend/model/supabase';
import { useGlobalContext } from '@/src/app/backend/hooks/useGlobalContext';

// Icons
import { Bookmark, Cog, Inbox, LogIn, LogOut, Plus, Search, ShoppingBag, SquareSlash, User } from 'lucide-react';

const TopbarNav: React.FC = () => {

  const [showPopup, setShowPopup] = useState(false);

  // Instantiate router
  const router = useRouter();
  // Export user from global context
  const { user } = useGlobalContext();

  // Redirect to search page with the query
  const [query, setQuery] = useState('');
  const handleSearchQuery = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push('/search?q=' + query)
    }
  };
  
  // Handle CreatePost state
  const [isCreatePostPopupOpen, setIsCreatePostPopupOpen] = useState(false);
  const handleCreatePostPopupOpen = () => {
    setIsCreatePostPopupOpen(true);
  };
  const handleCreatePostPopupClose = () => {
    setIsCreatePostPopupOpen(false);
  };

  // TODO: Move this to a separate component @jmslouis
  const handleLogout = async () => {
    try {
      const { error } = await Supabase.auth.signOut()
      if (error) throw error
      router.push('/home')
      localStorage.removeItem('token');
      setShowPopup(true);
    } catch (error) {
      alert(error)
    }
  }
  
  return (
    <nav className="bg-[#F9FAFD] h-12 w-full flex flex-row justify-between items-center border-b-[1px] px-[12%] fixed z-40" id="top-bar-nav">

      {/* Left */}
      <Wrapper className="flex flex-row items-center gap-4 w-auto">

        {/* Influx Logo */}
        <Link href="/">
          <Image src="/root/influx.svg" alt="Logo" width={40} height={40} />
        </Link>

        {/* Searchbar */}

      </Wrapper>

      {/* Right */}
      <Wrapper className="flex flex-row items-center gap-2">

        {/* User Actions */}
        { user.uuid ? (<>
          {/* Create Post */}
          <Wrapper>
            <div onClick={handleCreatePostPopupOpen} className="bg-gray-200 text-gray-600 h-6 py-1 px-2.5 flex items-center gap-1 rounded-full cursor-pointer hover:bg-slate-900 hover:text-violet-300 transition-colors duration-200">
              <Plus size={12} strokeWidth={3} />
              <h6 className="text-xs font-regular leading-3">New</h6>
            </div>
            {isCreatePostPopupOpen && ( 
              <CreatePostPopup type={1} onClose={handleCreatePostPopupClose} />
            )}
          </Wrapper>
          <Link href="/" className="bg-gray-200 text-gray-600 h-6 py-1 px-1.5 flex items-center rounded-full cursor-pointer
              hover:bg-gray-300 transition-colors duration-200">
            <Inbox size={14} strokeWidth={3}/>
          </Link>
          <Link href="/bookmarks" className="bg-gray-200 text-gray-600 h-6 py-1 px-1.5 flex items-center rounded-full cursor-pointer
            hover:bg-gray-300 transition-colors duration-200">
            <Bookmark size={14} strokeWidth={3} />
          </Link>
          <Link href="/cart" className="bg-gray-200 text-gray-600 h-6 py-1 px-2.5 flex items-center gap-1 rounded-full cursor-pointer
            hover:bg-gray-300 transition-colors duration-200">
            <ShoppingBag size={12} strokeWidth={3} />
            <h6 className="text-xs font-regular leading-3">{user.cart?.length || 0} items</h6>
          </Link>
        </>) : null }
        
        {/* User Popover */}
        <Popover classes={"top-8"} 
          trigger={
            <Image className="cursor-pointer rounded-full w-7 h-7 object-cover" src={user.icon} alt="User Icon" width={30} height={30} />
          }
          elements={
            user.uuid ? [
              ["Profile", <User size={12} strokeWidth={3}/>, () => router.push(`/profile`)],
              ["Settings", <Cog size={12} strokeWidth={3}/>, () => router.push(`/settings`)],
              ["Logout", <LogOut size={12} strokeWidth={3}/>, handleLogout]
            ] : [ 
              ["Login", <LogIn size={12} strokeWidth={3}/>, () => router.push(`/auth/login`)]
            ]
          } 
        />
      
      </Wrapper>
      {showPopup && <LoggingOutPopup />}
    </nav>
  );
};

export default TopbarNav;