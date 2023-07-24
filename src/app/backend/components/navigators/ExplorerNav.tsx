import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { User, Bookmark, Inbox, ShoppingBag, Settings, Sparkle, Truck, Moon, Megaphone, LayoutGrid } from 'lucide-react';
import { User as UserInterface } from '@/libraries/structures';
import useFetchUser from "@/src/app/backend/hooks/useFetchUser";

interface WrapperProps {
  // user: UserInterface;
  wrapperClass: string;
}

// const ExplorerNav: React.FC<WrapperProps> = ({ user, wrapperClass }) => {
const ExplorerNav: React.FC<WrapperProps> = ({ wrapperClass }) => {
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

  if (user && user.length > 0) {
    return (
      <section id="profile" className={`gap-6 flex flex-col fixed ${wrapperClass}`}>
        <Link href="/profile" className="flex flex-row items-start gap-2">
          <Image className="rounded-full" src={activeData.icon} alt="User Icon" width={48} height={48} />
          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-0.5 items-start">
              <h6 className="text-gray-800 font-medium text-base leading-4 tracking-tight">
                {activeData.first_name}<br/>{activeData.last_name}
                { activeData.is_verified ? (
                <span className="inline-block w-4 h-4 relative top-[0.125rem]"> 
                  <Image src="/root/verified.svg" alt="verified" width={16} height={16} />
                </span>
                ) : null }
              </h6>
            </div>
            <h6 className="text-gray-500 font-regular text-[0.625rem] leading-4">@{activeData.handle}</h6>
          </div>
        </Link>
    
        <ul className="flex flex-col gap-0.5 relative right-2">
          <Link href="/explore" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <Sparkle size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Explore</h6>
          </Link>
          <Link href="/bookmarks" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <Bookmark size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Bookmarks</h6>
          </Link>
          <Link href="/cart" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <ShoppingBag size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Shopping Cart</h6>
          </Link>
          <hr className="my-1"/>
          <Link href="/theme" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <Moon size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Theme</h6>
          </Link>
          <Link href="/profile" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <User size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Profile</h6>
          </Link>
          <Link href="/settings" className="flex flex-row items-center gap-2 text-gray-700 px-2 py-1.5 rounded-sm hover:bg-slate-300 transition-colors duration-200">
            <Settings size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">Settings</h6>
          </Link>
          {/* <hr />
          <li className="flex flex-row items-center gap-2 text-gray-700">
            <LayoutGrid size={16} strokeWidth={3}/>
            <h6 className="font-regular text-sm">More</h6>
          </li> */}
        </ul>
      </section>
    );
  } else {
    console.log("User data is not available yet.");
  }
};

export default ExplorerNav;