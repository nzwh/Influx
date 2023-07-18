"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'

import { Inbox, Megaphone, Plus, Search, ShoppingBag, SquareSlash } from 'lucide-react';

const LandingNav: React.FC = () => {

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
      </section>
      <section className="flex flex-row items-center gap-2">
        <Link href="/auth/login" className="text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 
          // rounded-full cursor-pointer">
          <h6 className="text-xs font-regular leading-3">Sign In</h6>
        </Link>
        <Link href="/auth/register" className="bg-gray-200 text-gray-600 // h-6 py-1 px-2.5 // flex items-center gap-1 
          // rounded-full cursor-pointer // hover:bg-slate-900 hover:text-violet-300 transition-colors duration-100">
          <h6 className="text-xs font-regular leading-3">Sign Up</h6>
        </Link>
      </section>
    </nav>
  );
};

export default LandingNav;