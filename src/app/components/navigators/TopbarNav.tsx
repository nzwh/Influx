"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

import { Inbox, Megaphone, Plus, Search, ShoppingBag, SquareSlash } from 'lucide-react';

const TopbarNav: React.FC = () => {

  const [ query, setQuery ] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <nav className="bg-white // h-12 w-full // flex flex-row justify-between items-center // border-b-2 px-[12%] fixed z-30">
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
        <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 
          // rounded-full cursor-pointer // hover:bg-slate-900 hover:text-violet-300 transition-colors duration-100">
          <Plus size={12} strokeWidth={3} />
          <h6 className="text-xs font-regular leading-3">New</h6>
        </Link>
        <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-1.5 // flex items-center // rounded-full cursor-pointer
          // hover:bg-gray-300 transition-colors duration-100">
          <Inbox size={14} strokeWidth={3}/>
        </Link>
        <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-1.5 // flex items-center // rounded-full cursor-pointer
          // hover:bg-gray-300 transition-colors duration-100">
          <Megaphone size={14} strokeWidth={3} />
        </Link>
        <Link href="/" className="bg-gray-200 text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 // rounded-full cursor-pointer
          // hover:bg-gray-300 transition-colors duration-100">
          <ShoppingBag size={12} strokeWidth={3} />
          <h6 className="text-xs font-regular leading-3">12 items</h6>
        </Link>
        <Link href="/profile" className="">
          <Image className="rounded-full ml-2" src="/avatars/temp.jpg" alt="Profile" width={24} height={24} />
        </Link>
      </section>
    </nav>
  );
};

export default TopbarNav;