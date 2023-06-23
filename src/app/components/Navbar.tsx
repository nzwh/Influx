"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

const Navbar: React.FC = () => {

  const [ query, setQuery ] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void router.push(`/search?q=${query}`);
    }
  };

  return (
    <nav className="flex flex-row h-20 w-full justify-between items-center px-[8%] fixed z-50">
      <Link href="/" className="text-slate-950 font-bold text-md tracking-tighter">Influx</Link>
      <div className="flex gap-4 items-center">
        <div className="flex flex-row gap-2 w-full bg-gray-200 rounded-md p-[0.4rem] tracking-tighter">
          <Image className="opacity-30" src="/icons/b-search.svg" alt="Vercel Logo" width={16} height={16} />
          <input className="text-gray-950 text-sm font-medium bg-transparent focus:outline-none" type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleSearch} />
        </div>
        <Image src="/icons/b-msgsqr.svg" alt="Vercel Logo" width={15} height={16} />
        <Image src="/icons/b-bell.svg" alt="Vercel Logo" width={15} height={16} />
        <Link href="/auth/login" className="curosr-pointer flex items-center">
          <Image className="mx-4" src="/icons/r-logout.svg" alt="Vercel Logo" width={15} height={16} /> 
        </Link>
        <Link href="/profile" className="flex flex-row">
          <Image className="rounded-full ml-2" src="/avatars/temp.jpg" alt="Profile" width={24} height={24} />
          <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;