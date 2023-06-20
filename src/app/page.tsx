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

        <section id="rightarea" className="h-full w-[18rem]">
        </section>
      </div>
      
    </main>
    
  )
}
