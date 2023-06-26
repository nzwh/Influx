"use client"

import Image from 'next/image';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';
import { Package, Map, Film, Tag, MoveUpRight, MoreVertical } from 'lucide-react';

import PostTemplate from '@/src/app/components/PostTemplate';
import PostCreate from '@/src/app/components/PostCreate';
import PostOpen from '@/src/app/components/PostOpen';
import Navbar from '@/src/app/components/Navbar';

import { PostInterface } from '@/libraries/interfaces';

export default function Home() {

  const [isPostCreateOpen, setIsPostCreateOpen] = useState(false);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        const existingPosts: PostInterface[] = require('@/posts.json');
        setPosts(existingPosts);
      } catch (error) {
        console.log('Error reading posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostCreateOpen = () => {
    setIsPostCreateOpen(true);
  };
  const handlePostCreateClose = () => {
    setIsPostCreateOpen(false);
  };

  const handleAddPost = (post: PostInterface) => {
    let existingPosts: PostInterface[] = require('@/posts.json');
    let updatedPosts: PostInterface[] = [post, ...existingPosts];
    existingPosts.unshift(post);
    setPosts(updatedPosts);
  };

  const handlePostDelete = (postId: number) => {
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  let active = {
    name: 'Arkustore',
    handle: '@arkustore',
    avatar: '/avatars/temp.jpg',
  }

  return (
    <main>
      <div id="bg" className="fixed top-0 left-0 z-[-1] w-screen h-screen bg-gradient-to-b from-zinc-100 to-zinc-300"></div>
      <Navbar />
      <section id="wrapper" className="flex flex-row gap-2 w-full h-full justify-center align-center py-20">
        <section id="leftarea" className="flex flex-col gap-2 w-[32rem] h-full mr-[16.5rem] overflow-visible">

          <section id="create_post" onClick={handlePostCreateOpen} className="bg-white flex flex-row w-full justify-between rounded-sm py-3 px-4 cursor-pointer">
            <div className="flex flex-row gap-3 items-center">
              <Image className="rounded-full" src="/avatars/temp.jpg" alt="User Icon" width={22} height={22} />
              <h6 className="text-gray-500 font-normal text-xs">Post about something...</h6>
            </div>

            <div className="flex flex-row gap-4 items-center">
              <Package className="opacity-70" color="black" size={14}/>
              <Map className="opacity-70" color="black" size={14}/>
              <Film className="opacity-70" color="black" size={14}/>
              <Tag className="opacity-70" color="black" size={14}/>
            </div>
          </section>

          {isPostCreateOpen && ( 
            <PostCreate onClose={handlePostCreateClose} onAddPost={handleAddPost} />
          )}
          
          <ul className="flex flex-col gap-2 h-full w-[32rem]">
            {posts.map((post, index) => (
              <li key={index}>
                <PostTemplate key={index} {...post} onDelete={handlePostDelete} />
              </li>
            ))}
          </ul>
        </section>
        
        <section id="rightarea" className="flex flex-col gap-2 w-[16rem] h-full fixed ml-[32.5rem]">
          <aside className="bg-white flex flex-col w-full rounded-sm p-4 gap-4">
            <div className="flex flex-row justify-between items-center">
              <h6 className="text-gray-800 font-regular text-xs">Account</h6>
              <MoveUpRight color="black" size={12}/>
            </div>
            
            <div className="flex flex-row justify-between items-center">
              <Link href="/profile">
                <div className="flex flex-row items-center gap-2">
                  <Image className="rounded-full" src={active.avatar} alt="User Icon" width={36} height={36} />
                  <div className="flex flex-col justify-center">
                    <h6 className="text-gray-800 font-medium text-md leading-4 tracking-tight">{active.name}</h6>
                    <h6 className="text-gray-500 font-regular text-xs leading-4">{active.handle}<span className="text-gray-600 bg-gray-200 font-regular text-[0.5rem] relative top-[-0.1rem] tracking-wider rounded-xl px-1.5 py-0.5 ml-2">VERIFIED</span></h6>
                </div>
              </div>
              </Link>
              <MoreVertical color="black" size={12}/>
            </div>
          </aside>

          <aside className="bg-white flex flex-col w-full rounded-sm p-4 gap-4">
            <div className="flex flex-row justify-between items-center">
              <h6 className="text-gray-800 font-regular text-xs">Explore</h6>
              <MoveUpRight color="black" size={12}/>
            </div>
          </aside>  
          
          <aside className="bg-white flex flex-col w-full rounded-sm p-4">
            <h6 className="text-gray-800 font-regular text-[0.65rem] leading-[0.75rem]">About  •  Terms  •  Documentation  •  Legal influx.io © 2023.  Made with Next.js.</h6>
          </aside>
        </section>
      </section>
    </main>
  )
}
