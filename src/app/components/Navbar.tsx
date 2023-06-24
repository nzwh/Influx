"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import { Bell, Italic, LogOut, MessageSquare, Search } from 'lucide-react';

const Navbar: React.FC = () => {

  const [ query, setQuery ] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void router.push(`/search?q=${query}`);
    }
  };

  return (
    <main>
      <nav className="flex flex-row h-20 w-full justify-between items-center px-[8%] fixed z-30">
        <Link href="/" className="flex flex-row items-center gap-2">
          <Italic className="opacity-70" color="black" size={14} strokeWidth={3} />
          <h1 className="text-slate-950 font-regular text-sm">Influx</h1>
        </Link>

        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-row gap-2 w-full bg-gray-200 rounded-sm px-2 py-[0.3rem] items-center">
            <Search className="opacity-30" color="black" size={12} strokeWidth={3}/>
            <input className="text-gray-800 text-xs font-light bg-transparent focus:outline-none" type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
          </div>

          <Link href="/auth/login" className="curosr-pointer flex items-center">
            <MessageSquare className="opacity-70" color="black" size={14} strokeWidth={3}/>
          </Link>
          <Link href="/auth/login" className="curosr-pointer flex items-center">
            <Bell className="opacity-70" color="black" size={14} strokeWidth={3} />
          </Link>
          <Link href="/auth/login" className="curosr-pointer flex items-center">
            <LogOut className="opacity-70" color="red" size={14} strokeWidth={3} />
          </Link>
          
          <Link href="/profile" className="">
            <Image className="rounded-full ml-2" src="/avatars/temp.jpg" alt="Profile" width={28} height={28} />
          </Link>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;