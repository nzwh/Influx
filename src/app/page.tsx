import Image from 'next/image'
import Link from 'next/link'

import React from 'react';
import Post from './components/Post';
import posts from './posts.json';

export default function Home() {
  
  return (
      
    <main className="flex flex-col w-screen">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>

      <nav className="flex flex-row h-20 w-full justify-between items-center px-[8%] fixed">
        <h6 className="text-slate-950 font-bold text-md tracking-tighter">Influx</h6>
        <div className="flex align-center gap-4">
          <Image src="/icons/b-search.svg" alt="Vercel Logo" width={16} height={16} />
          <Image src="/icons/b-msgsqr.svg" alt="Vercel Logo" width={15} height={16} />
          <Image src="/icons/b-bell.svg" alt="Vercel Logo" width={15} height={16} />          

          <Link href="/profile" className="flex flex-row">
            <Image className="rounded-full ml-2" src="/avatars/temp.jpg" alt="Profile" width={24} height={24} />
            <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
          </Link>
        </div>
      </nav>

      <div className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <div id="leftarea" className="flex flex-col gap-2 h-full w-[38rem]">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </div>

        <div id="rightarea" className="h-full w-[18rem]">
        </div>
      </div>
      
    </main>
    
  )
}
