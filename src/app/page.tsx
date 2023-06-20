import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import Post from './components/Post';
import Navbar from './components/Navbar';

import posts from './posts.json';
export default function Home() {
  return (
      
    <main className="flex flex-col w-screen">
      <div className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />

      <div className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <section id="leftarea" className="flex flex-col gap-2 h-full w-[38rem]">
          {posts.map((post, index) => (
            <Post key={index} {...post} />
          ))}
        </section>

        <section id="rightarea" className="flex flex-col gap-2 h-full w-[18rem]">
          
          <div className="w-full flex flex-col bg-white rounded-lg p-4 gap-4">
            <div className="flex flex-row justify-between">
              <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">Account</h6>
              <Image src="/icons/b-search.svg" alt="Expand" width={12} height={12} />
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={40} height={40} />
                <div className="flex flex-col justify-center">
                  <h6 className="text-gray-950 font-bold text-lg tracking-tighter leading-5">Arkustore</h6>
                  <h6 className="text-gray-500 font-bold text-xs tracking-tighter leading-4">@arkustore
                    <span className="text-black font-extrabold text-[0.5rem] bg-gray-300 rounded-xl px-2 py-0.5 tracking-normal relative top-[-0.04rem] ml-2">SELLER</span>
                  </h6>
                </div>
              </div>
              <Image className="rotate-90" src="/icons/b-more-h.svg" alt="More Button" width={14} height={14} />
            </div>
          </div>

          <div className="w-full flex flex-col bg-white rounded-lg p-4">
            <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">About  •  Terms  •  Documentation  •  Repository</h6>
            <h6 className="text-gray-950 font-bold text-xs tracking-tighter leading-4">influx.io © 2023.  Made with Next.js.</h6>
          </div>

        </section>
      </div>
      
    </main>
    
  )
}
